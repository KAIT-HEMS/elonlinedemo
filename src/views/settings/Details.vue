<template>
  <div class="settings-details">
    <!-- cameras -->
    <div class="settings-details-body card-body d-grid gap-3 align-items-start" v-if="section === 'cameras'">
      <h2 class="fs-5 me-3 text-primary">{{ text?.cameras?.assignFields }}</h2>
      <div class="camera-placeholder-list mh-100 overflow-auto grid">
        <div>
          <h3 class="fs-6 text-primary">{{ text?.cameras?.placeholders?.singleHeading }}</h3>
          <form class="grid gap-1">
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder0">{{ text?.cameras?.placeholders?.single0 }}</label>
              <select class="form-select" id="placeholder0" v-model.number="single0">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder1">{{ text?.cameras?.placeholders?.single1 }}</label>
              <select class="form-select" id="placeholder1" v-model.number="single1">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder2">{{ text?.cameras?.placeholders?.single2 }}</label>
              <select class="form-select" id="placeholder2" v-model.number="single2">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
          </form>
        </div>
        <div>
          <h3 class="fs-6 text-primary">{{ text?.cameras?.placeholders?.batteryHeading }}</h3>
          <form class="grid gap-1">
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder3">{{ text?.cameras?.placeholders?.battery0 }}</label>
              <select class="form-select" id="placeholder3" v-model.number="battery0">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder4">{{ text?.cameras?.placeholders?.battery1 }}</label>
              <select class="form-select" id="placeholder4" v-model.number="battery1">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder5">{{ text?.cameras?.placeholders?.battery2 }}</label>
              <select class="form-select" id="placeholder5" v-model.number="battery2">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
            <div class="grid align-items-center" style="--bs-columns: 2;">
              <label class="col-form-label" for="placeholder6">{{ text?.cameras?.placeholders?.battery3 }}</label>
              <select class="form-select" id="placeholder6" v-model.number="battery3">
                <option v-for="(camera, index) of cameras" :key="index" :value="index">{{ text?.cameras?.name }} #{{ index + 1 }}</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, warn } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore(),
          route = useRoute(),
          single0 = ref<number>(store.state.cameraHolders.single0),
          single1 = ref<number>(store.state.cameraHolders.single1),
          single2 = ref<number>(store.state.cameraHolders.single2),
          battery0 = ref<number>(store.state.cameraHolders.battery0),
          battery1 = ref<number>(store.state.cameraHolders.battery1),
          battery2 = ref<number>(store.state.cameraHolders.battery2),
          battery3 = ref<number>(store.state.cameraHolders.battery3);

    watch(single0, () => {
      store.commit('assignCamera', { holder: 'single0', camera: single0.value });
    });
    watch(single1, () => {
      store.commit('assignCamera', { holder: 'single1', camera: single1.value });
    });
    watch(single2, () => {
      store.commit('assignCamera', { holder: 'single2', camera: single2.value });
    });
    watch(battery0, () => {
      store.commit('assignCamera', { holder: 'battery0', camera: battery0.value });
    });
    watch(battery1, () => {
      store.commit('assignCamera', { holder: 'battery1', camera: battery1.value });
    });
    watch(battery2, () => {
      store.commit('assignCamera', { holder: 'battery2', camera: battery2.value });
    });
    watch(battery3, () => {
      store.commit('assignCamera', { holder: 'battery3', camera: battery3.value });
    });

    return {
      text: computed(() => store.getters.text?.settings),
      section: computed(() => route.meta.section),
      cameras: computed(() => store.state.cameras),
      single0,
      single1,
      single2,
      battery0,
      battery1,
      battery2,
      battery3
    };
  }
});
</script>

<style lang="scss" scoped>
.settings-details {
  width: 400px;
}
.settings-details-body {
  grid-template-rows: min-content minmax(0, 1fr) min-content;
}
</style>
