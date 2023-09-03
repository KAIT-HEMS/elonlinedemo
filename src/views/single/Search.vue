<template>
  <div>
    <div class="single-search card-body d-grid gap-3">
      <div class="d-flex justify-content-between">
        <h2 class="fs-5 me-3 text-primary">{{ text?.heading }}</h2>
        <div class="d-flex gap-2">
          <button type="button" class="single-search-btn btn btn-primary rounded-pill px-3" :title="text?.controls?.search?.title" @click="search">{{ text?.controls?.search?.label }}</button>
          <button type="button" class="single-search-btn btn btn-outline-primary rounded-pill px-3" :title="text?.controls?.clear?.title" @click="clear">{{ text?.controls?.clear?.label }}</button>
        </div>
      </div>
      <div class="single-search-listing p-3 d-grid gap-3 align-content-start overflow-auto">
        <div class="single-search-device card shadow" role="button" v-for="(device, index) of listing" :key="index" @click.stop="select(device)" :class="{ 'bg-primary text-white': (device.ip === activeDevice.ip && device.eoj.class === activeDevice.eoj.class && device.eoj.id === activeDevice.eoj.id), active: (device.ip === selectedDevice.ip && device.eoj.class === selectedDevice.eoj.class && device.eoj.id === selectedDevice.eoj.id) }">
          <div class="card-body">
            <h3 class="fs-6" contenteditable @input="updateDeviceName" :ip="device.ip" :classCode="device.eoj.class">{{ device.name }}</h3>
            <div class="single-search-device-info"><small class="me-3">IP: {{ device.ip }}</small><small>EOJ: {{ device.eoj.hex ? '0x' + device.eoj.hex : '' }}</small></div>
            <div class="text-center pe-none"><embed :src="deviceImagePath(device.eoj.class)"></div>
            <div class="single-search-device-info"><small>{{ device.label }}</small></div>
            <div class="single-search-device-info"><small class="me-3">Rel. {{ device.release }}</small><small>{{ device.manufacturer }}</small></div>
            <div class="single-search-device-info"><small>{{ device.id ? '0x' + device.id : '' }}</small></div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="single-search-btn btn btn-success rounded-pill px-3" :title="text?.controls?.done?.title" @click="done">{{ text?.controls?.done?.label }}</button>
        <button type="button" class="single-search-btn btn btn-danger rounded-pill px-3" :title="text?.controls?.cancel?.title" @click="cancel">{{ text?.controls?.cancel?.label }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store          = useStore(),
          router         = useRouter(),
          nodes          = computed(() => store.state.nodes),
          listing        = ref<any[]>([]),
          deviceNameMap  = computed(() => store.state.deviceNameMap),
          deviceCountMap = ref<any>({}),
          activeDevice   = computed(() => store.state.device),
          selectedDevice = ref<any>({
            ip: '',
            eoj: {
              class: 0x0000,
              id: 0x00
            }
          });

    function search() {
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
        }
      });
    }

    function clear() {
      selectedDevice.value = {
        ip: '',
        eoj: {
          class: 0x0000,
          id: 0x00
        }
      };
      listing.value = [];
    }

    function select(device: any) {
      selectedDevice.value = {
        ip: device.ip,
        eoj: {
          class: device.eoj.class,
          id: device.eoj.id
        },
        label: device.label
      };
    }

    async function done() {
      if (selectedDevice.value.ip === '') {
        router.push({ name: 'single' });
        return;
      }

      store.commit('setSingleDevice', selectedDevice.value);
      router.push({ name: 'single' });

      const questions = store.getters.getPropertyMap(selectedDevice.value.ip, selectedDevice.value.eoj).filter((epc: number) => [0x82, 0x83, 0x8A].indexOf(epc) === -1);
      if (0 < questions.length) {
        let batch = [];
        for (let i = 0; i < questions.length; i += 4) {
          batch = questions.slice(i, i + 4);
          store.dispatch('sendEL', {
            ip: selectedDevice.value.ip,
            el: {
              deoj: selectedDevice.value.eoj,
              esv: 0x62,
              opc: {
                ops: batch.map((epc: number) => { return { epc: epc, edt: [] }; })
              },
              opcSet: {
                ops: []
              },
              opcGet: {
                ops: []
              }
            }
          });
        }
      }

      selectedDevice.value = {
        ip: '',
        eoj: {
          class: 0x0000,
          id: 0x00
        }
      };
    }

    function cancel() {
      selectedDevice.value = {
        ip: '',
        eoj: {
          class: 0x0000,
          id: 0x00
        }
      };
      router.push({ name: 'single' });
    }

    async function setListing() {
      if (Object.keys(nodes.value).length === 0) { return; }

      const newList = [] as any[];
      for (const ip in nodes.value) {
        for (const classCode in nodes.value[ip]) {
          // Checks if classCode is search target
          if (!store.getters.isCheckedClass(classCode)) { continue; }

          // Pushes into newList
          for (const id in nodes.value[ip][classCode]) {
            let name  = typeof nodes.value[ip][classCode][id].release !== 'undefined' ? store.getters.className(classCode, nodes.value[ip][classCode][id].release) : store.getters.className(classCode, 'Ā'),
                label = typeof nodes.value[ip][classCode][id].label !== 'undefined' ? nodes.value[ip][classCode][id].label : name;

            if (ip + classCode in deviceNameMap.value) {
              name = deviceNameMap.value[ip + classCode];
            } else {
              if (classCode in deviceCountMap.value) {
                deviceCountMap.value[classCode] += 1;
              } else {
                deviceCountMap.value[classCode] = 1;
              }
              name += (' ' + deviceCountMap.value[classCode]);
              deviceNameMap.value[ip + classCode] = name;
            }

            newList.push({
              ip: ip,
              eoj: {
                class: Number(classCode),
                id: Number(id),
                hex: Number(classCode).toHex(4).toUpperCase() + Number(id).toHex(2).toUpperCase()
              },
              label: label,
              name: name,
              release: typeof nodes.value[ip][classCode][id].release !== 'undefined' ? nodes.value[ip][classCode][id].release : '',
              manufacturer: typeof nodes.value[ip][classCode][id].manufacturer !== 'undefined' ? nodes.value[ip][classCode][id].manufacturer : '',
              id: typeof nodes.value[ip][classCode][id][0x83] !== 'undefined' ? nodes.value[ip][classCode][id][0x83].toHex().toUpperCase() : ''
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

      listing.value = newList;
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

    watch(nodes, () => {
      setListing();
    });

    onMounted(() => {
      setListing();
    });

    function updateDeviceName(event: any) {
      const ip = event.target.getAttribute('ip'), classCode = event.target.getAttribute('classCode');
      deviceNameMap.value[ip + classCode] = event.target.innerText;
    }

    return {
      text: computed(() => store.getters.text?.single?.search),
      listing,
      updateDeviceName,
      search,
      clear,
      activeDevice,
      selectedDevice,
      select,
      done,
      cancel,
      deviceImagePath
    };
  }
});
</script>

<style lang="scss" scoped>
.single-search {
  grid-template-rows: 40px minmax(0, 1fr) 40px;
}
.single-search-btn {
  width: 92px;
}
.single-search-listing {
  grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
  grid-auto-rows:        max-content;
}
.single-search-device {
  &:hover {
    box-shadow: 0 0 0 .25rem #828a9180 !important;
  }
  &.active {
    box-shadow: 0 0 0 .25rem #3184fd80 !important;
  }
}
.single-search-device-info {
  font-size: .85em;
}
</style>
