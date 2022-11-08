<template>
  <div class="footer card px-3 d-grid align-content-center"><span>{{ text?.copyright }}</span></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      text: computed(() => store.getters.text?.footer)
    };
  }
});
</script>

<style lang="scss" scoped>
.footer {
  height:    28px;
  font-size: var(--size-text-s);
}
</style>
