<template>
  <div class="setc-form card shadow p-1 d-grid justify-content-evenly align-items-center">
    <div class="d-grid grid-input-group gap-2 align-items-center" :title="text?.epc?.title">
      <label for="epcField">{{ text?.epc?.label }}</label><select class="form-select" id="epcField" v-model="epc"><option v-for="(epcItem, index) of epcList" :key="index">0x{{ epcItem ? epcItem.toHex(2).toUpperCase() : '' }}</option></select>
    </div>
    <div class="d-grid grid-input-group gap-2 align-items-center" :title="text?.edt?.title">
      <label for="edtField">{{ text?.edt?.label }}</label><input class="form-control" id="edtField" ref="edtField" v-model.trim="edt" autocomplete="off">
    </div>
    <button type="button" class="btn btn-secondary rounded-pill px-3" :title="text?.set?.title" @click="setC" :disabled="isEmpty">{{ text?.set?.label }}</button>
    <button type="button" class="btn border-0 p-0" data-bs-toggle="modal" data-bs-target="#infoModal"><i class="bi-info-circle"></i></button>
    <small class="align-self-start">{{ epcName }}</small>
    <small class="align-self-start">{{ edtDescription }}</small>
  </div>

  <!-- infoModal -->
  <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="infoModalLabel">{{ epcName }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"><pre>{{ epcDetails }}</pre></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore(),
          nodes = computed(() => store.state.nodes),
          device = computed(() => store.state.device),
          locale = computed(() => store.state.locale),
          release = computed(() => device.value.ip ? nodes.value[device.value.ip][device.value.eoj.class][device.value.eoj.id].release : ''),
          epcList = computed(() => device.value.ip ? store.getters.setPropertyMap(device.value.ip, device.value.eoj) : []),
          epc = ref<string>(''),
          epcName = ref<string>(''),
          epcDetails = ref<string>(''),
          edtField = ref<HTMLInputElement | null>(null),
          edt = ref<string>(''),
          edtDescription = ref<string>(''),
          isEmpty = ref<boolean>(true);

    function setC() {
      if (!/^((0x)?[0-9a-f]{2},? ?)+$/i.test(edt.value)) {
        edtField.value!.classList.add('is-invalid');
        return;
      }

      const epcInt = parseInt(epc.value, 16);

      // SetC
      store.dispatch('sendEL', {
        ip: device.value.ip,
        el: {
          deoj: device.value.eoj,
          esv: 0x61,
          opc: {
            ops: [
              {
                epc: epcInt,
                edt: edt.value.toUint8Array()
              }
            ]
          }
        }
      });

      // Get
      setTimeout(() => {
        store.dispatch('sendEL', {
        ip: device.value.ip,
        el: {
          deoj: device.value.eoj,
          esv: 0x62,
          opc: {
            ops: [
              {
                epc: epcInt,
                edt: []
              }
            ]
          }
        }
      });
      }, 1000);
    }

    function updateEPCInfo() {
      edtDescription.value = '';
      if (epc.value === '') { return; }

      let propertyDescription = store.getters.propertyDescription(0x0000, parseInt(epc.value, 16), release.value);
      propertyDescription = store.getters.propertyDescription(device.value.eoj.class, parseInt(epc.value, 16), release.value) || propertyDescription;

      epcName.value = propertyDescription.propertyName[store.state.locale];

      epcDetails.value = `EPC: ${epc.value}\n` +
                         `Rel: ${propertyDescription.validRelease.from}-${propertyDescription.validRelease.to}\n` +
                         `Rule: [GET: ${propertyDescription.accessRule.get}, SET: ${propertyDescription.accessRule.set}, INF: ${propertyDescription.accessRule.inf}]\n` +
                         `Type: ${propertyDescription.data.type}\n` +
                         `Range: ${JSON.stringify(propertyDescription.data, null, 2)}\n` +
                         (propertyDescription.note ? `Note: ${propertyDescription.note[store.state.locale]}` : '');
    }

    watch(device, () => {
      epcName.value = '';
      epcDetails.value = '';
      edt.value = '';
      edtDescription.value = '';
      if (epcList.value.length === 0) { return; }
      epc.value = epcList.value[0].toHex(2).toUpperCase().prefix('0x');
      updateEPCInfo();
    });

    watch(epcList, (newEpcList, oldEpcList) => {
      if (oldEpcList.length === newEpcList.length) { return; }
      epc.value = epcList.value[0].toHex(2).toUpperCase().prefix('0x');
      updateEPCInfo();
    });

    watch(epc, () => {
      updateEPCInfo();
    });

    watch(edt, () => {
      edtField.value!.classList.remove('is-invalid');

      if (edt.value === '') {
        isEmpty.value = true;
        return;
      } else {
        isEmpty.value = false;
      }

      // Find an EDT description
      edtDescription.value = (() => {
        let propertyDescription = store.getters.propertyDescription(0x0000, parseInt(epc.value, 16), release.value);
        propertyDescription = store.getters.propertyDescription(device.value.eoj.class, parseInt(epc.value, 16), release.value) || propertyDescription;
        if (propertyDescription === null) { return ''; }

        if (edt.value === '') { return ''; }

        // Decode EDT
        const propertyValue = store.getters.decodedData(parseInt(epc.value, 16), edt.value.toUint8Array(), propertyDescription);

        return propertyValue === null ? '' : propertyValue;
      })();
    });

    return {
      text: computed(() => store.getters.text?.single?.controller),
      device,
      epcList,
      epc,
      epcName,
      epcDetails,
      edtField,
      edt,
      edtDescription,
      setC,
      isEmpty,
    };
  }
});
</script>

<style lang="scss" scoped>
.setc-form {
  grid-template-columns: 137px 220px 92px 16px;
}
</style>
