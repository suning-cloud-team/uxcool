<template>
  <div>
    <normal-demo />
    <cover-demo />
    <grid-demo/>
    <actions-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import CoverDemo from './cover.vue';
  import GridDemo from './grid.vue';
  import ActionsDemo from './actions.vue';

  export default {
    components: {
      NormalDemo,
      CoverDemo,
      GridDemo,
      ActionsDemo,
    },
  };
</script>
