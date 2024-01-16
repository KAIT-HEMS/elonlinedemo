<template>
  <div class="logger card py-1 px-3 d-grid gap-2" :class="{ 'd-none': !showLog }">
    <button class="logger-close btn border-0 p-0 position-absolute" type="button" @click="closeLog"><i class="bi-x-lg"></i></button>
    <div class="logger-logbook font-monospaced d-grid align-content-start overflow-auto" ref="logbook">
      <div class="logger-logbook-head bg-white position-sticky top-0 d-grid">
        <span>HH MM SS</span>
        <span>T/R</span>
        <span>IP</span>
        <span>DATA</span>
      </div>
      <div class="logger-logbook-entry d-grid" v-for="(record, index) of log" :key="index">
        <span>{{ dateTimeFormat.format(new Date(record.time)) }}</span>
        <span>{{ record.dir }}</span>
        <span>{{ record.ip }}</span>
        <span>{{ record.hex }}</span>
      </div>
    </div>
    <div class="logger-controls border-start ps-3 grid gap-2 align-self-center">
      <div class="logger-controls-sub grid gap-2">
        <button class="btn btn-secondary rounded-pill" type="button" :title="text?.controls?.clear?.title" @click="clear"><i class="bi-trash"></i></button>
        <button class="btn btn-secondary rounded-pill" type="button" :title="text?.controls?.save?.title" @click="save"><i class="bi-download"></i></button>
        <a ref="dlLink" v-show="0"></a>
      </div>
      <button class="btn btn-primary rounded-pill p-0" type="button" :title="text?.controls?.pause?.title" v-show="!isPaused" @click="isPaused = true;"><i class="bi-pause fs-4"></i></button>
      <button class="btn btn-primary rounded-pill p-0" type="button" :title="text?.controls?.resume?.title" v-show="isPaused" @click="isPaused = false;"><i class="bi-play-fill fs-4"></i></button>
      <button class="btn btn-primary rounded-pill" type="button" :title="text?.controls?.normal?.title" @click="sort">↓ {{ text?.controls?.normal?.label }}</button>
      <button class="btn btn-primary rounded-pill" type="button" :title="text?.controls?.reverse?.title" @click="sort({ reverse: true })">↑ {{ text?.controls?.reverse?.label }}</button>
    </div>
  </div>
  <button class="logger-open btn border-0 p-0 position-absolute" type="button" :class="{ 'd-none': showLog }" @click="openLog"><img src="/assets/img/btn-logger.svg" alt=""></button>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onUpdated } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    filterLog: String
  },
  setup(props) {
    const store          = useStore(),
          logbook        = ref<HTMLElement|null>(null),
          dlLink         = ref<HTMLElement|null>(null),
          reverse        = ref<boolean>(false),
          isPaused       = ref<boolean>(false),
          activeDevice   = computed(() => store.state.device),
          batterySystem  = computed(() => store.state.batterySystem),
          evChargerDischargerSystem  = computed(() => store.state.evChargerDischargerSystem),
          // @ts-ignore
          dateTimeFormat = new Intl.DateTimeFormat([], {timeStyle: 'medium', hour12: false});

    onUpdated(() => {
      // Auto-scrolls on log update.
      if (reverse.value) {
        logbook.value?.scrollTo(logbook.value?.scrollLeft, 0);
      } else {
        logbook.value?.scrollTo(logbook.value?.scrollLeft, logbook.value?.scrollHeight);
      }
    });

    /**
     * Filtered log.
     */
    const log = computed((): Log[] => {
      let rawLog: Log[],
          filteredLog: Log[];

      if (isPaused.value) {
        rawLog = store.state.snapshotLog;
      } else {
        rawLog = store.state.log;
      }

      if (props.filterLog === 'battery') {
        filteredLog = rawLog.filter((msg: { ip: any; }) => {
          for (let key in batterySystem.value) {
            if (batterySystem.value[key].ip === '') { continue; }
            if (msg.ip === batterySystem.value[key].ip) {
              return true;
            }
          }
          return false;
        });
      } else if (props.filterLog === 'evchargerdischarger') {
        filteredLog = rawLog.filter((msg: { ip: any; }) => {
          for (let key in evChargerDischargerSystem.value) {
            if (evChargerDischargerSystem.value[key].ip === '') { continue; }
            if (msg.ip === evChargerDischargerSystem.value[key].ip) {
              return true;
            }
          }
          return false;
        });
      } else if (props.filterLog === 'single') {
        filteredLog = rawLog.filter((msg: { ip: any; }) => msg.ip === activeDevice.value.ip);
      } else {
        filteredLog = rawLog.filter(() => true);
      }
      return reverse.value ? filteredLog.slice().reverse() : filteredLog;
    });

    /**
     * Clears the log.
     */
    function clear() {
      store.commit('resetLog');
    }

    /**
     * Downloads the log.
     */
    function save() {
      let output = '';
      log.value.forEach((record: { time: number; dir: string; ip: string; hex: string; }) => {
        output += `${dateTimeFormat.format(new Date(record.time))},${record.dir},${record.ip},${record.hex}\n`;
      });
      dlLink.value?.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
      dlLink.value?.setAttribute('download', `log_${Date.now()}.csv`);
      dlLink.value?.click();
    }

    /**
     * Toggles the sorting order.
     */
    function sort(options?: { reverse: boolean }) {
      if (options && options.reverse) {
        reverse.value = true;
      } else {
        reverse.value = false;
      }
    }

    /**
     * Snapshots log
     */
    watch(isPaused, isPaused => {
      if (isPaused) {
        store.commit('setSnapshotLog');
      } else {
        store.commit('resetSnapshotLog');
      }
    });

    return {
      text: computed(() => store.getters.text?.logger),
      showLog: computed(() => store.state.showLog),
      closeLog: () => { store.commit('setShowLog', false); },
      openLog: () => { store.commit('setShowLog', true); },
      logbook,
      dlLink,
      log,
      dateTimeFormat,
      clear,
      save,
      isPaused,
      sort,
      activeDevice,
      batterySystem,
      evChargerDischargerSystem
    };
  }
});
</script>

<style lang="scss" scoped>
.logger {
  height:                240px;
  grid-template-columns: minmax(0, 1fr) max-content;
}
.logger-close {
  top:   .25rem;
  right: 1rem;
}
.logger-logbook {
  font-size:   var(--size-text-m);
  font-weight: var(--weight-medium);
}
.logger-logbook-head,
.logger-logbook-entry {
  grid-template-columns: 90px 40px 160px max-content;
}
.logger-controls {
  --bs-columns: 1;
  --bs-rows:    4;
}
.logger-controls-sub {
  --bs-columns: 2;
  --bs-rows:    1;
}
.logger-open {
  bottom:     -17px;
  left:       .5rem;
  transition: bottom .25s ease-out;

  &:hover {
    bottom: 0;
  }
}
</style>
