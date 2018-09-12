<template>
  <article class="doc">
    <h1 class="ux-heading">CardAdvance
      <span class="subtitle">高级卡片</span>
    </h1>
    <basic-demo/>
    <cover-demo />
    <grid-demo/>
    <actions-demo />
    <hr>
    <doc/>
  </article>
</template>

<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import CoverDemo from './cover.vue';
  import GridDemo from './grid.vue';
  import ActionsDemo from './actions.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      CoverDemo,
      GridDemo,
      ActionsDemo,
    },
  };
</script>
