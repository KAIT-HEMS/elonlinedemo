<template>
  <div class="home">
    <div class="home-body card-body d-grid justify-content-center align-content-center">
      <router-link :to="{ name: 'single' }" custom v-slot="{ navigate }">
        <div class="home-nav-item-single home-nav-item card shadow-lg d-grid align-content-end" :title="text?.nav?.single?.title" @click="navigate">
          <div class="home-nav-item-label text-white d-grid grid-template-max-2 justify-content-between align-content-center">
            <span>{{ text?.nav?.single?.label }}</span>
            <span>→</span>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'battery' }" custom v-slot="{ navigate }">
        <div class="home-nav-item-battery home-nav-item card shadow-lg d-grid align-content-end" :title="text?.nav?.battery?.title" @click="navigate">
          <div class="home-nav-item-label text-white d-grid grid-template-max-2 justify-content-between align-content-center">
            <span>{{ text?.nav?.battery?.label }}</span>
            <span>→</span>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'evChargerDischarger' }" custom v-slot="{ navigate }">
        <div class="home-nav-item-evchargerdischarger home-nav-item card shadow-lg d-grid align-content-end" :title="text?.nav?.evChargerDischarger?.title" @click="navigate">
          <div class="home-nav-item-label text-white d-grid grid-template-max-2 justify-content-between align-content-center">
            <span>{{ text?.nav?.evChargerDischarger?.label }}</span>
            <span>→</span>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'evCharger' }" custom v-slot="{ navigate }">
        <div class="home-nav-item-evcharger home-nav-item card shadow-lg d-grid align-content-end" :title="text?.nav?.evCharger?.title" @click="navigate">
          <div class="home-nav-item-label text-white d-grid grid-template-max-2 justify-content-between align-content-center">
            <span>{{ text?.nav?.evCharger?.label }}</span>
            <span>→</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      text: computed(() => store.getters.text?.home)
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  background-color: #e5faff;
  background-image: url('/assets/img/home-bg.png');
  background-size:  cover;
}
.home-body {
  gap:                   80px;
  grid-template-rows:    456px;
  grid-template-columns: repeat(4, 360px);
}
.home-nav-item {
  grid-template-rows: 90px;
  cursor:             pointer;
}
.home-nav-item-label {
  padding:     0 var(--size-gutter-xxl);
  font-size:   var(--size-text-xxl);
  font-weight: var(--weight-heavy);
}
.home-nav-item-single {
  background-image:    url('/assets/img/home-single.svg');
  background-repeat:   no-repeat;
  background-position: center 112px;

  &:hover {
    box-shadow: 0 0 0 .25rem #eb483e80 !important;
  }
  > .home-nav-item-label {
    background-image: linear-gradient(90deg, var(--color-gradient-single-start) 0%, var(--color-gradient-single-end) 100%);
  }
}
.home-nav-item-battery {
  background-image:    url('/assets/img/home-battery.svg');
  background-repeat:   no-repeat;
  background-position: center 92px;

  &:hover {
    box-shadow: 0 0 0 .25rem #11be8080 !important;
  }
  > .home-nav-item-label {
    background-image: linear-gradient(90deg, var(--color-gradient-battery-start) 0%, var(--color-gradient-battery-end) 100%);
  }
}
.home-nav-item-evchargerdischarger {
  background-image:    url('/assets/img/home-evchargerdischarger.svg');
  background-repeat:   no-repeat;
  background-position: center 34%;
  background-size: 80%;

  &:hover {
    box-shadow: 0 0 0 .25rem #915EFD80 !important;
  }
  > .home-nav-item-label {
    background-image: linear-gradient(90deg, var(--color-gradient-evchargerdischarger-start) 0%, var(--color-gradient-evchargerdischarger-end) 100%);
  }
}
.home-nav-item-evcharger {
  background-image:    url('/assets/img/home-evcharger.svg');
  background-repeat:   no-repeat;
  background-position: center 34%;
  background-size: 80%;

  &:hover {
    box-shadow: 0 0 0 .25rem #915EFD80 !important;
  }
  > .home-nav-item-label {
    background-image: linear-gradient(90deg, var(--color-gradient-evcharger-start) 0%, var(--color-gradient-evcharger-end) 100%);
  }
}
</style>
