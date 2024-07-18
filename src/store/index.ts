import { createStore } from 'vuex';
import axios from 'axios';
import merge from 'deepmerge';

let ws: WebSocket;

// Converts a number to a fixed-length hex string
Number.prototype.toHex = function (len) {
  return this.toString(16).padStart(len, '0');
};

// Converts a number to a signed integer of a specific number of bits
Number.prototype.toSignedInt = function (format) {
  const num = Number(this);

  let bits = 0;
  switch (format) {
    case 'int8':
      bits = 8;
      break;
    case 'int16':
      bits = 16;
      break;
    case 'int32':
      bits = 32;
      break;
    default:
      return num;
  }

  const underflow = 2**(bits - 1),
        overflow  = underflow - 1;

  switch (num) {
    case underflow:
      return 'underflowed';
    case overflow:
      return 'overflowed';
  }

  if (underflow < this) {
    return num - underflow - 2**bits / 2;
  }

  return num;
};

// Converts a numeric Array to a hex string
Array.prototype.toHex = function () {
  return this.map((byte: number) => byte.toHex(2)).join('');
};

// Converts a calling hex string to a Uint8Array
String.prototype.toUint8Array = function () {
  const hexList = this.replace(/0x/ig, '').replace(/[\s,]/g, '').match(/([0-9a-f]{2})/gi);
  if (hexList === null) { return null; }
  return hexList.map(hex => parseInt(hex, 16));
};

// Prefixes a passed string to a calling string
String.prototype.prefix = function (prefix: string) {
  return prefix + this;
};

// Pick a right description for a given release
function getValidOne(descriptions: DeviceDescription[] | PropertyDescription[], release: string): DeviceDescription | PropertyDescription | null {
  return [...descriptions].find(v => v.validRelease.from <= release && (v.validRelease.to === 'latest' || release <= v.validRelease.to)) || null;
}

// Decode EDT as per the property description
function decodeEDT(epc: number, edt: number[], definition: any, locale: string): number | string | null {
  let result = null,
      matched = undefined,
      edtMap = [...edt],
      epcMap = [] as number[];

  if (Object.prototype.hasOwnProperty.call(definition, 'size') && definition.size !== edt.length) { return result; }

  switch(definition.type) {
    case 'number':
      switch (definition.format) {
        case 'int8':
        case 'int16':
        case 'int32':
          result = parseInt(edt.toHex(), 16).toSignedInt(definition.format);
          break;
        case 'uint8':
        case 'uint16':
        case 'uint32':
          result = parseInt(edt.toHex(), 16);
          break;
      }
      if (typeof result === 'number' && Object.prototype.hasOwnProperty.call(definition, 'multiple')) {
        result = result * definition.multiple;
      }
      if (typeof result === 'number' && Object.prototype.hasOwnProperty.call(definition, 'unit')) {
        result = result.toString() + ' ' + definition.unit;
      }
      break;
    case 'state':
      matched = definition.enum.find((v: any) => Number(v.edt) === parseInt(edt.toHex(), 16));
      if (matched) {
        result = matched.descriptions[locale];
      }
      break;
    case 'raw':
      switch (epc) {
        case 0x82:
          // Convert the third byte to an ASCII character
          result = String.fromCharCode(edt[2]).toUpperCase();
          // Append the fourth byte as the revision number
          if (edt[3] > 0x00) {
            result = result + ' rev. ' + edt[3];
          }
          break;
        case 0x9D:
        case 0x9E:
        case 0x9F:
          if (edtMap.shift()! < 16) {
            epcMap = edtMap;
          } else {
            edtMap.forEach((v: number, i: number) => {
              for (let j = 8; j < 16; j++) {
                if (v & 1) {
                  epcMap.push(j * 16 + i);
                }
                v = v >> 1;
              }
            });
          }
          result = epcMap.sort().map(epc => epc.toHex(2).toUpperCase().prefix('0x')).join(', ');
          break;
      }
      break;
    case 'date':
      // Skip unless 4 bytes
      if (edt.length !== 4) { break; }
      // Format as YYYY-MM-DD
      result = edt[0] * 16**2 + edt[1] + '-' + edt[2].toString().padStart(2, '0') + '-' + edt[3].toString().padStart(2, '0');
      break;
    case 'time':
      // Format as hh:mm
      result = edt[0].toString().padStart(2, '0') + ':' + edt[1].toString().padStart(2, '0');
      break;
    case 'object':
      switch (epc) {
        case 0x9A:
          // Unit (1 byte) + Time (4 bytes)
          result = parseInt([edt[1], edt[2], edt [3], edt[4]].toHex(), 16) + ' ' + decodeEDT(epc, [edt[0]], definition.properties[0].element, locale);
          break;
        case 0xCA:
        case 0xCB:
          // Min (uint16) + Max (uint16)
          result = decodeEDT(epc, [edt[0], edt[1]], definition.properties[0].element, locale) + ' ' + decodeEDT(epc, [edt[2], edt[3]], definition.properties[1].element, locale);
          break;
      }
      break;
  }

  return result;
};

