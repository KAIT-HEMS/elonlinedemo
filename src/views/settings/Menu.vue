<template>
  <div class="settings-menu">
    <div class="card-body d-grid gap-3 align-content-start">
      <h2 class="fs-4 me-3 text-primary">{{ text?.heading }}</h2>
      <div class="d-grid gap-3">
        <router-link :to="{ name: 'settings.single' }" class="text-muted text-decoration-none" :class="{ active: section === 'single' }">{{ text?.nav?.single }}</router-link>
        <router-link :to="{ name: 'settings.battery' }" class="text-muted text-decoration-none" :class="{ active: section === 'battery' }">{{ text?.nav?.battery }}</router-link>
        <router-link :to="{ name: 'settings.evChargerDischarger' }" class="text-muted text-decoration-none" :class="{ active: section === 'evChargerDischarger' }">{{ text?.nav?.evChargerDischarger }}</router-link>
        <router-link :to="{ name: 'settings.network' }" class="text-muted text-decoration-none" :class="{ active: section === 'network' }">{{ text?.nav?.network }}</router-link>
        <router-link :to="{ name: 'settings.cameras' }" class="text-muted text-decoration-none" :class="{ active: section === 'cameras' }">{{ text?.nav?.cameras }}</router-link>
        <router-link :to="{ name: 'settings.ui' }" class="text-muted text-decoration-none" :class="{ active: section === 'ui' }">{{ text?.nav?.ui }}</router-link>
      </div>
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
      text: computed(() => store.getters.text?.settings?.menu),
      section: computed(() => route.meta.section)
    };
  }
});
</script>

<style lang="scss" scoped>
.settings-menu {
  width: 236px;
}
.active {
  color:       var(--bs-dark) !important;
  font-weight: var(--weight-heavy);
}
</style>
