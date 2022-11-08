const crypto    = require('crypto'),
      os        = require('os'),
      fs        = require('fs'),
      path      = require('path'),
      dgram     = require('dgram'),
      express   = require('express'),
      marked    = require('marked'),
      app       = express(),
      server    = require('http').Server(app),
      WebSocket = require('ws'),
      wss       = new WebSocket.Server({ server }),
      history   = require('connect-history-api-fallback'),
      conf      = require('./conf/app');

// Set up conf object
conf.app.settings.singleDeviceOptions = conf.app.settings.singleDeviceOptions.map(singleEntry => { return { class: parseInt(singleEntry.class, 16), checked: singleEntry.checked }; });
({ version: conf.ver, releaseDate: conf.date } = require('./package'));
conf.text = require(`./${conf.app.dict.text}`).text;
conf.mra = (() => {
  // Shape of MRA
  const mra = {
    definitions: null,
    devices: []
  };

  // Add definitions
  mra.definitions = require(`./${conf.app.dict.mra}/definitions/definitions.json`).definitions;

  // Add superClass to devices
  mra.devices.push(require(`./${conf.app.dict.mra}/superClass/0x0000.json`));

  // Add nodeProfile to devices
  mra.devices.push(require(`./${conf.app.dict.mra}/nodeProfile/0x0EF0.json`));

  // Add remaining devices
  fs.readdirSync(`./${conf.app.dict.mra}/devices/`).forEach(filename => {
    mra.devices.push(require(`./${conf.app.dict.mra}/devices/${filename}`));
  });

  return mra;
})();
require('json-refs').resolveRefs(conf.mra).then(res => {
  // Convert EOJ and EPC to number
  conf.mra = res.resolved.devices.map(device => {
    device.eoj = parseInt(device.eoj, 16);
    device.elProperties = device.elProperties.map(elProperty => {
      elProperty.epc = parseInt(elProperty.epc, 16);
      return elProperty;
    });
    return device;
  });
});
conf.mfrs = (data => Object.fromEntries(Object.keys(data).map(v => [parseInt(v, 16), data[v]])))(require(`./${conf.app.dict.mfrs}`).data);
conf.help = {};
['en', 'ja'].forEach(v => {
  conf.help[v] = marked(fs.readFileSync(`${conf.app.dir.help}/help_${v}.md`, 'utf8'));
});

// Set up verbose mode
(function addVerboseMode() {
  // Checks if the verbose flag is passed.
  const argv = process.argv.slice(2),
        flag = 'v';
  if (argv.indexOf(flag) !== -1 || argv.indexOf(`-${flag}`) !== -1) {
    conf.app.verbose = true;
  }

  // Logs the message with a timestamp in the verbose mode.
  console.verbose = (msg, force) => {
    if (!conf.app.verbose && !force) { return; }
    console.log(`${Date.now()}  ${msg}`);
  };
})();

// Convert number to fixed-length hex string
Number.prototype.toHex = function (len) {
  return this.toString(16).padStart(len, '0');
};

// Convert hex string to Uint8Array
String.prototype.toUint8Array = function () {
  return this.replace(/0x/ig, '').replace(/[\s,]/g, '').match(/([0-9a-f]{2})/gi).map(hex => parseInt(hex, 16));
};

