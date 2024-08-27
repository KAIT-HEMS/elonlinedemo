declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Number {
  toHex: (len: any) => string;
  toSignedInt: (format: string) => number | string;
}

interface Array<T> {
  toHex: () => string;
}

interface String {
  toUint8Array: () => number[] | null;
  prefix: (prefix: string) => string;
}

interface Text {
  [locale: string]: any
}

interface NIC {
  id: number,
  ip: string,
  name: string,
  network: string
}

interface PropertyDescription {
  epc: number,
  validRelease: {
    from: string,
    to: string
  },
  propertyName: {
    [locale: string]: string
  },
  shortName: string,
  accessRule: {
    get: string,
    set: string,
    inf: string
  },
  descriptions: any,
  atomic: string,
  data: any,
  remark: {
    [locale: string]: string
  },
  note: {
    [locale: string]: string
  }
}

interface DeviceDescription {
  eoj: number,
  validRelease: {
    from: string,
    to: string
  },
  className: {
    [locale: string]: string
  },
  shortName: string,
  elProperties: PropertyDescription[]
}

interface ManufacturerList {
  [classCode: string]: {
    [langCode: string]: string
  }
}

interface Log {
  time: number,
  dir: string,
  ip: string,
  hex: string
}

interface NodesCache {
  [ip: string]: {
    [eojClass: string]: {
      [eojId: string]: {
        [info: string]: any
      }
    }
  }
}

interface SingleSettings {
  class: number,
  checked: boolean
}

interface BatterySystem {
  [name: string]: any
}

interface EVChargerDischargerSystem {
  [name: string]: any
}

interface EVChargerSystem {
  [name: string]: any
}

interface CameraSearchCriteria {
  [name: string]: string | number
}

interface Camera {
  host: string,
  port: number,
  protocol: string,
  stream: string
}

interface CameraHolders {
  [name: string]: number
}

interface Help {
  [locale: string]: string
}

interface HelpMenuItem {
  hash: string,
  label: string
}

interface HelpMenu {
  [locale: string]: HelpMenuItem[]
}
