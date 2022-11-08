<template>
  <div class="d-flex gap-1">
    <div class="main-deck flex-grow-1 d-grid gap-1">
      <div class="d-flex gap-1">
        <router-view name="menu" v-slot="{ Component }">
          <keep-alive>
            <component class="flex-shrink-0 card d-grid grid-template-100" :is="Component" />
          </keep-alive>
        </router-view>
        <router-view name="main" v-slot="{ Component }">
          <keep-alive>
            <component class="flex-grow-1 card d-grid grid-template-100" :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <router-view name="footer" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="logger" :filterLog="logger"/>
        </keep-alive>
      </router-view>
    </div>
    <router-view name="drawer" v-slot="{ Component }">
      <keep-alive>
        <component class="flex-shrink-0 card d-grid grid-template-100" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();

    return {
      logger: computed(() => route.meta.feature)
    };
  }
});
</script>

<style lang="scss" scoped>
.main-deck {
  grid-template-rows: minmax(0, 1fr);
}
</style>