// Data shapes
const Languages = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'ja',
    name: '日本語'
  }
];
const Settings = {
  battery: {
    0x027D: {
      address: "",
      id: ""
    },
    0x0279: {
      address: "",
      id: ""
    },
    0x0287: {
      address: "",
      id: ""
    },
    0x0288: {
      address: "",
      id: ""
    },
    0x028D: {
      address: "",
      id: ""
    },
    0x0130: {
      address: "",
      id: ""
    }
  },
  evChargerDischarger: {
    0x027E: {
      address: "",
      id: ""
    },
    0x0279: {
      address: "",
      id: ""
    },
    0x0287: {
      address: "",
      id: ""
    },
    0x0288: {
      address: "",
      id: ""
    },
    0x028D: {
      address: "",
      id: ""
    },
    0x0130: {
      address: "",
      id: ""
    }
  }
};
const SingleDevice = {
  ip: '',
  eoj: {
    class: 0x0000,
    id: 0x00
  },
  release: ''
};
const CameraSearchCriteria = {
  fromPiCam: 1,
  toPiCam: 20,
  fromPort: 8080,
  toPort: 8080
};
const CameraHolders = {
  single0: 0,
  single1: 0,
  single2: 0,
  battery0: 0,
  battery1: 0,
  battery2: 0,
  battery3: 0,
  evChargerDischarger0: 0,
  evChargerDischarger1: 0,
  evChargerDischarger2: 0,
  evChargerDischarger3: 0
};
const BatterySystemData = {
  powerPoints: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    edt: {
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: ''
    }
  },
  storageBattery: {
    chargeableElectricity: 0,
    dischargeableElectricity: 0,
    workingOperationStatus: 0,
    remainingStoredElectricity: 0,
    edt: {
      chargeableElectricity: '',
      dischargeableElectricity: '',
      workingOperationStatus: '',
      remainingStoredElectricity: ''
    }
  },
  homeAirConditioner: {
    operationStatus: 0,
    operationModeSetting: 0,
    setTemperatureValue: 0,
    edt: {
      operationStatus: '',
      operationModeSetting: '',
      setTemperatureValue: ''
    }
  },
  smartMeter: {
    currentTimeSetting: 0,
    edt: {
      currentTimeSetting: '--:--'
    }
  }
};
const BatterySystem = {
  storageBattery: SingleDevice,
  solarPower: SingleDevice,
  distributionBoard: SingleDevice,
  smartMeter: SingleDevice,
  subMeter: SingleDevice,
  airConditioner: SingleDevice
};
const EVChargerDischargerSystemData = {
  powerPoints: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    edt: {
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: ''
    }
  },
  evChargerDischarger: {
    chargeableElectricity: 0,
    dischargeableElectricity: 0,
    workingOperationStatus: 0,
    remainingStoredElectricity: 0,
    chargeDischargeStatus: 0,
    edt: {
      chargeableElectricity: '',
      dischargeableElectricity: '',
      workingOperationStatus: '',
      remainingStoredElectricity: '',
      chargeDischargeStatus: '',
    }
  },
  homeAirConditioner: {
    operationStatus: 0,
    operationModeSetting: 0,
    setTemperatureValue: 0,
    edt: {
      operationStatus: '',
      operationModeSetting: '',
      setTemperatureValue: ''
    }
  },
  smartMeter: {
    currentTimeSetting: 0,
    edt: {
      currentTimeSetting: '--:--'
    }
  }
};
const EVChargerDischargerSystem = {
  evChargerDischarger: SingleDevice,
  solarPower: SingleDevice,
  distributionBoard: SingleDevice,
  smartMeter: SingleDevice,
  subMeter: SingleDevice,
  airConditioner: SingleDevice
};

