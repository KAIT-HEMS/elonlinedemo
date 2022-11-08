<template>
  <div class="backdrop bg-secondary bg-opacity-50 font-proportional vh-100 p-1 grid gap-1" style="--bs-columns: 1;">
    <the-header />
    <the-main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import TheMain from '@/components/TheMain.vue';

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch('openWebSocket');

    window.addEventListener('beforeunload', () => {
      store.dispatch('closeWebSocket');
    });

    return {};
  },
  components: {
    TheHeader,
    TheMain
  }
});
</script>

<style lang="scss">
:root {
  // Colors
  --color-gradient-start:         #2A74CD;
  --color-gradient-end:           #226BFF;
  --color-gradient-single-start:  #eb483e;
  --color-gradient-single-end:    #f98543;
  --color-gradient-battery-start: #11be80;
  --color-gradient-battery-end:   #27f561;
  --color-list-highlight:         rgba(255, 255, 255, .2);

  // Typography
  --size-text-xxs: 10px;
  --size-text-xs:  12px;
  --size-text-s:   14px;
  --size-text-m:   16px;
  --size-text-l:   18px;
  --size-text-xl:  20px;
  --size-text-xxl: 22px;
  --weight-light:  300;
  --weight-medium: 400;
  --weight-heavy:  500;

  // Layout
  --size-gutter-xxs:       10px;
  --size-gutter-xs:        12px;
  --size-gutter-s:         14px;
  --size-gutter-m:         16px;
  --size-gutter-l:         20px;
  --size-gutter-xl:        32px;
  --size-gutter-xxl:       40px;
  --radius-card:           8px;
  --radius-list-highlight: 30px;
}

// Utilities
.font-proportional {
  font-family: Rubik, sans-serif;
}
.font-monospaced {
  font-family: Courier, monospace;
}
.w-max {
  width: max-content;
}
.grid-template-100 {
  grid-template: 100% / 100%;
}
.grid-template-2x2 {
  grid-template-areas: 'a b'
                       'c d';
}
.grid-template-max-2 {
  grid-template-columns: repeat(2, max-content);
}
.grid-template-max-3 {
  grid-template-columns: repeat(3, max-content);
}
.grid-template-2 {
  grid-template-columns: 90px 400px;
}
.justify-items-center {
  justify-items: center;
}
.justify-self-start {
  justify-self: start;
}

// Components
.rounded-pill {
  border-radius: .5rem !important;
}
.btn-primary:hover {
  color:            #fff;
  background-color: #5596f6;
  border-color:     #5596f7;
}
.btn-secondary:hover {
  color:            #fff;
  background-color: #9299a0;
  border-color:     #919ba1;
}
.btn-success:hover {
  color:            #fff;
  background-color: #24c278;
  border-color:     #24c278;
}
.btn-danger:hover {
  color:            #fff;
  background-color: #dc6f7a;
  border-color:     #dc6f7a;
}
.card {
  border-radius: var(--radius-card);
  overflow:      hidden;
}
.card-list {
  @extend .card;
  background-image: linear-gradient(87.59deg, var(--color-gradient-start) -45.21%, var(--color-gradient-end) 97.98%);
}
.card-list-highlight {
  background-color: var(--color-list-highlight);
  border-radius:    var(--radius-list-highlight);
}
.grid-input-group {
  grid-template-columns: max-content minmax(0, 1fr);
}
.bg-camera {
  background-repeat:   no-repeat;
  background-position: center;
  background-size:     contain;
}
</style>

<style lang="scss" scoped>
.backdrop {
  grid-template-rows: 80px minmax(0, 1fr);
}
</style>
