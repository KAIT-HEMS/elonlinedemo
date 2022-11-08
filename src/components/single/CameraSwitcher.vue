<template>
  <div class="camera-switcher card shadow d-grid">
    <div class="bg-secondary bg-camera d-grid justify-content-center align-content-center" ref="cameraView">
      <router-link class="link-dark" :to="{ name: 'settings.cameras' }" v-show="cameraError">
        <i class="bi-camera-video-off-fill display-3 p-5"></i>
      </router-link>
      <i class="bi-arrow-repeat position-absolute bottom-0 start-0 display-6 p-3 text-white" role="button" @click="reloadCamera"></i>
    </div>
    <div class="card-body d-grid justify-items-center align-content-center gap-4 form-check">
      <div :title="text?.cameraSwitcher?.cam1?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption0" v-model.number="cameraOption" value="0"><label class="form-check-label" for="cameraOption0">{{ text?.cameraSwitcher?.cam1?.label }}</label></div>
      <div :title="text?.cameraSwitcher?.cam2?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption1" v-model.number="cameraOption" value="1"><label class="form-check-label" for="cameraOption1">{{ text?.cameraSwitcher?.cam2?.label }}</label></div>
      <div :title="text?.cameraSwitcher?.cam3?.title"><input class="form-check-input" type="radio" name="cameraOption" id="cameraOption2" v-model.number="cameraOption" value="2"><label class="form-check-label" for="cameraOption2">{{ text?.cameraSwitcher?.cam3?.label }}</label></div>
      <div :title="text?.cameraSwitcher?.pan?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="panDown"><i class="bi-caret-left-fill align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.pan?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="panUp"><i class="bi-caret-right-fill align-text-bottom"></i></button></div>
      <div :title="text?.cameraSwitcher?.tilt?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="tiltUp"><i class="bi-caret-up-fill align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.tilt?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="tiltDown"><i class="bi-caret-down-fill align-text-bottom"></i></button></div>
      <div :title="text?.cameraSwitcher?.zoom?.title"><button class="btn border-0 p-0 me-1 fs-4 text-primary" type="button" @click="zoomUp"><i class="bi-zoom-in align-text-bottom"></i></button><span>{{ text?.cameraSwitcher?.zoom?.label }}</span><button class="btn border-0 p-0 ms-1 fs-4 text-primary" type="button" @click="zoomDown"><i class="bi-zoom-out align-text-bottom"></i></button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const store        = useStore(),
          route        = useRoute(),
          routeName    = computed(() => route.name),
          cameraError  = ref<boolean>(true),
          cameraView   = ref<HTMLElement|null>(null),
          cameraOption = ref<number>(0),
          cameras      = [
            { pan: 0, tilt: 0, zoom: 100 },
            { pan: 0, tilt: 0, zoom: 100 },
            { pan: 0, tilt: 0, zoom: 100 }
          ],
          pan          = {
            command: '10094856',
            MIN:     -36e3,
            MAX:     36e3,
            reset:   function () { cameras[cameraOption.value].pan = 0; },
            up:      function () {
              cameras[cameraOption.value].pan += 3600;
              if (this.MAX < cameras[cameraOption.value].pan) { cameras[cameraOption.value].pan = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].pan -= 3600;
              if (cameras[cameraOption.value].pan < this.MIN) { cameras[cameraOption.value].pan = this.MIN; }
            }
          },
          tilt         = {
            command: '10094857',
            MIN:     -36e3,
            MAX:     36e3,
            reset:   function () { cameras[cameraOption.value].tilt = 0; },
            up:      function () {
              cameras[cameraOption.value].tilt += 3600;
              if (this.MAX < cameras[cameraOption.value].tilt) { cameras[cameraOption.value].tilt = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].tilt -= 3600;
              if (cameras[cameraOption.value].tilt < this.MIN) { cameras[cameraOption.value].tilt = this.MIN; }
            }
          },
          zoom         = {
            command: '10094861',
            MIN:     100,
            MAX:     500,
            reset:   function () { cameras[cameraOption.value].zoom = 100; },
            up:      function () {
              cameras[cameraOption.value].zoom += 10;
              if (this.MAX < cameras[cameraOption.value].zoom) { cameras[cameraOption.value].zoom = this.MAX; }
            },
            down:    function () {
              cameras[cameraOption.value].zoom -= 10;
              if (cameras[cameraOption.value].zoom < this.MIN) { cameras[cameraOption.value].zoom = this.MIN; }
            }
          };

    function switchCamera(id: number, isReload?: boolean) {
      const source = store.state.cameras[store.state.cameraHolders['single' + id]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=snapshot&t=${Date.now()}`)
        .then(() => {
          if (isReload) {
            window.stop();
          }
          cameraError.value = false;
          cameraView.value!.classList.add('bg-dark');
          cameraView.value!.classList.remove('bg-secondary');
          cameraView.value!.style.backgroundImage = `url(${origin}/?action=stream&t=${Date.now()})`;
        });
    }

    function reloadCamera() {
      if (store.state.cameras.length === 0) { return; }
      cameraView.value!.style.backgroundImage = '';
      cameraView.value!.classList.add('bg-secondary');
      cameraView.value!.classList.remove('bg-dark');
      cameraError.value = true;
      switchCamera(cameraOption.value, true);
    }

    function panCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094856&value=${cameras[cameraOption.value].pan}`).catch(err => !err);
    }

    function tiltCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094857&value=${cameras[cameraOption.value].tilt}`).catch(err => !err);
    }

    function zoomCamera() {
      if (cameraError.value) { return; }

      const source = store.state.cameras[store.state.cameraHolders['single' + cameraOption.value]],
            origin = `${source.protocol}://${source.host}:${source.port}`;

      axios.get(`${origin}/?action=command&group=1&id=10094861&value=${cameras[cameraOption.value].zoom}`).catch(err => !err);
    }

    watch(cameraOption, value => {
      if (store.state.cameras.length === 0) { return; }
      cameraView.value!.style.backgroundImage = '';
      cameraView.value!.classList.add('bg-secondary');
      cameraView.value!.classList.remove('bg-dark');
      cameraError.value = true;
      switchCamera(value, true);
    });

    watch(routeName, value => {
      if (value !== 'single' || store.state.cameras.length === 0) { return; }
      reloadCamera();
    });

    onMounted(() => {
      if (store.state.cameras.length === 0) { return; }
      switchCamera(cameraOption.value);
    });

    return {
      text: computed(() => store.getters.text?.single?.controller),
      cameraView,
      cameraError,
      cameraOption,
      reloadCamera,
      panUp: () => { pan.up(); panCamera(); },
      panDown: () => { pan.down(); panCamera(); },
      tiltUp: () => { tilt.up(); tiltCamera(); },
      tiltDown: () => { tilt.down(); tiltCamera(); },
      zoomUp: () => { zoom.up(); zoomCamera(); },
      zoomDown: () => { zoom.down(); zoomCamera(); }
    };
  }
});
</script>

<style lang="scss" scoped>
.camera-switcher {
  grid-template-columns: minmax(0, 1fr) 180px;
}
</style>