export default createStore({
  state: {
    languages: Languages,
    locale: localStorage.getItem('el-demoapp-locale') || 'en',
    text: {} as Text,
    network: 'vpn',
    ipVer: 'ipv4',
    nicList: [] as NIC[],
    nicID: 0,
    myip: '0.0.0.0',
    myeoj: '05FF01',
    mra: [] as DeviceDescription[],
    mfrs: {} as ManufacturerList,
    settings: Settings,
    tempSettings: Settings,
    showLog: true,
    log: [] as Log[],
    snapshotLog: [] as Log[],
    nodes: {} as NodesCache,
    singleDeviceOptions: [] as SingleSettings[],
    device: SingleDevice,
    cameraViewType:  'CCTV' || 'diagram',
    batterySystemData: BatterySystemData,
    batterySystemMode: localStorage.getItem('el-demoapp-battery-system-mode') || 'real',
    batterySystem: JSON.parse(localStorage.getItem('el-demoapp-battery-system') || 'null') || BatterySystem as BatterySystem,
    batterySystemPointC: 0xE7,
    batterySystemPointD: 0xD8,
    batterySystemPointE: 0xD9,
    batterySystemUIModeSimple: false,
    batterySystemUIModePhoto: false,
    evChargerDischargerSystemData: EVChargerDischargerSystemData,
    evChargerDischargerSystemMode: localStorage.getItem('el-demoapp-evchargerdischarger-system-mode') || 'real',
    evChargerDischargerSystem: JSON.parse(localStorage.getItem('el-demoapp-evchargerdischarger-system') || 'null') || EVChargerDischargerSystem as EVChargerDischargerSystem,
    evChargerDischargerSystemPointC: 0xE7,
    evChargerDischargerSystemPointD: 0xD8,
    evChargerDischargerSystemPointE: 0xD9,
    evChargerDischargerSystemUIModeSimple: false,
    evChargerDischargerSystemUIModePhoto: false,
    cameraSearchCriteria: CameraSearchCriteria as CameraSearchCriteria,
    cameras: JSON.parse(localStorage.getItem('el-demoapp-cameras') || 'null') || [] as Camera[],
    cameraHolders: JSON.parse(localStorage.getItem('el-demoapp-camera-holders') || 'null') || CameraHolders as CameraHolders,
    devicePropertiesFetchInterval: 10000,
    help: {} as Help,
    helpMenu: {} as HelpMenu,
    deviceNameMap: {},
  },
  getters: {
    text: state => {
      return state.text[state.locale];
    },
    nicList: state => {
      return state.nicList.filter(nic => nic.network === state.network);
    },
    deviceDescription: state => (classCode: number, release: string) => {
      const deviceDescriptions = state.mra.filter((v: DeviceDescription) => v.eoj === Number(classCode));
      switch (deviceDescriptions.length) {
        case 0:
          return null;
        case 1:
          return deviceDescriptions[0];
      }
      return getValidOne(deviceDescriptions, release);
    },
    propertyDescription: (_, getters) => (classCode: number, epc: number, release: string) => {
      const deviceDescription = getters.deviceDescription(classCode, release);
      if (deviceDescription === null) { return null; }
      const propertyDescriptions = deviceDescription.elProperties.filter((v: PropertyDescription) => v.epc === epc);
      switch (propertyDescriptions.length) {
        case 0:
          return null;
        case 1:
          return propertyDescriptions[0];
      }
      return getValidOne(propertyDescriptions, release);
    },
    className: (state, getters) => (classCode: number, release: string) => {
      const deviceDescription = getters.deviceDescription(classCode, release);
      if (deviceDescription === null) { return 'Unknown device'; }
      return deviceDescription.className[state.locale];
    },
    manufacturerName: state => (manufacturerCode: number) => {
      if (typeof state.mfrs[manufacturerCode] === 'undefined') { return ''; }
      if (typeof state.mfrs[manufacturerCode][state.locale] === 'undefined') { return ''; }
      return state.mfrs[manufacturerCode][state.locale];
    },
    data: state => (ip: string, eoj: { class: number, id: number }, epc: number) => {
      if (typeof state.nodes[ip] === 'undefined') { return []; }
      if (typeof state.nodes[ip][eoj.class] === 'undefined') { return []; }
      if (typeof state.nodes[ip][eoj.class][eoj.id] === 'undefined') { return []; }
      if (typeof state.nodes[ip][eoj.class][eoj.id][epc] === 'undefined') { return []; }
      return state.nodes[ip][eoj.class][eoj.id][epc];
    },
    decodedData: state => (epc: number, edt: number[], propertyDescription: any) => {
      let result = null;

      if (propertyDescription.data.hasOwnProperty('oneOf')) {
        for (const i in propertyDescription.data.oneOf) {
          result = decodeEDT(epc, edt, propertyDescription.data.oneOf[i], state.locale);
          if (result !== null) { break; }
        }
      } else {
        result = decodeEDT(epc, edt, propertyDescription.data, state.locale);
      }

      return result;
    },
    setPropertyMap: (_, getters) => (ip: string, eoj: { class: number, id: number }, includeUserDefinedEPCs: boolean) => {
      const setMap = [...getters.data(ip, eoj, 0x9E)];
      if (setMap === []) { return setMap; }
      let res = [];
      if (setMap.shift() < 16) {
        res = setMap;
      } else {
        setMap.forEach((v: number, i: number) => {
          for (let j = 8; j < 16; j++) {
            if (v & 1) {
              res.push(j * 16 + i);
            }
            v = v >> 1;
          }
        });
      }

      // Exclude user-defined EPCs from 0xF0 (240) to 0xFF (255)
      if (!includeUserDefinedEPCs) {
        res = res.filter(v => v < 240);
      }

      return res.sort();
    },
    getPropertyMap: (_, getters) => (ip: string, eoj: { class: number, id: number }) => {
      const getMap = [...getters.data(ip, eoj, 0x9F)];
      if (getMap === []) { return getMap; }
      let res = [];
      if (getMap.shift() < 16) {
        res = getMap;
      } else {
        getMap.forEach((v: number, i: number) => {
          for (let j = 8; j < 16; j++) {
            if (v & 1) {
              res.push(j * 16 + i);
            }
            v = v >> 1;
          }
        });
      }
      return res.sort();
    },
    singleDeviceTargets: state => {
      const list = [] as number[];
      state.singleDeviceOptions.forEach((v, i) => {
        if (v.checked) {
          list.push(i);
        }
      });
      return list.sort();
    },
    checkedSingleDeviceOptions: state => {
      return state.singleDeviceOptions.filter(v => v.checked);
    },
    isCheckedClass: state => (classCode: number | string) => {
      const search = state.singleDeviceOptions.find(v => v.class === Number(classCode));
      if (typeof search === 'undefined') { return false; }
      return search.checked;
    },
    help: state => {
      return state.help[state.locale];
    },
    helpMenu: state => {
      return state.helpMenu[state.locale];
    },
    cameraViewType: state => state.cameraViewType,
  },
  mutations: {
    setLocale(state, data) {
      state.locale = data;
      localStorage.setItem('el-demoapp-locale', data);
    },
    setText(state, data) {
      state.text = data;
    },
    setNetwork(state, data) {
      state.network = data;
    },
    setIPVer(state, data) {
      state.ipVer = data;
    },
    setNICList(state, data) {
      state.nicList = data;
    },
    setNICID(state, data) {
      state.nicID = data;
    },
    setMyIP(state, data) {
      state.myip = data;
    },
    setMyEOJ(state, data) {
      state.myeoj = data;
    },
    setMRA(state, data) {
      state.mra = data;
    },
    setManufacturers(state, data) {
      state.mfrs = data;
    },
    setSettings(state, data) {
      state.settings = merge(state.settings, data);
      state.tempSettings = JSON.parse(JSON.stringify(state.settings));
    },
    setTempSettings(state, data) {
      state.tempSettings = merge(state.tempSettings, data);
    },
    resetTempSettings(state) {
      state.tempSettings = JSON.parse(JSON.stringify(state.settings));
    },
    setShowLog(state, data) {
      state.showLog = data;
    },
    addLog(state, data) {
      state.log.push(data);
    },
    resetLog(state) {
      state.log = [];
    },
    setSnapshotLog(state) {
      state.snapshotLog = state.log.slice();
    },
    resetSnapshotLog(state) {
      state.snapshotLog = [];
    },
    setNode(state, data: { ip: string, eojList: any[], eoj?: { class: number, id: number }, epc?: number, edt?: number[], key?: string, value?: any }) {
      const copy = { ...state.nodes };
      if (!Object.prototype.hasOwnProperty.call(copy, data.ip)) {
        copy[data.ip] = {};
      }
      if (typeof data.eojList !== 'undefined') {
        let nodeProfile = null;
        if (Object.prototype.hasOwnProperty.call(copy[data.ip], 0x0EF0)) {
          nodeProfile = { ...copy[data.ip][0x0EF0] };
        }
        copy[data.ip] = {};
        if (nodeProfile !== null) {
          copy[data.ip][0x0EF0] = nodeProfile;
        }
        data.eojList.forEach(eoj => {
          copy[data.ip][eoj.class] = {};
          copy[data.ip][eoj.class][eoj.id] = {};
        });
      }
      if (typeof data.eoj !== 'undefined') {
        if (!Object.prototype.hasOwnProperty.call(copy[data.ip], data.eoj.class)) {
          copy[data.ip][data.eoj.class] = {};
        }
        if (!Object.prototype.hasOwnProperty.call(copy[data.ip][data.eoj.class], data.eoj.id)) {
          copy[data.ip][data.eoj.class][data.eoj.id] = {};
        }
        if (typeof data.epc !== 'undefined' && typeof data.edt !== 'undefined') {
          copy[data.ip][data.eoj.class][data.eoj.id][data.epc] = data.edt;
        }
        if (typeof data.key !== 'undefined' && typeof data.value !== 'undefined') {
          copy[data.ip][data.eoj.class][data.eoj.id][data.key] = data.value;
        }
      }
      state.nodes = copy;
    },
    resetNode(state) {
      state.nodes = {};
    },
    setSingleDeviceOptions(state, data) {
      state.singleDeviceOptions = data;
    },
    setSingleDeviceTargets(state, data: number[]) {
      state.singleDeviceOptions = state.singleDeviceOptions.map((v, i) => {
        if (data.indexOf(i) !== -1) {
          return {
            ...v,
            checked: true
          };
        }
        return {
          ...v,
          checked: false
        };
      });
    },
    setSingleDevice(state, data) {
      state.device = data;
      state.cameraViewType = data.eoj.class == 638 ? 'diagram' : 'CCTV';
    },
    resetSingleDevice(state) {
      state.device = SingleDevice;
    },
    setBatterySystemMode(state, data) {
      state.batterySystemMode = data;
      localStorage.setItem('el-demoapp-battery-system-mode', data);
    },
    assignBatterySystemDevice(state, data: { type: string, device: typeof SingleDevice }) {
      state.batterySystem[data.type] = data.device;
      localStorage.setItem('el-demoapp-battery-system', JSON.stringify(state.batterySystem));
    },
    setBatterySystemPointC(state, data) {
      state.batterySystemPointC = data;
    },
    setBatterySystemPointD(state, data) {
      state.batterySystemPointD = data;
    },
    setBatterySystemPointE(state, data) {
      state.batterySystemPointE = data;
    },
    setBatterySystemUIModeSimple(state, data) {
      state.batterySystemUIModeSimple = data;
    },
    setBatterySystemUIModePhoto(state, data) {
      state.batterySystemUIModePhoto = data;
    },
    setEVChargerDischargerSystemMode(state, data) {
      state.evChargerDischargerSystemMode = data;
      localStorage.setItem('el-demoapp-evchargerdischarger-system-mode', data);
    },
    assignEVChargerDischargerSystemDevice(state, data: { type: string, device: typeof SingleDevice }) {
      state.evChargerDischargerSystem[data.type] = data.device;
      localStorage.setItem('el-demoapp-evchargerdischarger-system', JSON.stringify(state.evChargerDischargerSystem));
    },
    setEVChargerDischargerSystemPointC(state, data) {
      state.evChargerDischargerSystemPointC = data;
    },
    setEVChargerDischargerSystemPointD(state, data) {
      state.evChargerDischargerSystemPointD = data;
    },
    setEVChargerDischargerSystemPointE(state, data) {
      state.evChargerDischargerSystemPointE = data;
    },
    setEVChargerDischargerSystemUIModeSimple(state, data) {
      state.evChargerDischargerSystemUIModeSimple = data;
    },
    setEVChargerDischargerSystemUIModePhoto(state, data) {
      state.evChargerDischargerSystemUIModePhoto = data;
    },
    setCameraSearchCriteria(state, data) {
      state.cameraSearchCriteria = merge(state.cameraSearchCriteria, data);
    },
    resetCameraSearchCriteria(state) {
      state.cameraSearchCriteria = CameraSearchCriteria;
    },
    pushCamera(state, data) {
      state.cameras.push(data);
      state.cameras.sort((a: Camera, b: Camera) => {
        if (a.host < b.host) {
          return -1;
        } else if (a.host === b.host) {
          if (a.port < b.port) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      });
      localStorage.setItem('el-demoapp-cameras', JSON.stringify(state.cameras));
    },
    resetCameras(state) {
      state.cameras = [];
      localStorage.removeItem('el-demoapp-cameras');
    },
    assignCamera(state, data: { holder: string, camera: number }) {
      state.cameraHolders[data.holder] = data.camera;
      localStorage.setItem('el-demoapp-camera-holders', JSON.stringify(state.cameraHolders));
    },
    resetCameraHolders(state) {
      state.cameraHolders = CameraHolders;
      localStorage.removeItem('el-demoapp-camera-holders');
    },
    setHelp(state, data) {
      state.help = data;
    },
    setHelpMenu(state, data) {
      state.helpMenu = data;
    },
  },
  actions: {
    async openWebSocket({ commit, dispatch, getters }) {
      if (typeof ws !== 'undefined' && ws.readyState !== WebSocket.CLOSED) { return; }
      ws = new WebSocket('ws://' + location.host);
      ws.onopen = () => { console.log('A WebSocket connection has opened'); };
      ws.onclose = () => { console.log('A WebSocket connection has closed'); };
      ws.onerror = err => { console.error(err); };
      ws.onmessage = e => {
        const { channel, message } = JSON.parse(e.data);
        switch (channel) {
          case 'text':
            commit('setText', message);
            break;
          case 'node':
            commit('setNetwork', message.network);
            commit('setIPVer', message.ipVer);
            commit('setNICList', message.nicList);
            commit('setNICID', message.nicID);
            commit('setMyIP', message.myip);
            commit('setMyEOJ', message.myeoj);
            commit('resetNode');
            commit('resetSingleDevice');
            commit('resetCameraSearchCriteria');
            break;
          case 'settings':
            commit('setSingleDeviceOptions', message.singleDeviceOptions);
            commit('setSettings', message);
            break;
          case 'mra':
            commit('setMRA', message);
            break;
          case 'mfrs':
            commit('setManufacturers', message);
            break;
          case 'help':
            commit('setHelp', message);
            commit('setHelpMenu', (() => {
              const menu = {} as HelpMenu;
              ['en', 'ja'].forEach(v => {
                const temp = document.createElement('div');
                temp.innerHTML = message[v];
                menu[v] = [...temp.querySelectorAll('h1')].map(h1 => {
                  return {
                    hash: h1.id,
                    label: h1.innerText
                  };
                });
              });
              return menu;
            })());
            break;
          case 'el':
            commit('addLog', {
              time: message.time,
              dir: message.dir,
              ip: message.ip,
              hex: message.el.hex
            });

            // Updates the local nodes cache
            if (message.dir === 'R') {
              if ([0x52, 0x53, 0x72, 0x73, 0x74].indexOf(message.el.esv) !== -1) {
                message.el.opc.ops.forEach((v: { epc: number, pdc: number, edt: number[] }) => {
                  if (v.pdc === 0x00) { return; }
                  commit('setNode', { ip: message.ip, eoj: message.el.seoj, epc: v.epc, edt: v.edt });

                  // Processes 0xD5/0xD6 (Instance list)
                  if (message.el.seoj.class === 0x0EF0 && (v.epc === 0xD5 || v.epc === 0xD6)) {
                    // Converts the instance list to Array
                    const eojList = ((edt) => {
                      const list: any = [];
                      edt.shift();
                      for (let i = 0; i < edt.length; i += 3) {
                        list.push({
                          class: edt[i] * 16**2 + edt[i+1],
                          id: edt[i+2]
                        });
                      }
                      return list;
                    })(v.edt);

                    // Resets the node's cached instance list
                    commit('setNode', { ip: message.ip, eojList: eojList });

                    // Gets 0x82, 0x83, 0x8A, 0x9E, 0x9F from each instance
                    const questions = [0x82, 0x83, 0x8A, 0x9E, 0x9F];
                    eojList.forEach((eoj: any) => {
                      if (0 < questions.length) {
                        let batch = [];
                        for (let i = 0; i < questions.length; i += 4) {
                          batch = questions.slice(i, i + 4);
                          dispatch('sendEL', {
                            ip: message.ip,
                            el: {
                              deoj: eoj,
                              esv: 0x62,
                              opc: {
                                ops: batch.map((epc: number) => { return { epc: epc, edt: [] }; })
                              }
                            }
                          });
                        }
                      }
                    });
                  }

                  // Processes 0x82 (Release)
                  if (v.epc === 0x82) {
                    commit('setNode', { ip: message.ip, eoj: message.el.seoj, key: 'release', value: String.fromCharCode(v.edt[2]) });
                  }
                  // Processes 0x8A (Manufacturer code)
                  if (v.epc === 0x8A) {
                    commit('setNode', { ip: message.ip, eoj: message.el.seoj, key: 'manufacturer', value: getters.manufacturerName(v.edt[0] * 16**4 + v.edt[1] * 16**2 + v.edt[2]) });
                  }
                });
              } else if ([0x5E, 0x7E].indexOf(message.el.esv) !== -1) {
                message.el.opcGet.ops.forEach((v: { epc: number, pdc: number, edt: number[] }) => {
                  if (v.pdc === 0x00) { return; }
                  commit('setNode', { ip: message.ip, eoj: message.el.seoj, epc: v.epc, edt: v.edt });

                  // Processes 0xD5/0xD6 (Instance list)
                  if (message.el.seoj.class === 0x0EF0 && (v.epc === 0xD5 || v.epc === 0xD6)) {
                    // Converts the instance list to Array
                    const eojList = ((edt) => {
                      const list: any = [];
                      edt.shift();
                      for (let i = 0; i < edt.length; i += 3) {
                        list.push({
                          class: edt[i] * 16**2 + edt[i+1],
                          id: edt[i+2]
                        });
                      }
                      return list;
                    })(v.edt);

                    // Resets the node's cached instance list
                    commit('setNode', { ip: message.ip, eojList: eojList });

                    // Gets 0x82, 0x83, 0x8A, 0x9E, 0x9F from each instance
                    const questions = [0x82, 0x83, 0x8A, 0x9E, 0x9F];
                    eojList.forEach((eoj: any) => {
                      if (0 < questions.length) {
                        let batch = [];
                        for (let i = 0; i < questions.length; i += 4) {
                          batch = questions.slice(i, i + 4);
                          dispatch('sendEL', {
                            ip: message.ip,
                            el: {
                              deoj: eoj,
                              esv: 0x62,
                              opc: {
                                ops: batch.map((epc: number) => { return { epc: epc, edt: [] }; })
                              }
                            }
                          });
                        }
                      }
                    });
                  }

                  // Processes 0x82 (Release)
                  if (v.epc === 0x82) {
                    commit('setNode', { ip: message.ip, eoj: message.el.seoj, key: 'release', value: String.fromCharCode(v.edt[2]) });
                  }
                  // Processes 0x8A (Manufacturer code)
                  if (v.epc === 0x8A) {
                    commit('setNode', { ip: message.ip, eoj: message.el.seoj, key: 'manufacturer', value: getters.manufacturerName(v.edt[0] * 16**4 + v.edt[1] * 16**2 + v.edt[2]) });
                  }
                });
              }
            }

            break;
        }
      };
    },
    async closeWebSocket() {
      if (typeof ws === 'undefined' || ws.readyState === WebSocket.CLOSED) { return; }
      ws.close();
    },
    async sendEL(_, eldata) {
      const req = {
        channel: 'el',
        message: eldata
      };
      ws.send(JSON.stringify(req));
    },
    async updateNetwork({ commit }, network) {
      commit('setNetwork', network);
      commit('resetCameras');
      commit('resetCameraHolders');

      const req = {
        channel: 'network',
        message: network
      };
      ws.send(JSON.stringify(req));
    },
    async updateNIC({ commit }, nicdata) {
      commit('setNICID', nicdata.id);
      commit('resetCameras');
      commit('resetCameraHolders');

      const req = {
        channel: 'nic',
        message: nicdata
      };
      ws.send(JSON.stringify(req));
    }
  }
});
