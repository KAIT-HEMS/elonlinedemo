<template>
  <div class="help-main card">
    <article class="overflow-auto m-3" v-html="help"></article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      help: computed(() => store.getters.help),
    };
  }
});
</script>

<style lang="scss">
.help-main {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.25rem !important;
    margin-bottom: 1.5rem !important;
    --bs-text-opacity: 1;
    color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;

    &:not(:first-child) {
      margin-top: 3rem !important;
    }
  }

}
</style>

<style lang="scss" scoped></style>
