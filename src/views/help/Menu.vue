<template>
  <div class="help-menu">
    <div class="card-body d-grid gap-3 align-content-start">
      <h2 class="fs-4 me-3 text-primary">{{ text?.heading }}</h2>
      <div class="d-grid gap-3">
        <router-link class="text-muted text-decoration-none" v-for="(item, index) of helpMenu" :key="index" :to="{name: 'help', hash: `#${item.hash}`}">{{ item.label }}</router-link>
      </div>
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
      text: computed(() => store.getters.text?.help?.menu),
      helpMenu: computed(() => store.getters.helpMenu)
    };
  }
});
</script>

<style lang="scss" scoped>
.help-menu {
  width: 236px;
}
.router-link-active {
  color: var(--bs-dark) !important;
  font-weight: var(--weight-heavy);
}
</style>
