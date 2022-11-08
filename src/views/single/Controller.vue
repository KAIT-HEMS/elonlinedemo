<template>
  <div>
    <div class="single-controller card-body d-grid gap-3">
      <div class="single-controller-head grid">
        <h2 class="fs-4 me-3 text-primary">{{ text?.heading }}</h2>
        <router-link :to="{ name: 'single.search' }" custom v-slot="{ navigate }">
          <button class="btn btn-outline-primary" type="button" :title="text?.searchNavButton?.title" @click="navigate"><i class="bi bi-ui-checks-grid"></i> {{ text?.searchNavButton?.label }}</button>
        </router-link>
        <keep-alive>
          <setc-form />
        </keep-alive>
      </div>
      <camera-switcher />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import SetcForm from '@/components/single/SetcForm.vue';
import CameraSwitcher from '@/components/single/CameraSwitcher.vue';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      text: computed(() => store.getters.text?.single?.controller)
    };
  },
  components: {
    SetcForm,
    CameraSwitcher
  }
});
</script>

<style lang="scss" scoped>
.single-controller {
  grid-template-rows: max-content minmax(0, 1fr);
}
.single-controller-head {
  grid-template-columns: 1fr 160px 540px;
}
</style>
