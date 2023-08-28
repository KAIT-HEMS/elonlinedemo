<template>
  <div>
    <div class="card-body d-grid grid-template-100">
      <div class="section-single-class d-grid gap-3" v-if="section === 'single'">
        <h2 class="fs-5 me-3 text-primary">{{ text?.single?.classList?.heading }}</h2>
        <div class="d-grid gap-3">
          <div class="form-check" v-for="(item, index) of settings.singleDeviceOptions" :key="index">
            <input class="form-check-input me-4" :id="'classEntry' + index" type="checkbox" v-model.number="singleDeviceTargetsRef" :value="index">
            <label class="single-class-label form-check-label d-grid gap-4" :for="'classEntry' + index">
              <span>0x{{ item.class.toHex(4).toUpperCase() }}</span>
              <span>{{ getClassName(item.class) }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="section-battery d-grid gap-5" v-if="section === 'battery'">
        <div class="d-grid gap-3">
          <h2 class="fs-5 me-3 text-primary">{{ text?.battery?.modeField?.heading }}</h2>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionBatterySystemModeReal" v-model="batterySystemModeRef" value="real">
              <label class="form-check-label" for="optionBatterySystemModeReal">{{ text?.battery?.modeField?.modes?.real }}</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionBatterySystemModeRHE" v-model="batterySystemModeRef" value="rhe">
              <label class="form-check-label" for="optionBatterySystemModeRHE">{{ text?.battery?.modeField?.modes?.rhe }}</label>
            </div>
          </div>
        </div>
        <div class="d-grid gap-3">
          <div class="d-grid grid-template-max-2 justify-content-between">
            <h2 class="fs-5 me-3 text-primary">{{ text?.battery?.heading }}</h2>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-primary rounded-pill px-3" :title="text?.battery?.searchButton?.title" @click="searchDevices">{{ text?.battery?.searchButton?.label }}</button>
              <button type="button" class="btn btn-outline-primary rounded-pill px-3" :title="text?.battery?.clearButton?.title" @click="clearDevices">{{ text?.battery?.clearButton?.label }}</button>
            </div>
          </div>
          <div class="overflow-auto">
            <div class="d-grid gap-3">
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x027D  {{ getClassName(0x027D) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x027D)" :key="index" @click="selectBatterySystemDevice('storageBattery', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device027D" :id="`device_${device.uid}`" v-model="batterySystem.storageBattery.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0279  {{ getClassName(0x0279) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0279)" :key="index" @click="selectBatterySystemDevice('solarPower', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0279" :id="`device_${device.uid}`" v-model="batterySystem.solarPower.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0287  {{ getClassName(0x0287) }}</h3>
                <section class="grid grid-template-max-3">
                  <div v-show="isRHE">
                    <div class="input-group">
                      <div class="input-group-text">C</div>
                      <select class="form-select" v-model.number="batterySystemPointCRef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div class="input-group">
                      <div class="input-group-text">D</div>
                      <select class="form-select" v-model.number="batterySystemPointDRef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div class="input-group">
                      <div class="input-group-text">E</div>
                      <select class="form-select" v-model.number="batterySystemPointERef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                </section>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0287)" :key="index" @click="selectBatterySystemDevice('distributionBoard', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0287" :id="`device_${device.uid}`" v-model="batterySystem.distributionBoard.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0288  {{ getClassName(0x0288) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0288)" :key="index" @click="selectBatterySystemDevice('smartMeter', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0288" :id="`device_${device.uid}`" v-model="batterySystem.smartMeter.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 gap-3" :class="{'d-none': isRHE, 'd-grid': isRealDevices}">
                <h3 class="fs-6 text-primary fw-normal">0x028D  {{ getClassName(0x028D) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x028D)" :key="index" @click="selectBatterySystemDevice('subMeter', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device028D" :id="`device_${device.uid}`" v-model="batterySystem.subMeter.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0130  {{ getClassName(0x0130) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0130)" :key="index" @click="selectBatterySystemDevice('airConditioner', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0130" :id="`device_${device.uid}`" v-model="batterySystem.airConditioner.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-battery d-grid gap-5" v-if="section === 'evChargerDischarger'">
        <div class="d-grid gap-3">
          <h2 class="fs-5 me-3 text-primary">{{ text?.battery?.modeField?.heading }}</h2>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionBatterySystemModeReal" v-model="batterySystemModeRef" value="real">
              <label class="form-check-label" for="optionBatterySystemModeReal">{{ text?.battery?.modeField?.modes?.real }}</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionBatterySystemModeRHE" v-model="batterySystemModeRef" value="rhe">
              <label class="form-check-label" for="optionBatterySystemModeRHE">{{ text?.battery?.modeField?.modes?.rhe }}</label>
            </div>
          </div>
        </div>
        <div class="d-grid gap-3">
          <div class="d-grid grid-template-max-2 justify-content-between">
            <h2 class="fs-5 me-3 text-primary">{{ text?.battery?.heading }}</h2>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-primary rounded-pill px-3" :title="text?.battery?.searchButton?.title" @click="searchDevices">{{ text?.battery?.searchButton?.label }}</button>
              <button type="button" class="btn btn-outline-primary rounded-pill px-3" :title="text?.battery?.clearButton?.title" @click="clearDevices">{{ text?.battery?.clearButton?.label }}</button>
            </div>
          </div>
          <div class="overflow-auto">
            <div class="d-grid gap-3">
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x027E  {{ getClassName(0x027E) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x027D)" :key="index" @click="selectBatterySystemDevice('storageBattery', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device027D" :id="`device_${device.uid}`" v-model="batterySystem.storageBattery.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0279  {{ getClassName(0x0279) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0279)" :key="index" @click="selectBatterySystemDevice('solarPower', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0279" :id="`device_${device.uid}`" v-model="batterySystem.solarPower.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0287  {{ getClassName(0x0287) }}</h3>
                <section class="grid grid-template-max-3">
                  <div v-show="isRHE">
                    <div class="input-group">
                      <div class="input-group-text">C</div>
                      <select class="form-select" v-model.number="batterySystemPointCRef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div class="input-group">
                      <div class="input-group-text">D</div>
                      <select class="form-select" v-model.number="batterySystemPointDRef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div class="input-group">
                      <div class="input-group-text">E</div>
                      <select class="form-select" v-model.number="batterySystemPointERef">
                        <option v-for="(epc, index) of [208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240]" :key="index" :value="epc">CH{{ index + 1 }} ({{ epc.toHex(2).toUpperCase().prefix('0x') }})</option>
                      </select>
                    </div>
                  </div>
                </section>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0287)" :key="index" @click="selectBatterySystemDevice('distributionBoard', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0287" :id="`device_${device.uid}`" v-model="batterySystem.distributionBoard.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0288  {{ getClassName(0x0288) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0288)" :key="index" @click="selectBatterySystemDevice('smartMeter', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0288" :id="`device_${device.uid}`" v-model="batterySystem.smartMeter.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 gap-3" :class="{'d-none': isRHE, 'd-grid': isRealDevices}">
                <h3 class="fs-6 text-primary fw-normal">0x028D  {{ getClassName(0x028D) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x028D)" :key="index" @click="selectBatterySystemDevice('subMeter', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device028D" :id="`device_${device.uid}`" v-model="batterySystem.subMeter.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card shadow p-3 d-grid gap-3">
                <h3 class="fs-6 text-primary fw-normal">0x0130  {{ getClassName(0x0130) }}</h3>
                <table class="table table-hover small align-middle">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{{ text?.battery?.ipField }}</th>
                      <th scope="col">{{ text?.battery?.eojField }}</th>
                      <th scope="col">{{ text?.battery?.releaseField }}</th>
                      <th scope="col">{{ text?.battery?.manufacturerField }}</th>
                      <th scope="col">{{ text?.battery?.idField }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(device, index) of deviceListing.filter(device => device.eoj.class === 0x0130)" :key="index" @click="selectBatterySystemDevice('airConditioner', device)" role="button">
                      <td><input class="form-check-input" type="radio" name="device0130" :id="`device_${device.uid}`" v-model="batterySystem.airConditioner.uid" :value="device.uid"></td>
                      <td>{{ device.ip }}</td>
                      <td>{{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</td>
                      <td>{{ device.release }}</td>
                      <td>{{ device.manufacturer }}</td>
                      <td>{{ device.id ? '0x' + device.id : '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-network d-grid gap-5" v-if="section === 'network'">
        <div class="d-grid gap-3">
          <h2 class="fs-5 me-3 text-primary">{{ text?.network?.typeField?.heading }}</h2>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionLAN" v-model="networkRef" value="lan">
              <label class="form-check-label" for="optionLAN">{{ text?.network?.typeField?.types?.lan }}</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionVPN" v-model="networkRef" value="vpn">
              <label class="form-check-label" for="optionVPN">{{ text?.network?.typeField?.types?.vpn }}</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="optionCloud" v-model="networkRef" value="cloud" disabled>
              <label class="form-check-label" for="optionCloud">{{ text?.network?.typeField?.types?.cloud }}</label>
            </div>
          </div>
        </div>
        <div class="section-network-nic d-grid gap-3">
          <h2 class="fs-5 me-3 text-primary">{{ text?.network?.nicField?.heading }}</h2>
          <div class="d-grid gap-3 overflow-auto">
            <div class="form-check" v-for="nic of nicList" :key="nic.id">
              <input class="form-check-input" type="radio" :id="'nic' + nic.id" v-model.number="nicIDRef" :value="nic.id">
              <label class="form-check-label" :for="'nic' + nic.id">{{ nic.ip }} ({{ nic.name }})</label>
            </div>
          </div>
        </div>
      </div>
      <div class="section-camera d-grid gap-3" v-if="section === 'cameras'">
        <div class="section-camera-head d-grid gap-3 justify-content-start align-items-center">
          <button type="button" class="btn btn-primary rounded-pill px-3" :title="text?.cameras?.searchButton?.title" @click="searchCameras">{{ text?.cameras?.searchButton?.label }}</button>
          <div class="d-grid grid-input-group gap-2 align-items-center">
            <label for="starting-port">{{ text?.cameras?.portField }}</label>
            <div class="input-group">
              <input class="form-control" id="starting-port" aria-label="Starting port" v-model.number="fromPort">
              <span class="input-group-text">-</span>
              <input class="form-control" aria-label="Ending port" v-model.number="toPort">
            </div>
          </div>
        </div>
        <div class="overflow-auto">
          <ul class="list-group">
            <li class="camera list-group-item d-grid gap-3" v-for="(camera, index) of cameras" :key="index">
              <div class="bg-dark bg-camera" :style="`background-image: url(${camera.stream}&t=${Date.now()})`"></div>
              <div class="d-grid">
                <h3 class="fs-6 text-primary">{{ text?.cameras?.name }} #{{ index + 1 }}</h3>
                <table>
                  <colgroup>
                    <col class="w-max">
                    <col>
                  </colgroup>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.host }}</th>
                    <td>{{ camera.host }}</td>
                  </tr>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.port }}</th>
                    <td>{{ camera.port }}</td>
                  </tr>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.protocol }}</th>
                    <td>{{ camera.protocol }}</td>
                  </tr>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.pan }}</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.tilt }}</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th class="pe-3 fw-normal">{{ text?.cameras?.zoom }}</th>
                    <td></td>
                  </tr>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="section-ui d-grid gap-5" v-if="section === 'ui'">
        <div class="d-grid gap-3">
          <h2 class="fs-5 me-3 text-primary">{{ text?.ui?.localeField?.heading }}</h2>
          <div>
            <div class="form-check form-check-inline" v-for="(language, index) of languages" :key="index">
              <input class="form-check-input" type="radio" :id="`optionLocale${index}`" v-model="locale" :value="language.code">
              <label class="form-check-label" :for="`optionLocale${index}`">{{ language.name }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, customRef, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const store                  = useStore(),
          route                  = useRoute(),
          settings               = computed(() => store.state.settings),
          singleDeviceTargets    = computed(() => store.getters.singleDeviceTargets),
          singleDeviceTargetsRef = (() => {
            let list = store.getters.singleDeviceTargets;
            return customRef((track, trigger) => {
              return {
                get() {
                  track();
                  return list;
                },
                set(newValue: any) {
                  list = newValue.sort();
                  trigger();
                }
              };
            });
          })(),
          nodes                  = computed(() => store.state.nodes),
          deviceListing          = ref<any[]>([]),
          batterySystem          = computed(() => store.state.batterySystem),
          batterySystemMode      = computed(() => store.state.batterySystemMode),
          isRealDevices          = computed(() => store.state.batterySystemMode === 'real' ? true : false),
          isRHE                  = computed(() => store.state.batterySystemMode === 'rhe' ? true : false),
          batterySystemModeRef   = ref<string>(store.state.batterySystemMode),
          batterySystemPointCRef = ref<number>(store.state.batterySystemPointC),
          batterySystemPointDRef = ref<number>(store.state.batterySystemPointD),
          batterySystemPointERef = ref<number>(store.state.batterySystemPointE),
          network                = computed(() => store.state.network),
          networkRef             = ref<string>(store.state.network),
          nicID                  = computed(() => store.state.nicID),
          nicIDRef               = ref<number>(store.state.nicID),
          fromPiCam              = ref<number>(store.state.cameraSearchCriteria.fromPiCam),
          toPiCam                = ref<number>(store.state.cameraSearchCriteria.toPiCam),
          fromPort               = ref<number>(store.state.cameraSearchCriteria.fromPort),
          toPort                 = ref<number>(store.state.cameraSearchCriteria.toPort),
          languages              = ref<number>(store.state.languages),
          locale                 = ref<string>(store.state.locale);

    // Single device settings
    function isSameList(a: any[], b: any[]) {
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }

    watch(singleDeviceTargets, () => {
      if (isSameList(singleDeviceTargets.value, singleDeviceTargetsRef.value)) { return; }
      singleDeviceTargetsRef.value = singleDeviceTargets.value;
    });

    watch(singleDeviceTargetsRef, () => {
      if (isSameList(singleDeviceTargets.value, singleDeviceTargetsRef.value)) { return; }
      store.commit('setSingleDeviceTargets', singleDeviceTargetsRef.value);
    });

    function selectBatterySystemDevice(type: string, device: any) {
      store.commit('assignBatterySystemDevice', { type: type, device: device });

      const questions = store.getters.getPropertyMap(device.ip, device.eoj).filter((epc: number) => [0x82, 0x83, 0x8A].indexOf(epc) === -1);
      if (0 < questions.length) {
        let batch = [];
        for (let i = 0; i < questions.length; i += 4) {
          batch = questions.slice(i, i + 4);
          store.dispatch('sendEL', {
            ip: device.ip,
            el: {
              deoj: device.eoj,
              esv: 0x62,
              opc: {
                ops: batch.map((epc: number) => { return { epc: epc, edt: [] }; })
              }
            }
          });
        }
      }
    }

    // Battery system settings
    function searchDevices() {
      const epcList = [0x82, 0x83, 0x8A, 0xD6];
      let counter = 0;

      (function job() {
        store.dispatch('sendEL', {
          ip: 'multicast',
          el: {
            deoj: {
              class: 0x0EF0,
              id: 0x01
            },
            esv: 0x62,
            opc: {
              ops: [
                {
                  epc: epcList[counter],
                  edt: []
                }
              ]
            }
          }
        });

        ++counter;
        if (epcList.length <= counter) {
          return;
        }

        setTimeout(job, 1000);
      })();
    }

    function clearDevices() {
      deviceListing.value = [];
    }

    async function setDeviceListing() {
      if (Object.keys(nodes.value).length === 0) { return; }

      const newList = [] as any[];
      for (const ip in nodes.value) {
        for (const classCode in nodes.value[ip]) {
          // Checks if classCode is search target
          if ([0x027D, 0x0279, 0x0287, 0x0288, 0x028D, 0x0130].indexOf(Number(classCode)) === -1) { continue; }

          // Pushes into newList
          for (const id in nodes.value[ip][classCode]) {
            const eojClass = Number(classCode),
                  eojId = Number(id),
                  eojHex = Number(classCode).toHex(4).toUpperCase() + Number(id).toHex(2).toUpperCase(),
                  name = typeof nodes.value[ip][classCode][id].release !== 'undefined' ? store.getters.className(classCode, nodes.value[ip][classCode][id].release) : store.getters.className(classCode, 'Ā'),
                  label = typeof nodes.value[ip][classCode][id].label !== 'undefined' ? nodes.value[ip][classCode][id].label : name;

            newList.push({
              ip: ip,
              eoj: {
                class: eojClass,
                id: eojId,
                hex: eojHex
              },
              name: name,
              label: label,
              release: typeof nodes.value[ip][classCode][id].release !== 'undefined' ? nodes.value[ip][classCode][id].release : '',
              manufacturer: typeof nodes.value[ip][classCode][id].manufacturer !== 'undefined' ? nodes.value[ip][classCode][id].manufacturer : '',
              id: typeof nodes.value[ip][classCode][id][0x83] !== 'undefined' ? nodes.value[ip][classCode][id][0x83].toHex().toUpperCase() : '',
              uid: ip + '_' + eojHex
            });
          }
        }
      }

      // Sorts the list by IP addresses and EOJ.
      newList.sort((a: any, b: any): number => {
        if (a.ip < b.ip) {
          return -1;
        } else if (a.ip === b.ip) {
          if (a.eoj < b.eoj) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      });

      deviceListing.value = newList;
    }

    watch(nodes, () => {
      setDeviceListing();
    });

    watch(batterySystemMode, () => {
      if (batterySystemMode.value === batterySystemModeRef.value) { return; }
      batterySystemModeRef.value = batterySystemMode.value;
    });

    watch(batterySystemModeRef, () => {
      if (batterySystemMode.value === batterySystemModeRef.value) { return; }
      store.commit('setBatterySystemMode', batterySystemModeRef.value);
      switch (batterySystemModeRef.value) {
        case 'real':
          batterySystemPointCRef.value = 0xE7;
          batterySystemPointDRef.value = 0xD8;
          batterySystemPointERef.value = 0xD9;
          break;
        case 'rhe':
          batterySystemPointCRef.value = 0xEF;
          batterySystemPointDRef.value = 0xD6;
          batterySystemPointERef.value = 0xD7;
          break;
      }
    });

    watch(batterySystemPointCRef, () => {
      store.commit('setBatterySystemPointC', batterySystemPointCRef.value);
    });

    watch(batterySystemPointDRef, () => {
      store.commit('setBatterySystemPointD', batterySystemPointDRef.value);
    });

    watch(batterySystemPointERef, () => {
      store.commit('setBatterySystemPointE', batterySystemPointERef.value);
    });

    // Network settings
    watch([network, nicID], () => {
      if (network.value !== networkRef.value) {
        networkRef.value = network.value;
      }
      if (nicID.value !== nicIDRef.value) {
        nicIDRef.value = nicID.value;
      }
    });

    watch(networkRef, () => {
      if (network.value === networkRef.value) { return; }
      store.dispatch('updateNetwork', networkRef.value);
    });

    watch(nicIDRef, () => {
      if (nicID.value === nicIDRef.value) { return; }
      store.dispatch('updateNIC', {
        network: networkRef.value,
        id: nicIDRef.value
      });
    });

    // Streaming video settings
    function getPiCamRange(): string[] {
      const hosts: string[] = [];
      for (let i = fromPiCam.value; i <= toPiCam.value; i++) {
        hosts.push(`picam${i.toString().padStart(2, '0')}.local`);
      }
      return hosts;
    }

    function getPortRange(): number[] {
      if (0 <= fromPort.value && fromPort.value <= 65535 && 0 <= toPort.value && toPort.value <= 65535) {
        if (fromPort.value < toPort.value) {
          return [...Array(toPort.value - fromPort.value + 1).keys()].map(v => v + fromPort.value);
        }
        return [fromPort.value];
      }
      return [];
    }

    function searchCameras() {
      store.commit('resetCameras');
      window.stop();
      const piCamRange = getPiCamRange();
      const portRange = getPortRange();
      piCamRange.forEach((host: string) => {
        portRange.forEach((port: number) => {
          axios.get(`http://${host}:${port}/?action=snapshot`)
          .then(res => {
            if (res.status === 200) {
              store.commit('pushCamera', {
                host: host,
                port: port,
                protocol: 'http',
                stream: `http://${host}:${port}/?action=stream`
              });
            }
          })
          .catch(err => {
            console.log(`Camera search: http://${host}:${port} doesn't have a camera`);
          });
        });
      });
    }

    watch(fromPort, () => {
      store.commit('setCameraSearchCriteria', { fromPort: fromPort.value });
    });
    watch(toPort, () => {
      store.commit('setCameraSearchCriteria', { toPort: toPort.value });
    });

    // UI settings
    watch(locale, () => {
      store.commit('setLocale', locale.value);
    });

    onMounted(() => {
      setDeviceListing();
    });

    return {
      text: computed(() => store.getters.text?.settings),
      section: computed(() => route.meta.section),
      settings,
      singleDeviceTargetsRef,
      getClassName: (classCode: number) => store.getters.className(classCode, 'Ā'),
      selectBatterySystemDevice,
      searchDevices,
      clearDevices,
      deviceListing,
      batterySystem,
      isRealDevices,
      isRHE,
      batterySystemModeRef,
      batterySystemPointCRef,
      batterySystemPointDRef,
      batterySystemPointERef,
      networkRef,
      nicIDRef,
      nicList: computed(() => store.getters.nicList),
      searchCameras,
      fromPort,
      toPort,
      cameras: computed(() => store.state.cameras),
      languages,
      locale
    };
  }
});
</script>

<style lang="scss" scoped>
.section-single-class {
  grid-template-rows: max-content minmax(0, max-content);
}
.single-class-label {
  grid-template-columns: minmax(60px, max-content) minmax(0, 1fr);
}
.section-single-propery {
  grid-template-rows: repeat(3, max-content) minmax(0, max-content);
}
.section-battery {
  grid-template-rows: max-content minmax(0, 1fr);
}
.section-network {
  grid-template-rows: max-content minmax(0, max-content) max-content;
}
.section-network-nic {
  grid-template-rows: max-content minmax(0, 1fr);
}
.section-camera {
  grid-template-rows: 40px minmax(0, 1fr);
}
.section-camera-head {
  grid-template-columns: max-content 360px 226px;
}
.camera {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.section-ui {
  grid-template-rows: max-content;
}
</style>