// EL processing module
const el = (function () {
  const module = {},
        EHD    = [0x10, 0x81],
        esvMap = {
          0x60: { success: null, error: 0x50 },
          0x61: { success: 0x71, error: 0x51 },
          0x62: { success: 0x72, error: 0x52 },
          0x63: { success: 0x73, error: 0x53 },
          0x6E: { success: 0x7E, error: 0x5E },
          0x74: { success: 0x7A, error: null }
        },
        myeoj  = conf.app.el.myeoj.toUpperCase();

  let tid = 0x0000;

  // Self-node
  module.self = {
    node: (function () {
      const res = {};
      let newEOJClass = 0x0000,
          newEOJID    = 0x00,
          newEPC      = 0x00,
          EDT         = [],
          newEDT      = [];
      for (let EOJClass in conf.app.el.self) {
        newEOJClass = parseInt(EOJClass, 16);
        res[newEOJClass] = {};
        for (let EOJID in conf.app.el.self[EOJClass]) {
          newEOJID = parseInt(EOJID, 16);
          res[newEOJClass][newEOJID] = {};
          for (let EPC in conf.app.el.self[EOJClass][EOJID]) {
            newEPC = parseInt(EPC, 16);
            EDT = conf.app.el.self[EOJClass][EOJID][EPC];

            // Auto-numbers for 0x83.
            if (newEPC === 0x83 && !EDT) {
              newEDT = [0xFE, 0x00, 0x00, 0x77].concat([...crypto.randomBytes(13)]);
            }
            // Converts a string to a Uint8Array.
            else if (typeof EDT === 'string') {
              newEDT = [...Buffer.from(EDT)];
            }
            // Converts string[] to number[].
            else {
              newEDT = EDT.map(hex => parseInt(hex, 16));
            }

            res[newEOJClass][newEOJID][newEPC] = newEDT;
          }
        }
      }
      return res;
    })(),
    includes: function (eoj) {
      return this.node[eoj.class] ? this.node[eoj.class][eoj.id] ? true : eoj.class !== 0x0EF0 && eoj.id === 0x00 ? true : false : false;
    },
    get: function (eoj) {
      return this.node[eoj.class][eoj.id];
    },
    setMap: function (eoj) {
      const setMap = this.node[eoj.class][eoj.id][0x9E].slice();
      let res = [];
      if (setMap.shift() < 16) {
        res = setMap;
      } else {
        setMap.forEach((v, i) => {
          for (let j = 8; j < 16; j++) {
            if (v & 1) {
              res.push(j * 16 + i);
            }
            v = v >> 1;
          }
        });
      }
      return res;
    },
    getMap: function (eoj) {
      const getMap = this.node[eoj.class][eoj.id][0x9F].slice();
      let res = [];
      if (getMap.shift() < 16) {
        res = getMap;
      } else {
        getMap.forEach((v, i) => {
          for (let j = 8; j < 16; j++) {
            if (v & 1) {
              res.push(j * 16 + i);
            }
            v = v >> 1;
          }
        });
      }
      return res;
    }
  };

  /**
   * Increments the TID and returns it.
   * @return {number} The next TID.
   */
  function getNextTID() {
    ++tid;
    if (0xFFFF < tid) { tid = 0x0000; }
    return tid;
  }

  /**
   * Converts the EL frame object to the EL frame.
   * @param {object} obj - The EL frame object.
   * @return {Buffer} The EL frame.
   */
  module.serialize = eldata => {
    const TID   = (eldata.tid ? eldata.tid : getNextTID()).toHex(4).toUint8Array(),
          SEOJ  = (eldata.seoj ? eldata.seoj.class.toHex(4) + eldata.seoj.id.toHex(2) : myeoj).toUint8Array(),
          DEOJ  = (eldata.deoj.class.toHex(4) + eldata.deoj.id.toHex(2)).toUint8Array(),
          ESV   = eldata.esv.toHex(2).toUint8Array(),
          elarr = EHD.concat(TID, SEOJ, DEOJ, ESV);

    let ops = [];

    // Non-SetGet
    if ([0x5E, 0x6E, 0x7E].indexOf(eldata.esv) === -1) {
      ops.push(eldata.opc.ops.length);
      eldata.opc.ops.forEach(op => {
        ops.push(op.epc);
        ops.push(op.edt.length);
        ops = ops.concat(op.edt);
      });
    }
    // SetGet
    else {
      ops.push(eldata.opcSet.ops.length);
      eldata.opcSet.ops.forEach(op => {
        ops.push(op.epc);
        ops.push(op.edt.length);
        ops = ops.concat(op.edt);
      });
      ops.push(eldata.opcGet.ops.length);
      eldata.opcGet.ops.forEach(op => {
        ops.push(op.epc);
        ops.push(op.edt.length);
        ops = ops.concat(op.edt);
      });
    }

    return Buffer.from(elarr.concat(ops));
  };

  /**
   * Converts the EL frame object to the EL frame.
   * @param {object} obj - The EL frame object.
   * @return {Buffer} The EL frame.
   */
  module.respond = eldata => {
    const TID    = eldata.tid.toHex(4).toUint8Array(),
          SEOJ   = (eldata.deoj.class.toHex(4) + eldata.deoj.id.toHex(2)).toUint8Array(),
          DEOJ   = (eldata.seoj.class.toHex(4) + eldata.seoj.id.toHex(2)).toUint8Array(),
          elarr  = EHD.concat(TID, SEOJ, DEOJ),
          setMap = module.self.setMap(eldata.deoj),
          getMap = module.self.getMap(eldata.deoj);

    let data = module.self.get(eldata.deoj),
        ops  = [],
        EDT  = [],
        err  = false;

    // SetI, SetC
    if ([0x60, 0x61].indexOf(eldata.esv) !== -1) {
      ops.push(eldata.opc.len);
      eldata.opc.ops.forEach(op => {
        if (setMap.indexOf(op.epc) === -1) {
          err = true;
          ops = ops.concat([op.epc], [op.pdc], op.edt);
          return;
        }
        // TODO: PDC size validation
        module.self.node[eldata.deoj.class][eldata.deoj.id][op.epc] = op.edt;
        ops = ops.concat([op.epc], [0x00]);
      });
      if (eldata.esv === 0x60 && !err) { return null; }
    }
    // Get, INF_REQ
    else if ([0x62, 0x63].indexOf(eldata.esv) !== -1) {
      ops.push(eldata.opc.len);
      eldata.opc.ops.forEach(op => {
        if (getMap.indexOf(op.epc) === -1) {
          err = true;
          ops = ops.concat([op.epc], [0x00]);
          return;
        }
        EDT = data[op.epc];
        ops = ops.concat([op.epc], [EDT.length], EDT);
      });
    }
    // SetGet
    else if (eldata.esv === 0x6E) {
      // OPCSet
      ops.push(eldata.opcSet.len);
      eldata.opcSet.ops.forEach(op => {
        if (setMap.indexOf(op.epc) === -1) {
          err = true;
          ops = ops.concat([op.epc], [op.pdc], op.edt);
          return;
        }
        // TODO: PDC size validation
        module.self.node[eldata.deoj.class][eldata.deoj.id][op.epc] = op.edt;
        ops = ops.concat([op.epc], [0x00]);
      });

      // Updates data
      data = module.self.get(eldata.deoj);

      // OPCGet
      ops.push(eldata.opcGet.len);
      eldata.opcGet.ops.forEach(op => {
        if (getMap.indexOf(op.epc) === -1) {
          err = true;
          ops = ops.concat([op.epc], [0x00]);
          return;
        }
        EDT = data[op.epc];
        ops = ops.concat([op.epc], [EDT.length], EDT);
      });
    }
    // INFC
    else if (eldata.esv === 0x74) {
      ops.push(eldata.opc.len);
      eldata.opc.ops.forEach(op => {
        ops = ops.concat([op.epc], [0x00]);
      });
    } else {
      return null;
    }

    const ESV = (err ? esvMap[eldata.esv].error: esvMap[eldata.esv].success).toHex(2).toUint8Array();
    return Buffer.from(elarr.concat(ESV, ops));
  };

  /**
   * Generates the EL frame to announce my device list.
   * @return {Buffer} The EL frame.
   */
  module.getMyDeviceList = () => {
    const EPC = 0xD5;
    const EDT = module.self.node[0x0EF0][0x01][EPC];
    return module.serialize({
      seoj: {
        class: 0x0EF0,
        id: 0x01
      },
      deoj: {
        class: 0x0EF0,
        id: 0x01
      },
      esv: 0x73,
      opc: {
        ops: [
          {
            epc: EPC,
            edt: EDT
          }
        ]
      },
      opcSet: {
        ops: []
      },
      opcGet: {
        ops: []
      }
    });
  };

  /**
   * Searches for all nodes
   */
  module.searchAllNodes = () => {
    return module.serialize({
      deoj: {
        class: 0x0EF0,
        id: 0x01
      },
      esv: 0x62,
      opc: {
        ops: [
          {
            epc: 0x82,
            edt: []
          },
          {
            epc: 0x83,
            edt: []
          },
          {
            epc: 0x8A,
            edt: []
          },
          {
            epc: 0xD6,
            edt: []
          }
        ]
      },
      opcSet: {
        ops: []
      },
      opcGet: {
        ops: []
      }
    });
  };

  /**
   * Converts the EL frame to the EL frame object.
   * @param {Buffer} msg - The EL frame.
   * @return {object} The EL frame object.
   */
  module.parse = msg => {
    const res = Object.seal({
      tid: 0x0000,
      seoj: {
        class: 0x0000,
        id: 0x00
      },
      deoj: {
        class: 0x0000,
        id: 0x00
      },
      esv: 0x00,
      opc: {
        len: 0x00,
        ops: []
      },
      opcSet: {
        len: 0x00,
        ops: []
      },
      opcGet: {
        len: 0x00,
        ops: []
      },
      hex: '1081'
    });

    let id = 1;

    // TID
    res.tid = msg[++id] * 16**2 + msg[++id];
    res.hex += ' ' + res.tid.toHex(4);

    // SEOJ
    res.seoj.class = msg[++id] * 16**2 + msg[++id];
    res.seoj.id = msg[++id];
    res.hex += ' ' + res.seoj.class.toHex(4) + res.seoj.id.toHex(2);

    // DEOJ
    res.deoj.class = msg[++id] * 16**2 + msg[++id];
    res.deoj.id = msg[++id];
    res.hex += ' ' + res.deoj.class.toHex(4) + res.deoj.id.toHex(2);

    // ESV
    res.esv = msg[++id];
    if ([0x50, 0x51, 0x52, 0x53, 0x5E, 0x60, 0x61, 0x62, 0x63, 0x6E, 0x71, 0x72, 0x73, 0x74, 0x7A, 0x7E].indexOf(res.esv) === -1) {
      return null;
    }
    res.hex += ' ' + res.esv.toHex(2);

    let op = null;
    if ([0x5E, 0x6E, 0x7E].indexOf(res.esv) === -1) {
      // OPC
      res.opc.len = msg[++id];
      res.hex += ' ' + res.opc.len.toHex(2);

      // Operations
      for (let i = 0; i < res.opc.len; i++) {
        op = {
          epc: 0x00,
          pdc: 0x00,
          edt: []
        };

        // EPC
        op.epc = msg[++id];
        if (typeof op.epc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.epc.toHex(2);

        // PDC
        op.pdc = msg[++id];
        if (typeof op.pdc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.pdc.toHex(2);

        // EDT
        for (let j = 0; j < op.pdc; j++) {
          op.edt.push(msg[++id]);
          if (typeof op.edt[j] === 'undefined') {
            return null;
          }
          res.hex += j === 0 ? ' ' + op.edt[j].toHex(2) : op.edt[j].toHex(2);
        }

        res.opc.ops.push(op);
      }
    } else {
      // OPCSet
      res.opcSet.len = msg[++id];
      res.hex += ' ' + res.opcSet.len.toHex(2);

      // Operations
      for (let i = 0; i < res.opcSet.len; i++) {
        op = {
          epc: 0x00,
          pdc: 0x00,
          edt: []
        };

        // EPC
        op.epc = msg[++id];
        if (typeof op.epc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.epc.toHex(2);

        // PDC
        op.pdc = msg[++id];
        if (typeof op.pdc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.pdc.toHex(2);

        // EDT
        for (let j = 0; j < op.pdc; j++) {
          op.edt.push(msg[++id]);
          if (typeof op.edt[j] === 'undefined') {
            return null;
          }
          res.hex += j === 0 ? ' ' + op.edt[j].toHex(2) : op.edt[j].toHex(2);
        }

        res.opcSet.ops.push(op);
      }

      // OPCGet
      res.opcGet.len = msg[++id];
      res.hex += ' ' + res.opcGet.len.toHex(2);

      // Operations
      for (let i = 0; i < res.opcGet.len; i++) {
        op = {
          epc: 0x00,
          pdc: 0x00,
          edt: []
        };

        // EPC
        op.epc = msg[++id];
        if (typeof op.epc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.epc.toHex(2);

        // PDC
        op.pdc = msg[++id];
        if (typeof op.pdc === 'undefined') {
          return null;
        }
        res.hex += ' ' + op.pdc.toHex(2);

        // EDT
        for (let j = 0; j < op.pdc; j++) {
          op.edt.push(msg[++id]);
          if (typeof op.edt[j] === 'undefined') {
            return null;
          }
          res.hex += j === 0 ? ' ' + op.edt[j].toHex(2) : op.edt[j].toHex(2);
        }

        res.opcGet.ops.push(op);
      }
    }

    if (typeof msg[++id] !== 'undefined') {
      return null;
    }

    res.hex = res.hex.toUpperCase();
    return res;
  };

  /**
   * Checks if a message follows the EL frame format.
   * @param {Buffer} msg - The UDP message.
   * @return {boolean} True if the message is an EL frame.
   */
  module.isELFrame = msg => {
    if (msg.length < 14) { return false; }
    if (msg[0] !== 0x10 || msg[1] !== 0x81) { return false; }
    return true;
  };

  // TODO: isELFrameObject()

  return module;
})();

// EL server module
const els = (function () {
  const module = {};

  let isAlive = false,
      socket = null,
      queueWorker = 0;

  module.queue = [];
  module.network = conf.app.el.network.toLowerCase();
  module.myip = '0.0.0.0';
  module.nic = {
    ver: conf.app.el.ipv6 ? 'ipv6' : 'ipv4',
    list: [],
    id: 0,
    refresh: function () {
      this.list = [];
      const nic = os.networkInterfaces();
      let id = 0;
      for (const name in nic) {
        ++id;
        const network = name.match(/vpn/i) ? 'vpn' : 'lan'; // TODO
        nic[name].forEach(v => {
          if (v.internal || v.family.toLowerCase() !== this.ver) { return; }
          const nicObj = {
            id: id,
            ip: v.address.toLowerCase(),
            name: name,
            network: network
          };

          // Prioritize local addresses starting with 192
          if (network === 'lan' && v.address.match(/^192.(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){3}$/)) {
            this.list.unshift(nicObj);
          } else {
            this.list.push(nicObj);
          }
        });
      }
    },
    get: function (network) {
      const res = {};
      if (typeof network !== 'string') {
        network = 'vpn';
      }
      network = network.toLowerCase();
      if (['lan', 'vpn', 'cloud'].indexOf(network) === -1) {
        network = 'vpn';
      }
      res.network = network;
      res.list = this.list.filter(nic => nic.network === network);
      return res;
    },
    set: function (network, id) {
      let res = this.get(network);
      if (res.list.length === 0) {
        network = 'lan';
        id = 0;
        res = this.get(network);
      }
      if (typeof id === 'undefined' || isNaN(id) || id <= 0) {
        this.id = res.list[0].id;
        module.myip = res.list[0].ip;
      } else {
        const nic = this.list.find(nic => nic.id === parseInt(id));
        this.id = nic.id;
        module.myip = nic.ip;
      }
      module.network = res.network;

      // Pushes node info.
      const node = {
        channel: 'node',
        message: {
          network: module.network,
          ipVer: this.ver,
          nicList: this.list,
          nicID: this.id,
          myip: module.myip,
          myeoj: conf.app.el.myeoj.toUpperCase()
        }
      };
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(node));
        }
      });
    }
  };

  function notifyUI(dir, ip, eldata) {
    const data = {
      channel: 'el',
      message: {
        time: Date.now(),
        dir: dir,
        ip: ip.toLowerCase(),
        el: eldata
      }
    };
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  function send(ip, msg) {
    if (!isAlive) { return; }

    console.verbose(`T  ${ip}  ${msg.toString('hex').toUpperCase()}`);

    notifyUI('T', ip, el.parse(msg));
    socket.send(msg, 0, msg.length, conf.app.el.port, ip);
  }

  module.multicast = msg => {
    module.queue.push({
      ip: conf.app.el.ipv6 ? conf.app.el.multicast.ipv6 : conf.app.el.multicast.ipv4,
      msg: msg
    });
  };

  module.stop = () => {
    if (!isAlive) { return; }

    clearInterval(queueWorker);
    module.queue = [];
    socket.close(() => {
      console.verbose('Stopping the EL server:                   [  OK  ]');
      isAlive = false;
    });
  };

  module.start = () => {
    if (isAlive) { return; }

    socket = dgram.createSocket(conf.app.el.ipv6 ? 'udp6' : 'udp4');
    isAlive = true;

    queueWorker = setInterval(() => {
      if (isAlive && module.queue.length !== 0) {
        const peek = module.queue.shift();
        send(peek.ip, peek.msg);
      }
    }, conf.app.el.interval);

    socket.on('listening', () => {
      console.verbose(`Listening for EL on ${module.myip}:${conf.app.el.port}/UDP`);
      socket.addMembership(conf.app.el.ipv6 ? conf.app.el.multicast.ipv6 : conf.app.el.multicast.ipv4);
      module.multicast(el.getMyDeviceList());
      module.multicast(el.searchAllNodes());
    });
    socket.on('error', err => {
      console.verbose(`EL Server ${err.stack}`);
      module.stop();
    });
    socket.on('message', (msg, rinfo) => {
      // Discards loopback messages.
      if (rinfo.address === module.myip) { return; }

      console.verbose(`R  ${rinfo.address}  ${msg.toString('hex').toUpperCase()}`);

      // Discards non-EL frames.
      if (!el.isELFrame(msg)) { return; }

      // Parses the EL frame.
      const eldata = el.parse(msg);
      if (!eldata) { return; }

      // Discards if DEOJ mismatches.
      if (!el.self.includes(eldata.deoj)) { return; }

      // Shares with Web UI.
      notifyUI('R', rinfo.address, eldata);

      // Checks if ESV is a request.
      if ([0x60, 0x61, 0x62, 0x63, 0x6E, 0x74].indexOf(eldata.esv) !== -1) {
        const eldataList = [];

        // Converts the instance code 0x00 to all the instances.
        if (eldata.deoj.id === 0x00) {
          Object.keys(el.self.node[eldata.deoj.class]).forEach(id => {
            const newEldata = structuredClone(eldata);
            newEldata.deoj.id = parseInt(id);
            eldataList.push(newEldata);
          });
        } else {
          eldataList.push(eldata);
        }

        eldataList.forEach(eldata => {
          // Gets a process result.
          const res = el.respond(eldata);
          if (!res) { return; }

          // Replies the response.
          module.queue.push({
            ip: rinfo.address,
            msg: res
          });
        });
      }
    });

    socket.bind(conf.app.el.port, module.myip);
  };

  module.restart = () => {
    if (!isAlive) {
      module.start();
    }

    clearInterval(queueWorker);
    module.queue = [];
    socket.close(() => {
      console.verbose('Stopping the EL server:                   [  OK  ]');
      isAlive = false;
      module.start();
    });
  };

  return module;
})();

// Initialize the app
(function init() {
  console.log(['', 'Boot Log:'].join('\n'));
  console.verbose('Starting...', true);

  // Says bye finally.
  function close() {
    console.verbose('Bye', true);
  }
  process.on('exit', close);

  // Makes the tmp dir if not exists.
  if (!fs.existsSync(conf.app.dir.tmp)) {
    fs.mkdirSync(conf.app.dir.tmp);
  }

  // Checks if the tmp dir is writable.
  try {
    fs.accessSync(conf.app.dir.tmp, fs.constants.W_OK);
  } catch (err) {
    console.verbose('Error: Make sure the tmp dir is writable', true);
    process.exit();
  }

  // Checks if the app isn't already running.
  const pidfile = `${conf.app.dir.tmp}/app.pid`;
  try {
    fs.accessSync(pidfile, fs.constants.F_OK);
    const pid = fs.readFileSync(pidfile, 'utf8');
    if (pid === '') { throw false; }
    process.kill(pid, 0);
    console.verbose('Error: The app is already running', true);
    process.exit();
  } catch (err) {
    fs.writeFile(pidfile, process.pid.toString(), err => {
      if (err) {
        console.verbose('Error: Couldn\'t write the PID file', true);
        process.exit();
      }
    });
  }

  // Handles POSIX signals.
  function clean() {
    console.verbose('Closing...', true);
    els.stop();
    console.verbose('Stopping the EL server:                   [  OK  ]');
    wss.close();
    console.verbose('Stopping the WebSocket server:            [  OK  ]');
    server.close();
    console.verbose('Stopping the HTTP server:                 [  OK  ]');
    fs.unlinkSync(pidfile);
    console.verbose('Deleting the PID file:                    [  OK  ]');
    process.exit();
  }
  process.on('SIGHUP', clean);
  process.on('SIGTERM', clean);
  process.on('SIGINT', clean);
})();

// Start the EL server
els.nic.refresh();
els.nic.set(conf.app.el.network);
els.start();

// Start the HTTP and WebSocket server
server.listen(conf.app.http.port, () => {
  console.verbose(`Listening for HTTP/WebSocket on 0.0.0.0:${conf.app.http.port}/TCP`);
  console.log([
    '',
    '------------------------------',
    conf.app.title,
    `v${conf.ver} (Released on ${conf.date})`,
    conf.app.copyright,
    '',
    `http://127.0.0.1:${conf.app.http.port}/`,
    `http://[::1]:${conf.app.http.port}/`,
    '',
    'To exit, press ^C',
    '------------------------------',
    '',
    'Operations Log:'
  ].join('\n'));
  console.verbose('Hello', true);
});

// Routes
app.use(history());
app.use(express.static(path.join(__dirname, conf.app.dir.html)));

// Catch-all error handler
app.use((err, req, res, next) => {
  console.verbose(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// WebSocket connection handler
wss.on('connection', ws => {
  console.verbose('A WebSocket connection has opened');

  ws.on('close', () => {
    console.verbose('A WebSocket connection has closed');
  });
  ws.on('message', e => {
    const { channel, message } = JSON.parse(e);
    switch (channel) {
      case 'el':
        if (typeof message !== 'object' || typeof message.ip !== 'string' || typeof message.el !== 'object') { return; }

        // Makes the EL frame.
        message.el = el.serialize(message.el);
        if (!message.el) { return; }

        // Sends the EL frame.
        if (message.ip === 'multicast') {
          els.multicast(message.el);
        } else {
          els.queue.push({
            ip: message.ip,
            msg: message.el
          });
        }

        break;
      case 'network':
        els.nic.refresh();
        els.nic.set(message);
        els.restart();
        break;
      case 'nic':
        els.nic.set(message.network, message.id);
        els.restart();
        break;
    }
  });

  // Push text
  const text = {
    channel: 'text',
    message: conf.text
  };
  ws.send(JSON.stringify(text));

  // Push node info
  const node = {
    channel: 'node',
    message: {
      network: els.network,
      ipVer: els.nic.ver,
      nicList: els.nic.list,
      nicID: els.nic.id,
      myip: els.myip,
      myeoj: conf.app.el.myeoj.toUpperCase()
    }
  };
  ws.send(JSON.stringify(node));

  // Push settings
  const settings = {
    channel: 'settings',
    message: conf.app.settings
  };
  ws.send(JSON.stringify(settings));

  // Push MRA
  const mra = {
    channel: 'mra',
    message: conf.mra
  };
  ws.send(JSON.stringify(mra));

  // Push manufacturer code
  const mfrs = {
    channel: 'mfrs',
    message: conf.mfrs
  };
  ws.send(JSON.stringify(mfrs));

  // Push help documents
  const help = {
    channel: 'help',
    message: conf.help
  };
  ws.send(JSON.stringify(help));
});
