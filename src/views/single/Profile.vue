<template>
  <div class="profile">
    <div class="card-body d-grid grid-template-100 gap-3 align-content-start">
      <div class="grid gap-0 grid-template-100">
        <div class="profile-content d-grid align-content-start gap-3">
          <div class="card shadow">
            <div class="card-body">
              <h3 class="fs-5"> {{ deviceNameMap[ip + classCode] }} </h3>
              <h3 class="fs-6">{{ label }}</h3>
              <div><span class="me-3">IP: {{ ip }}</span><span>EOJ: {{ eoj }}</span></div>
              <div>{{ name }}</div>
              <div><span class="me-3">Rel. {{ release }}</span><span>{{ manufacturer }}</span></div>
              <div>{{ id }}</div>
            </div>
          </div>
          <div class="card shadow">
            <div class="card-body text-center"><embed class="profile-content-icon" :src="deviceImagePath(classCode)"></div>
          </div>
          <div class="card shadow d-grid grid-template-100">
            <div class="card-body d-grid align-content-start">
              <h3 class="d-flex justify-content-between fs-6 text-primary">
                {{ text?.dataHeading }}
                <button type="button" class="btn btn-secondary btn-sm" :title="text?.getButton?.title" @click="getEDTAll">{{ text?.getButton?.label }}</button>
              </h3>
              <div class="overflow-auto">
                <table class="table">
                  <thead class="position-sticky">
                    <tr>
                      <th scope="col">{{ text?.dataFields?.epc }} / {{ text?.dataFields?.name }}</th>
                      <th scope="col">{{ text?.dataFields?.edt }} / {{ text?.dataFields?.value }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(property, index) of propertyList" :key="index">
                      <td>{{ property.epc }}<br><small>{{ property.name }}</small></td>
                      <td>{{ property.edt }}<br><small>{{ property.value }}</small></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store        = useStore(),
          nodes        = computed(() => store.state.nodes),
          epcList      = computed(() => device.value.ip ? store.getters.setPropertyMap(device.value.ip, device.value.eoj) : []),
          epcList2     = computed(() => device.value.ip ? store.getters.getPropertyMap(device.value.ip, device.value.eoj) : []),
          device       = computed(() => store.state.device),
          locale       = computed(() => store.state.locale),
          release      = computed(() => device.value.ip ? nodes.value[device.value.ip][device.value.eoj.class][device.value.eoj.id].release : ''),
          manufacturer = computed(() => device.value.ip ? nodes.value[device.value.ip][device.value.eoj.class][device.value.eoj.id].manufacturer : ''),
          id           = computed(() => device.value.ip ? nodes.value[device.value.ip][device.value.eoj.class][device.value.eoj.id][0x83]?.toHex().toUpperCase().prefix('0x') : ''),
          propertyList = ref<any[]>([]);

    function hexToInt(hex: string) {
      if (hex.length % 2 != 0) {
          hex = "0" + hex;
      }
      var num = parseInt(hex, 16);
      var maxVal = Math.pow(2, hex.length / 2 * 8);
      if (num > maxVal / 2 - 1) {
          num = num - maxVal
      }
      return num;
    }

    async function updateProperties() {
      if (Object.keys(nodes.value).length === 0 || device.value.ip === '') { return; }

      const newList = [] as any[];
      store.getters.getPropertyMap(device.value.ip, device.value.eoj).forEach((epc: number) => {
        let propertyDescription = store.getters.propertyDescription(0x0000, epc, release.value);
        propertyDescription = store.getters.propertyDescription(device.value.eoj.class, epc, release.value) || propertyDescription;
        if (propertyDescription === null) { return; }

        const edt = store.getters.data(device.value.ip, device.value.eoj, epc);
        if (edt.length === 0) { return; }

        // Decode EDT
        const propertyValue = store.getters.decodedData(epc, edt, propertyDescription);

        newList.push({
          epc: epc.toHex(2).toUpperCase().prefix('0x'),
          name: propertyDescription.propertyName[locale.value],
          edt: (() => { let hex = ''; edt.forEach((v: number) => { hex += v.toHex(2).toUpperCase(); }); return hex.prefix('0x'); })(),
          value: propertyValue === null ? '' : propertyValue
        });
      });

      // Sort
      newList.sort((a, b) => parseInt(a.epc, 16) - parseInt(b.epc, 16));

      propertyList.value = newList;
    }

    // Returns device image path based on EOJ class code
    function deviceImagePath(classCode: number) {
      let deviceName = 'other';
      switch (classCode) {
        case 0x0130:
          deviceName = 'ac';
          break;
        case 0x026F:
          deviceName = 'lock';
          break;
        case 0x0279:
          deviceName = 'solar';
          break;
        case 0x027D:
          deviceName = 'battery';
          break;
        case 0x027E:
          deviceName = 'evchargerdischarger';
          break;
        case 0x0287:
          deviceName = 'distribution';
          break;
        case 0x0288:
          deviceName = 'smartmeter';
          break;
        case 0x028D:
          deviceName = 'submeter';
          break;
        case 0x0290:
          deviceName = 'lighting';
          break;
      }
      return `/assets/img/avatar-${deviceName}.svg`;
    }

    watch([nodes, device, locale], () => {
      updateProperties();
      getEDTAll();
    });

    // Update button
    function getEDTAll() {
      if (device.value.ip === '') { return; }

      const questions = store.getters.getPropertyMap(device.value.ip, device.value.eoj).filter((epc: number) => [0x82, 0x83, 0x8A].indexOf(epc) === -1);
      if (0 < questions.length) {
        let batch = [];
        for (let i = 0; i < questions.length; i += 4) {
          batch = questions.slice(i, i + 4);
          store.dispatch('sendEL', {
            ip: device.value.ip,
            el: {
              deoj: device.value.eoj,
              esv: 0x62,
              opc: {
                ops: batch.map((epc: number) => { return { epc: epc, edt: [] }; })
              }
            }
          });
        }
      }
    }

    onMounted(() => {
      updateProperties();
    });

    return {
      text: computed(() => store.getters.text?.single?.controller),
      ip: computed(() => device.value.ip),
      classCode: computed(() => device.value.ip ? device.value.eoj.class : 0),
      eoj: computed(() => device.value.ip ? device.value.eoj.class.toHex(4).toUpperCase().prefix('0x') + device.value.eoj.id.toHex(2).toUpperCase() : ''),
      label: computed(() => device.value.ip ? device.value.label : ''),
      name: computed(() => device.value.ip ? device.value.name : ''),
      release,
      manufacturer,
      id,
      deviceNameMap: computed(() =>store.state.deviceNameMap),
      propertyList,
      deviceImagePath,
      getEDTAll
    };
  }
});
</script>

<style lang="scss" scoped>
.profile {
  width: 400px;
}
.profile-content {
  grid-template-rows: repeat(2, min-content) minmax(0, 1fr);
}
.profile-content-icon {
  max-height: 100px;
}
</style>
