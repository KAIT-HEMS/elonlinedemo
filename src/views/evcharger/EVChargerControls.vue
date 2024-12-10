<template>
  <div class="ev-charger-controls card p-3 d-grid gap-3">
    <!-- Tabs -->
    <div class="ev-charger-controls-nav-list card-list d-grid grid-template-max-2 justify-content-evenly position-relative">
      <div class="ev-charger-controls-nav-highlight position-absolute align-self-center rounded-pill" :class="{ 'ev-charger-controls-nav-control': tab === 'control', 'ev-charger-controls-nav-monitor': tab === 'monitor' }"></div>
      <div class="ev-charger-controls-nav-list-item d-grid grid-template-max-2 align-content-center gap-2 text-light" role="button" :title="text?.nav?.control?.title" @click.stop="tab = 'control'"><i class="bi bi-hand-index-thumb-fill"></i> <span>{{ text?.nav?.control?.label }}</span></div>
      <div class="ev-charger-controls-nav-list-item d-grid grid-template-max-2 align-content-center gap-2 text-light" role="button" :title="text?.nav?.monitor?.title" @click.stop="tab = 'monitor'"><i class="bi bi-speedometer"></i> <span>{{ text?.nav?.monitor?.label }}</span></div>
    </div>

    <!-- Control -->
    <div class="overflow-auto" v-show="tab === 'control'">
      <div class="d-grid align-content-start gap-3">
        <!-- EV Charger Control -->
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">EV Charger Control</h3>
          <h4 class="small">Operation Mode: 0xDA</h4>
          <div class="d-grid gap-2" v-show="isSimpleModeRef">
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerPropertiesSimpleMode('charging')">Charging</button>
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerPropertiesSimpleMode('standby')">Standby</button>
            <button class="btn btn-primary" type="button" v-show="isSimpleModeRef" @click="setEVChargerPropertiesSimpleMode('idle')">Idle</button>
          </div>
          <div v-show="!isSimpleModeRef">
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-42" type="radio" name="f-ev-charger-operation-mode" value="0x42">
              <label class="form-check-label" for="f-ev-charger-operation-mode-42">
                Charging: 0x42
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-44" type="radio" name="f-ev-charger-operation-mode" value="0x44">
              <label class="form-check-label" for="f-ev-charger-operation-mode-44">
                Standby: 0x44
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" id="f-ev-charger-operation-mode-47" type="radio" name="f-ev-charger-operation-mode" value="0x47">
              <label class="form-check-label" for="f-ev-charger-operation-mode-47">
                Idle: 0x47
              </label>
            </div>
          </div>
          <h4 class="small" v-show="!isSimpleModeRef && isChargingSetShow">Charge Amount: 0xE7</h4>
          <div class="grid gap-1 align-items-center" style="--bs-columns: 4;" v-show="!isSimpleModeRef && isChargingSetShow">
            <input class="form-control h-100" id="f-ev-charger-charge-amount">
            <label class="g-col-3" for="f-ev-charger-charge-amount">Wh (max {{ evChargerSystemData.evCharger.chargeableElectricity }} Wh)</label>
          </div>
          <div class="d-grid justify-content-evenly" v-show="!isSimpleModeRef">
            <button class="btn btn-secondary rounded-pill px-4" type="button" @click="setEVChargerProperties" v-show="!isSimpleModeRef">Set</button>
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
              <div class="small">{{ evChargerSystemData.powerPoints.a }} W (EDT: {{ evChargerSystemData.powerPoints.edt.a }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">A</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">{{ renderEVChargerProperties() }}</h3>
          <div class="d-flex flex-column">
            <div class="small">0xC7: Vehicle status</div>
            <div class="small">{{ monitorDevicesData.evCharger.chargeDischargeStatus }} (EDT: {{ evChargerSystemData.evCharger.edt.chargeDischargeStatus }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xE4: Remaining stored electricity</div>
            <div class="small">{{ evChargerSystemData.evCharger.remainingStoredElectricity }} % (EDT: {{ evChargerSystemData.evCharger.edt.remainingStoredElectricity }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xDA: Operation mode</div>
            <div class="small">{{ monitorDevicesData.evCharger.workingOperationStatus }} (EDT: {{ evChargerSystemData.evCharger.edt.workingOperationStatus }})</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">Power Distribution Board</h3>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerSystemPointB.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerSystemData.powerPoints.b }} W (EDT: {{ evChargerSystemData.powerPoints.edt.b }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">B</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerSystemPointD.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerSystemData.powerPoints.d }} W (EDT: {{ evChargerSystemData.powerPoints.edt.d }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">D</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">{{ evChargerSystemPointE.toHex(2).toUpperCase().prefix('0x') }}: Electric power</div>
              <div class="small">{{ evChargerSystemData.powerPoints.e }} W (EDT: {{ evChargerSystemData.powerPoints.edt.e }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">E</div>
          </div>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xC6: Electric power</div>
              <div class="small">{{ evChargerSystemData.powerPoints.f === 'No data' ? 'No Data' : evChargerSystemData.powerPoints.f + ' W' }} (EDT: {{ evChargerSystemData.powerPoints.edt.f }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">F</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">Smart Meter</h3>
          <div class="d-flex flex-row justify-content-sm-between">
            <div class="d-flex flex-column">
              <div class="small">0xE7: Electric power</div>
              <div class="small">{{ evChargerSystemData.powerPoints.g === 'No data' ? 'No Data' : evChargerSystemData.powerPoints.g + ' W' }} (EDT: {{ evChargerSystemData.powerPoints.edt.g }})</div>
            </div>
            <div class="flex-shrink-0 power-circle">G</div>
          </div>
        </div>
        <div class="card shadow p-3 d-grid gap-2">
          <h3 class="fs-6 text-primary fw-normal">{{ renderAirConditionerProperties() }}</h3>
          <div class="d-flex flex-column">
            <div class="small">0x80: Operation Status</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.operationStatus }} (EDT: {{ evChargerSystemData.homeAirConditioner.edt.operationStatus }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xB0: Operation Mode</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.operationModeSetting }} (EDT: {{ evChargerSystemData.homeAirConditioner.edt.operationModeSetting }})</div>
          </div>
          <div class="d-flex flex-column">
            <div class="small">0xB3: Target Temperature</div>
            <div class="small">{{ monitorDevicesData.homeAirConditioner.setTemperatureValue }} (EDT: {{ evChargerSystemData.homeAirConditioner.edt.setTemperatureValue }})</div>
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
          evChargerSystem         = computed(() => store.state.evChargerSystem),
          evChargerSystemData     = computed(() => store.state.evChargerSystemData),
          evChargerSystemPointB   = computed(() => store.state.evChargerSystemPointB),
          evChargerSystemPointD   = computed(() => store.state.evChargerSystemPointD),
          evChargerSystemPointE   = computed(() => store.state.evChargerSystemPointE),
          isRealDevices         = computed(() => store.state.evChargerSystemMode === 'real' ? true : false),
          isRHE                 = computed(() => store.state.evChargerSystemMode === 'rhe' ? true : false),
          isSimpleMode          = computed(() => store.state.evChargerSystemUIModeSimple),
          isSimpleModeRef       = ref<string>(''),
          isChargingSetShow     = ref<boolean>(false),
          monitorDevicesData    = reactive<any>({
            evCharger: {
              workingOperationStatus: "",
              chargeDischargeStatus: "",
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
      if (evChargerSystem.value.airConditioner.ip === '') { return; }

      // operation status: 0x80
      const status = (document.querySelector('input[name="f-air-conditioner-operation-status"]:checked') as HTMLInputElement)?.value;
      if (!status) { return; }

      // operation mode: 0xB0
      const mode = (document.querySelector('input[name="f-air-conditioner-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      // Set property
      store.dispatch('sendEL', {
        ip: evChargerSystem.value.airConditioner.ip,
        el: {
          deoj: evChargerSystem.value.airConditioner.eoj,
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
          ip: evChargerSystem.value.airConditioner.ip,
          el: {
            deoj: evChargerSystem.value.airConditioner.eoj,
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
    Set ev charger properties
    */
    function setEVChargerProperties() {
      if (evChargerSystem.value.evCharger.ip === '') { return; }

      const epcList: number[] = [],
            edtList = [];

      // Operation Mode: 0xDA
      const mode = (document.querySelector('input[name="f-ev-charger-operation-mode"]:checked') as HTMLInputElement)?.value;
      if (!mode) { return; }

      const chargeAmountField = document.getElementById('f-ev-charger-charge-amount') as HTMLInputElement;
      let chargeAmount = 0;

      // Reset errors
      chargeAmountField.classList.remove('is-invalid');

      switch (mode) {
        // Charging
        case '0x42':
          if (Number.isNaN(chargeAmountField.value)) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          chargeAmount = parseInt(chargeAmountField.value);
          if (chargeAmount < 0 || evChargerSystemData.value.evCharger.chargeableElectricity < chargeAmount) {
            chargeAmountField.classList.add('is-invalid');
            return;
          }

          if(isChargingSetShow.value && chargeAmountField.value !== '') {
            epcList.push(0xE7);
            edtList.push(chargeAmount.toHex(8).toUint8Array());
          }

          epcList.push(0xEB);
          edtList.push([0x00, 0x00, 0x07, 0xD0]);

          epcList.push(0xDA);
          edtList.push([0x42]);
          break;
        // Standby
        case '0x44':
          epcList.push(0xDA);
          edtList.push([0x44]);
          break;
        // Idle
        case '0x47':
          epcList.push(0xDA);
          edtList.push([0x47]);
          break;
      }

      for (let i = 0; i < epcList.length; i++) {
        // Set property
        store.dispatch('sendEL', {
          ip: evChargerSystem.value.evCharger.ip,
          el: {
            deoj: evChargerSystem.value.evCharger.eoj,
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
          ip: evChargerSystem.value.evCharger.ip,
          el: {
            deoj: evChargerSystem.value.evCharger.eoj,
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
    Set ev charger properties during the SimpleMode
    */
    function setEVChargerPropertiesSimpleMode(mode: string) {
      switch (mode) {
        case 'charging':
          document.getElementById('f-ev-charger-operation-mode-42')!.click();
          (document.getElementById('f-ev-charger-charge-amount') as HTMLInputElement).value = '100';
          break;
        case 'standby':
          document.getElementById('f-ev-charger-operation-mode-44')!.click();
          break;
        case 'idle':
          document.getElementById('f-ev-charger-operation-mode-47')!.click();
          break;
      }

      setEVChargerProperties();
    }

    /*
    Render air conditioner properties
    */
    function renderAirConditionerProperties() {
      // operation status: 0x80
      if (evChargerSystemData.value.homeAirConditioner.operationStatus === 0x30) {
        monitorDevicesData.homeAirConditioner.operationStatus = 'ON';
      } else if (evChargerSystemData.value.homeAirConditioner.operationStatus === 0x31) {
        monitorDevicesData.homeAirConditioner.operationStatus = 'OFF';
      } else {
        monitorDevicesData.homeAirConditioner.operationStatus = "No Data";
      }

      // operation mode: 0xB0
      switch(evChargerSystemData.value.homeAirConditioner.operationModeSetting) {
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
      if (evChargerSystemData.value.homeAirConditioner.setTemperatureValue) {
        monitorDevicesData.homeAirConditioner.setTemperatureValue = (evChargerSystemData.value.homeAirConditioner.setTemperatureValue === 253) ? "Undefined" : evChargerSystemData.value.homeAirConditioner.setTemperatureValue + "℃";
      } else {
        monitorDevicesData.homeAirConditioner.setTemperatureValue = "No Data";
      }

      return "Air Conditioner";
    }

    /*
    Render ev charger properties
    */
    function renderEVChargerProperties() {
      // working operation status: 0xDA
      monitorDevicesData.evCharger.workingOperationStatus = (() => {
        let propertyDescription = store.getters.propertyDescription(0x0000, 0xDA, evChargerSystem.value.evCharger.release);
        propertyDescription = store.getters.propertyDescription(evChargerSystem.value.evCharger.eoj.class, 0xDA, evChargerSystem.value.evCharger.release) || propertyDescription;
        if (propertyDescription === null) { return 'No Data'; }

        if (evChargerSystemData.value.evCharger.edt.workingOperationStatus === '') { return 'No Data'; }

        // Decode EDT
        const propertyValue = store.getters.decodedData(0xDA, evChargerSystemData.value.evCharger.edt.workingOperationStatus.toUint8Array(), propertyDescription);

        return propertyValue === null ? 'No Data' : propertyValue;
      })();

      // charge/discharge status: 0xC7
      monitorDevicesData.evCharger.chargeDischargeStatus = (() => {
        let propertyDescription = store.getters.propertyDescription(0x0000, 0xC7, evChargerSystem.value.evCharger.release);
        propertyDescription = store.getters.propertyDescription(evChargerSystem.value.evCharger.eoj.class, 0xC7, evChargerSystem.value.evCharger.release) || propertyDescription;
        if (propertyDescription === null) { return 'No Data'; }

        if (evChargerSystemData.value.evCharger.edt.chargeDischargeStatus === '') { return 'No Data'; }

        // Decode EDT
        const propertyValue = store.getters.decodedData(0xC7, evChargerSystemData.value.evCharger.edt.chargeDischargeStatus.toUint8Array(), propertyDescription);

        return propertyValue === null ? 'No Data' : propertyValue;
      })();

      return "EV Charger";
    }

    watch(isSimpleMode, () => {
      if (isSimpleModeRef.value === isSimpleMode.value) { return; }
      isSimpleModeRef.value = isSimpleMode.value;
    });

    return {
      text: computed(() => store.getters.text?.evCharger?.controls),
      tab,
      airConditionerTargetTemperature,
      setEVChargerProperties,
      setEVChargerPropertiesSimpleMode,
      setAirConditionerProperties,
      setAirConditionerPropertiesSimpleMode,
      renderAirConditionerProperties,
      renderEVChargerProperties,
      monitorDevicesData,
      evChargerSystem,
      evChargerSystemData,
      evChargerSystemPointB,
      evChargerSystemPointD,
      evChargerSystemPointE,
      isSimpleModeRef,
      isRealDevices,
      isRHE,
      isChargingSetShow: computed(() => store.getters.data(evChargerSystem.value.evCharger.ip, evChargerSystem.value.evCharger.eoj, 0x9E).indexOf(231) !== -1),
    };
  }
});
</script>

<style lang="scss" scoped>
.ev-charger-controls {
  width:              308px;
  flex:               0 0 auto;
  grid-template-rows: 55px minmax(0, 1fr);
}
.ev-charger-controls-nav-highlight {
  background-color: rgba(255, 255, 255, 0.2);
  width:            130px;
  height:           35px;
  pointer-events:   none;
  transition:       left .25s ease-out;

  &.ev-charger-controls-nav-control {
    left: 14px;
  }
  &.ev-charger-controls-nav-monitor {
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
