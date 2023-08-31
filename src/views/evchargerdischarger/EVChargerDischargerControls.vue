<template>
  <div class="battery-controls card p-3 d-grid gap-3">
    <!-- Tabs -->
    <div class="battery-controls-nav-list card-list d-grid grid-template-max-2 justify-content-evenly position-relative">
      <div class="battery-controls-nav-highlight position-absolute align-self-center rounded-pill" :class="{ 'battery-controls-nav-control': tab === 'control', 'battery-controls-nav-monitor': tab === 'monitor' }"></div>
      <div class="battery-controls-nav-list-item d-grid grid-template-max-2 align-content-center gap-2 text-light" role="button" :title="text?.nav?.control?.title" @click.stop="tab = 'control'"><i class="bi bi-hand-index-thumb-fill"></i> <span>{{ text?.nav?.control?.label }}</span></div>
      <div class="battery-controls-nav-list-item d-grid grid-template-max-2 align-content-center gap-2 text-light" role="button" :title="text?.nav?.monitor?.title" @click.stop="tab = 'monitor'"><i class="bi bi-speedometer"></i> <span>{{ text?.nav?.monitor?.label }}</span></div>
    </div>

    <!-- Control -->
    <div class="overflow-auto" v-show="tab === 'control'">
      <div class="d-grid align-content-start gap-3">
        <!-- EV Charger Discharger Control -->
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">EV Charger Discharger Control</h3>
          <h4 class="small">Operation Mode: 0xDA</h4>
          <div class="d-grid gap-2" v-show="isSimpleModeRef">
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerDischargerPropertiesSimpleMode('charging')">Charging</button>
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerDischargerPropertiesSimpleMode('discharging')">Discharging</button>
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerDischargerPropertiesSimpleMode('standby')">Standby</button>
          </div>
          <div v-show="!isSimpleModeRef">
            <div class="form-check">
              <input class="form-check-input" id="f-storage-battery-operation-mode-42" type="radio" name="f-storage-battery-operation-mode" value="0x42">
              <label class="form-check-label" for="f-storage-battery-operation-mode-42">
                Charging: 0x42
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-storage-battery-operation-mode-43" type="radio" name="f-storage-battery-operation-mode" value="0x43">
              <label class="form-check-label" for="f-storage-battery-operation-mode-43">
                Discharging: 0x43
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-storage-battery-operation-mode-44" type="radio" name="f-storage-battery-operation-mode" value="0x44">
              <label class="form-check-label" for="f-storage-battery-operation-mode-44">
                Standby: 0x44
              </label>
            </div>
          </div>
          <h4 class="small" v-show="!isSimpleModeRef">Charge Amount: 0xAA</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;" v-show="!isSimpleModeRef">
            <input class="form-control h-100" id="f-storage-battery-charge-amount">
            <label class="g-col-3" for="f-storage-battery-charge-amount">Wh (max {{ evChargerDischargerSystemData.storageBattery.chargeableElectricity }} Wh)</label>
          </div>
          <h4 class="small" v-show="!isSimpleModeRef">Discharge Amount: 0xAB</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;" v-show="!isSimpleModeRef">
            <input class="form-control h-100" id="f-storage-battery-discharge-amount">
            <label class="g-col-3" for="f-storage-battery-discharge-amount">Wh (max {{ evChargerDischargerSystemData.storageBattery.dischargeableElectricity }} Wh)</label>
          </div>
          <div class="d-grid justify-content-evenly" v-show="!isSimpleModeRef">
            <button class="btn btn-secondary rounded-pill px-4" type="button" @click="setEVChargerDischargerProperties" v-show="!isSimpleModeRef">Set</button>
          </div>
        </div>
        <!-- Air Conditioner Control -->
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">Air Conditioner Control</h3>
          <h4 class="small">Operation Status: 0x80</h4>
          <div class="d-grid gap-2" v-show="isSimpleModeRef">
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setAirConditionerPropertiesSimpleMode('on')">ON</button>
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setAirConditionerPropertiesSimpleMode('off')">OFF</button>
          </div>
          <div class="d-flex" v-show="!isSimpleModeRef">
            <div class="form-check" v-show="!isSimpleModeRef">
              <input class="form-check-input" id="f-air-conditioner-operation-status-30" type="radio" name="f-air-conditioner-operation-status" value=0x30>
              <label class="form-check-label" for="f-air-conditioner-operation-status-30">
                ON: 0x30
              </label>
            </div>
            <div class="form-check ms-2" v-show="!isSimpleModeRef">
              <input class="form-check-input" id="f-air-conditioner-operation-status-31" type="radio" name="f-air-conditioner-operation-status" value=0x31>
              <label class="form-check-label" for="f-air-conditioner-operation-status-31">
                OFF: 0x31
              </label>
            </div>
          </div>
          <h4 class="small" v-show="!isSimpleModeRef">Operation Mode: 0xB0</h4>
          <div v-show="!isSimpleModeRef">
            <div class="form-check">
              <input class="form-check-input" id="f-air-conditioner-operation-mode-42" type="radio" name="f-air-conditioner-operation-mode" value=0x42>
              <label class="form-check-label" for="f-air-conditioner-operation-mode-42">
                Cooling: 0x42
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-air-conditioner-operation-mode-43" type="radio" name="f-air-conditioner-operation-mode" value=0x43>
              <label class="form-check-label" for="f-air-conditioner-operation-mode-43">
                Heating: 0x43
              </label>
            </div>
          </div>
          <h4 class="small" v-show="!isSimpleModeRef">Target Temperature: 0xB3</h4>
          <div class="d-flex" v-show="!isSimpleModeRef">
            <input type="range" min="0" max="50" v-model="airConditionerTargetTemperature" class="custom-range w-75" id="f-air-conditioner-target-temperature" v-show="!isSimpleModeRef">
            <span class="font-weight-bold ms-2" v-show="!isSimpleModeRef"> {{ airConditionerTargetTemperature }}</span>
          </div>
          <div class="d-grid justify-content-evenly" v-show="!isSimpleModeRef">
            <button class="btn btn-secondary rounded-pill px-4" type="button" @click="setAirConditionerProperties" v-show="!isSimpleModeRef">Set</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Monitor -->
    <div class="overflow-auto" v-show="tab === 'monitor'">
      <div class="d-grid align-content-start gap-3">
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">PV Power Generation</h3>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xE0: Generated electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.a }} W (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.a }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">A</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">{{ renderEVChargerDischargerProperties() }}</h3>
          <div class="d-flex flex-column">
            <div class="small">0xA4: Chargeable electric energy</div>
            <div class="small">{{ evChargerDischargerSystemData.storageBattery.chargeableElectricity }} Wh (EDT: {{ evChargerDischargerSystemData.storageBattery.edt.chargeableElectricity }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xA5: Dischargeable electric energy</div>
            <div class="small">{{ evChargerDischargerSystemData.storageBattery.dischargeableElectricity }} Wh (EDT: {{ evChargerDischargerSystemData.storageBattery.edt.dischargeableElectricity }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xE4: Remaining Stored electricity</div>
            <div class="small">{{ evChargerDischargerSystemData.storageBattery.remainingStoredElectricity }} % (EDT: {{ evChargerDischargerSystemData.storageBattery.edt.remainingStoredElectricity }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xCF: Operation Status</div>
            <div class="small">{{ monitorDevicesData.storageBattery.workingOperationStatus }} (EDT: {{ evChargerDischargerSystemData.storageBattery.edt.workingOperationStatus }})</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xD3: Charge(+)/Discharge(-) electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.b }} W (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.b }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">B</div>
          </div>
        </div>
        <div class="card shadow p-3 gap-2" :class="{'d-none': isRHE, 'd-grid': isRealDevices}">
          <h3 class="fs-6 text-primary fw-normal">Sub Meter</h3>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xE7: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.c === 'No data' ? 'No Data' : evChargerDischargerSystemData.powerPoints.c + ' W' }} (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.c }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">C</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">Power Distribution Board</h3>
          <div class="flex-row justify-content-sm-between" :class="{'d-none': isRealDevices, 'd-flex': isRHE}">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerDischargerSystemPointC.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.c }} W (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.c }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">C</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerDischargerSystemPointD.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.d }} W (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.d }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">D</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerDischargerSystemPointE.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.e }} W (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.e }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">E</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xC6: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.f === 'No data' ? 'No Data' : evChargerDischargerSystemData.powerPoints.f + ' W' }} (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.f }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">F</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">Smart Meter</h3>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xE7: Electric power</div>
              <div class="small">{{ evChargerDischargerSystemData.powerPoints.g === 'No data' ? 'No Data' : evChargerDischargerSystemData.powerPoints.g + ' W' }} (EDT: {{ evChargerDischargerSystemData.powerPoints.edt.g }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">G</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">{{ renderAirConditionerProperties() }}</h3>
          <div class="d-flex flex-column">
            <div class="small">0x80: Operation Status</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.operationStatus }} (EDT: {{ evChargerDischargerSystemData.homeAirConditioner.edt.operationStatus }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xB0: Operation Mode</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.operationModeSetting }} (EDT: {{ evChargerDischargerSystemData.homeAirConditioner.edt.operationModeSetting }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xB3: Target Temperature</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.setTemperatureValue }} (EDT: {{ evChargerDischargerSystemData.homeAirConditioner.edt.setTemperatureValue }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store                 = useStore(),
          tab                   = ref<string>('control'),
          evChargerDischargerSystem         = computed(() => store.state.evChargerDischargerSystem),
          evChargerDischargerSystemData     = computed(() => store.state.evChargerDischargerSystemData),
          evChargerDischargerSystemPointC   = computed(() => store.state.evChargerDischargerSystemPointC),
          evChargerDischargerSystemPointD   = computed(() => store.state.evChargerDischargerSystemPointD),
          evChargerDischargerSystemPointE   = computed(() => store.state.evChargerDischargerSystemPointE),
          isRealDevices         = computed(() => store.state.evChargerDischargerSystemMode === 'real' ? true : false),
          isRHE                 = computed(() => store.state.evChargerDischargerSystemMode === 'rhe' ? true : false),
          isSimpleMode          = computed(() => store.state.evChargerDischargerSystemUIModeSimple),
          isSimpleModeRef       = ref<string>(''),
          monitorDevicesData    = reactive<any>({
            evChargerDischarger: {
              workingOperationStatus: "",
            },
            homeAirConditioner: {
              operationStatus: "",
              operationModeSetting: "",
              setTemperatureValue: ""
            }
          }),
          airConditionerTargetTemperature = ref<number>(25);

    /*
    Set air conditioner properties
    */
    function setAirConditionerProperties() {
      if (evChargerDischargerSystem.value.airConditioner.ip === '') { return; }

      // operation status: 0x80
      const status = (document.querySelector('input[name="f-air-conditioner-operation-status"]:checked') as HTMLInputElement)?.value;
      if (!status) { return; }

      // operation mode: 0xB0
      const mode = (document.querySelector('input[name="f-air-conditioner-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      // Set property
      store.dispatch('sendEL', {
        ip: evChargerDischargerSystem.value.airConditioner.ip,
        el: {
          deoj: evChargerDischargerSystem.value.airConditioner.eoj,
          esv: 0x61,
          opc: {
            ops: [
              {
                epc: 0x80,
                edt: [parseInt(status)]
              },
              {
                epc: 0xB0,
                edt: [parseInt(mode)]
              },
              {
                epc: 0xB3,
                edt: [airConditionerTargetTemperature.value]
              }
            ]
          }
        }
      });

      // Get property
      setTimeout(() => {
        store.dispatch('sendEL', {
          ip: evChargerDischargerSystem.value.airConditioner.ip,
          el: {
            deoj: evChargerDischargerSystem.value.airConditioner.eoj,
            esv: 0x62,
            opc: {
              ops: [
                {
                  epc: 0x80,
                  edt: []
                },
                {
                  epc: 0xB0,
                  edt: []
                },
                {
                  epc: 0xB3,
                  edt: []
                }
              ]
            }
          }
        });
      }, 1000);
    }

    /*
    Set air conditioner properties during the SimpleMode
    */
    function setAirConditionerPropertiesSimpleMode(mode: string) {
      switch (mode) {
        case 'on':
          document.getElementById('f-air-conditioner-operation-status-30')!.click();
          break;
        case 'off':
          document.getElementById('f-air-conditioner-operation-status-31')!.click();
          break;
      }

      setAirConditionerProperties();
    }

    /*
    Set ev charger discharger properties
    */
    function setEVChargerDischargerProperties() {
      if (evChargerDischargerSystem.value.storageBattery.ip === '') { return; }

      const epcList: number[] = [],
            edtList = [];

      // Operation Mode: 0xDA
      const mode = (document.querySelector('input[name="f-storage-battery-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      switch (mode) {
        // Charging
        case '0x42':
          const chargeAmountField = document.getElementById('f-storage-battery-charge-amount') as HTMLInputElement;
          chargeAmountField.classList.remove('is-invalid');
          if (chargeAmountField.value === '' || Number.isNaN(chargeAmountField.value)) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }
          const chargeAmount = parseInt(chargeAmountField.value);
          if (chargeAmount < 0 || evChargerDischargerSystemData.value.storageBattery.chargeableElectricity < chargeAmount) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }
          epcList.push(0xAA);
          edtList.push(chargeAmount.toHex(8).toUint8Array());

          epcList.push(0xDA);
          edtList.push([0x42]);
          break;
        // Discharging
        case '0x43':
          const dischargeAmountField = document.getElementById('f-storage-battery-discharge-amount') as HTMLInputElement;
          dischargeAmountField.classList.remove('is-invalid');
          if (dischargeAmountField.value === '' || Number.isNaN(dischargeAmountField.value)) {
            dischargeAmountField.classList.add('is-invalid');
            return;
          }
          const dischargeAmount = parseInt(dischargeAmountField.value);
          if (dischargeAmount < 0 || evChargerDischargerSystemData.value.storageBattery.chargeableElectricity < dischargeAmount) {
            dischargeAmountField.classList.add('is-invalid');
            return;
          }
          epcList.push(0xAB);
          edtList.push(dischargeAmount.toHex(8).toUint8Array());

          epcList.push(0xDA);
          edtList.push([0x43]);
          break;
        // Standby
        case '0x44':
          epcList.push(0xDA);
          edtList.push([0x44]);
          break;
      }

      for (let i = 0; i < epcList.length; i++) {
        // Set property
        store.dispatch('sendEL', {
          ip: evChargerDischargerSystem.value.storageBattery.ip,
          el: {
            deoj: evChargerDischargerSystem.value.storageBattery.eoj,
            esv: 0x61,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: edtList[i]
                }
              ]
            }
          }
        });

        // Get property
        setTimeout(() => {
          store.dispatch('sendEL', {
          ip: evChargerDischargerSystem.value.storageBattery.ip,
          el: {
            deoj: evChargerDischargerSystem.value.storageBattery.eoj,
            esv: 0x62,
            opc: {
              ops: [
                {
                  epc: epcList[i],
                  edt: []
                }
              ]
            }
          }
        });
        }, 1000);
      }
    }

    /*
    Set ev charger discharger properties during the SimpleMode
    */
    function setEVChargerDischargerPropertiesSimpleMode(mode: string) {
      switch (mode) {
        case 'charging':
          document.getElementById('f-storage-battery-operation-mode-42')!.click();
          (document.getElementById('f-storage-battery-charge-amount') as HTMLInputElement).value = '100';
          break;
        case 'discharging':
          document.getElementById('f-storage-battery-operation-mode-43')!.click();
          (document.getElementById('f-storage-battery-discharge-amount') as HTMLInputElement).value = '100';
          break;
        case 'standby':
          document.getElementById('f-storage-battery-operation-mode-44')!.click();
          break;
      }

      setEVChargerDischargerProperties();
    }

    /*
    Render air conditioner properties
    */
    function renderAirConditionerProperties() {
      // operation status: 0x80
      if (evChargerDischargerSystemData.value.homeAirConditioner.operationStatus === 0x30) {
        monitorDevicesData.homeAirConditioner.operationStatus = 'ON';
      } else if (evChargerDischargerSystemData.value.homeAirConditioner.operationStatus === 0x31) {
        monitorDevicesData.homeAirConditioner.operationStatus = 'OFF';
      } else {
        monitorDevicesData.homeAirConditioner.operationStatus = "No Data";
      }

      // operation mode: 0xB0
      switch(evChargerDischargerSystemData.value.homeAirConditioner.operationModeSetting) {
        case 0x41:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Automatic";
          break;
        case 0x42:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Cooling";
          break;
        case 0x43:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Heating";
          break;
        case 0x44:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Dehumidification";
          break;
        case 0x45:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Air circulation";
          break;
        case 0x40:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "Other";
          break;
        default:
          monitorDevicesData.homeAirConditioner.operationModeSetting = "No Data";
      }

      // target temperature: 0xB3
      if (evChargerDischargerSystemData.value.homeAirConditioner.setTemperatureValue) {
        monitorDevicesData.homeAirConditioner.setTemperatureValue = (evChargerDischargerSystemData.value.homeAirConditioner.setTemperatureValue === 253) ? "Undefined" : evChargerDischargerSystemData.value.homeAirConditioner.setTemperatureValue + "℃";
      } else {
        monitorDevicesData.homeAirConditioner.setTemperatureValue = "No Data";
      }

      return "Air Conditioner";
    }

    /*
    Render ev charger discharger properties
    */
    function renderEVChargerDischargerProperties() {
      // working operation status: 0xCF
      switch(evChargerDischargerSystemData.value.storageBattery.workingOperationStatus) {
        case 0x41:
          monitorDevicesData.storageBattery.workingOperationStatus = "rapidCharging";
          break;
        case 0x42:
          monitorDevicesData.storageBattery.workingOperationStatus = "charging";
          break;
        case 0x43:
          monitorDevicesData.storageBattery.workingOperationStatus = "discharging";
          break;
        case 0x44:
          monitorDevicesData.storageBattery.workingOperationStatus = "standby";
          break;
        case 0x45:
          monitorDevicesData.storageBattery.workingOperationStatus = "test";
          break;
        case 0x40:
          monitorDevicesData.storageBattery.workingOperationStatus = "Other";
          break;
        default:
          monitorDevicesData.storageBattery.workingOperationStatus = "No Data"
      }

      return "Storage Battery";
    }

    watch(isSimpleMode, () => {
      if (isSimpleModeRef.value === isSimpleMode.value) { return; }
      isSimpleModeRef.value = isSimpleMode.value;
    });

    return {
      text: computed(() => store.getters.text?.evChargerDischarger?.controls),
      tab,
      airConditionerTargetTemperature,
      setEVChargerDischargerProperties,
      setEVChargerDischargerPropertiesSimpleMode,
      setAirConditionerProperties,
      setAirConditionerPropertiesSimpleMode,
      renderAirConditionerProperties,
      renderEVChargerDischargerProperties,
      monitorDevicesData,
      evChargerDischargerSystem,
      evChargerDischargerSystemData,
      evChargerDischargerSystemPointC,
      evChargerDischargerSystemPointD,
      evChargerDischargerSystemPointE,
      isSimpleModeRef,
      isRealDevices,
      isRHE
    };
  }
});
</script>

<style lang="scss" scoped>
.battery-controls {
  width:              308px;
  flex:               0 0 auto;
  grid-template-rows: 55px minmax(0, 1fr);
}
.battery-controls-nav-highlight {
  background-color: rgba(255, 255, 255, 0.2);
  width:            130px;
  height:           35px;
  pointer-events:   none;
  transition:       left .25s ease-out;

  &.battery-controls-nav-control {
    left: 14px;
  }
  &.battery-controls-nav-monitor {
    left: 132px;
  }
}
.power-circle {
  text-align: center;
  color: #FFFFFF;
  width: 30px;
  height: 30px;
  background: linear-gradient(90deg, #569DF2 0%, #3472F0 100%);
  border-radius: 50%;
  font-size: 16px;
  line-height: 30px;
}
.form-control {
  width: 80px;
}
</style>
