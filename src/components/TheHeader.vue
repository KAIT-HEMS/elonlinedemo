<template>
  <div class="header grid gap-1">
    <div class="header-main card justify-content-around px-3">
      <div class="grid grid-template-max-2 justify-content-between align-items-center">
        <div class="grid gap-3 grid-template-max-2">
          <div><img class="h-100" src="/assets/img/logo-echonet.svg" alt=""></div>
          <div class="text-primary">
            <div class="header-main-title">{{ text?.main?.title }}</div>
            <div class="header-main-tagline">{{ text?.main?.tagline }}</div>
          </div>
        </div>
        <div class="header-main-block-info text-start">
          <div>{{ text?.main?.ip }} : {{ myip }}</div>
          <div>{{ text?.main?.seoj }} : {{ myeoj }}</div>
        </div>
      </div>
    </div>
    <div class="header-nav-list card-list d-grid position-relative" :class="{ 'nav-single': isSingle, 'nav-battery': isBattery, 'nav-evchargerdischarger': isEVChargerDischarger, 'nav-settings': isSettings, 'nav-help': isHelp }">
      <div class="header-nav-highlight position-absolute bg-white pe-none h-100"></div>
      <router-link class="header-nav-list-item header-nav-single link-light text-decoration-none border-end border-white" :to="{ name: 'single' }" :title="text?.nav?.single?.title">{{ text?.nav?.single?.label }}</router-link>
      <router-link class="header-nav-list-item header-nav-battery link-light text-decoration-none border-end border-white" :to="{ name: 'battery' }" :title="text?.nav?.battery?.title">{{ text?.nav?.battery?.label }}</router-link>
      <router-link class="header-nav-list-item header-nav-evchargerdischarger link-light text-decoration-none border-end border-white" :to="{ name: 'evChargerDischarger' }" :title="text?.nav?.evChargerDischarger?.title">{{ text?.nav?.evChargerDischarger?.label }}</router-link>
      <router-link class="header-nav-list-item header-nav-settings link-light text-decoration-none border-end border-white" :to="{ name: 'settings.single' }" :title="text?.nav?.settings?.title">{{ text?.nav?.settings?.label }}</router-link>
      <router-link class="header-nav-list-item header-nav-help link-light text-decoration-none" :to="{ name: 'help' }" :title="text?.nav?.help?.title">{{ text?.nav?.help?.label }}</router-link>
    </div>
    <div class="header-network-list card-list d-grid position-relative" :class="{ 'network-lan': isLAN, 'network-vpn': isVPN, 'network-cloud': isCloud }" :title="text?.network?.title">
      <div class="header-network-highlight position-absolute bg-white border-top border-bottom border-white pe-none w-100"></div>
      <div class="header-network-list-item header-network-lan d-grid align-content-center text-light"><span>{{ text?.network?.lan }}</span></div>
      <div class="header-network-list-item header-network-vpn d-grid align-content-center text-light"><span>{{ text?.network?.vpn }}</span></div>
      <div class="header-network-list-item header-network-cloud d-grid align-content-center text-light"><span>{{ text?.network?.cloud }}</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore(),
          route = useRoute();

    return {
      text: computed(() => store.getters.text?.header),
      myip: computed(() => store.state.myip),
      myeoj: computed(() => store.state.myeoj),
      settings: computed(() => store.state.settings),
      isSingle: computed(() => route.meta.feature === 'single'),
      isBattery: computed(() => route.meta.feature === 'battery'),
      isEVChargerDischarger: computed(() => route.meta.feature === 'evchargerdischarger'),
      isSettings: computed(() => route.meta.feature === 'settings'),
      isHelp: computed(() => route.meta.feature === 'help'),
      isLAN: computed(() => store.state.network === 'lan'),
      isVPN: computed(() => store.state.network === 'vpn'),
      isCloud: computed(() => store.state.network === 'cloud')
    };
  }
});
</script>

<style lang="scss" scoped>
.header {
  grid-template-columns: 1fr 675px 116px;
}
.header-main-title {
  font-size:   var(--size-text-xxl);
  font-weight: var(--weight-heavy);
}
.header-main-tagline {
  font-size:   var(--size-text-l);
  font-weight: var(--weight-medium);
}
.header-main-block-info {
  font-size:   var(--size-text-l);
  font-weight: var(--weight-light);
}
.header-nav-list {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.header-nav-list-item {
  padding-top: 46px;
  text-align:  center;
  cursor:      pointer;
}
.header-nav-list-item:hover{
  background-color:  rgba(255, 255, 255, 0.2);
}
.header-nav-single {
  background-image:    url('/assets/img/icon-nav-single.svg');
  background-repeat:   no-repeat;
  background-position: center 12px;
}
.header-nav-battery {
  background-image:    url('/assets/img/icon-nav-battery.svg');
  background-repeat:   no-repeat;
  background-position: center 12px;
}
.header-nav-evchargerdischarger {
  background-image:    url('/assets/img/icon-nav-evchargerdischarger.svg');
  background-repeat:   no-repeat;
  background-position: center 10px;
  background-size:     32px;
  padding-top:         40px;
  line-height:         18px;
}
.header-nav-settings {
  background-image:    url('/assets/img/icon-nav-settings.svg');
  background-repeat:   no-repeat;
  background-position: center 15px;
}
.header-nav-help {
  background-image:    url('/assets/img/icon-nav-help.svg');
  background-repeat:   no-repeat;
  background-position: center 15px;
}
.header-network-lan {
  background-image:    url('/assets/img/icon-network-lan.svg');
  background-repeat:   no-repeat;
  background-position: 15px 5px;
}
.header-network-vpn {
  background-image:    url('/assets/img/icon-network-vpn.svg');
  background-repeat:   no-repeat;
  background-position: 14px center;
}
.header-network-cloud {
  background-image:    url('/assets/img/icon-network-cloud.svg');
  background-repeat:   no-repeat;
  background-position: 14px center;
}
.header-nav-highlight {
  --bs-bg-opacity: .2;
  width:           135px;
  display:         none;
  transition:      left .25s ease-out;
}
.nav-single {
  .header-nav-highlight {
    display:     block;
    left:        0px;
    border-left: none !important;
  }
}
.nav-battery {
  .header-nav-highlight {
    display: block;
    left:    135px;
  }
}
.nav-evchargerdischarger {
  .header-nav-highlight {
    display: block;
    left:    270px;
  }
}
.nav-settings {
  .header-nav-highlight {
    display: block;
    left:    405px;
  }
}
.nav-help {
  .header-nav-highlight {
    display:      block;
    left:         540px;
    border-right: none !important;
  }
}
.header-network-list-item {
  padding-left: 42px;
}
.header-network-highlight {
  --bs-bg-opacity: .2;
  height:          27px;
  transition:      top .25s ease-out;
}
.network-lan {
  .header-network-highlight {
    top:        0px;
    border-top: none !important;
  }
  .header-network-vpn,
  .header-network-cloud {
    --bs-text-opacity: .5;
  }
}
.network-vpn {
  .header-network-highlight {
    top: 27px;
  }
  .header-network-lan,
  .header-network-cloud {
    --bs-text-opacity: .5;
  }
}
.network-cloud {
  .header-network-highlight {
    top:           54px;
    border-bottom: none !important;
  }
  .header-network-lan,
  .header-network-vpn {
    --bs-text-opacity: .5;
  }
}
</style>
