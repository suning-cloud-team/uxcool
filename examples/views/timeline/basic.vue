<template>
  <div>
    <normal-demo />
    <color-demo />
    <reverse-demo />
    <pending-demo />
    <dot-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import ColorDemo from './color.vue';
  import ReverseDemo from './reverse.vue';
  import PendingDemo from './pending.vue';
  import DotDemo from './dot.vue';

  export default {
    components: {
      NormalDemo,
      ColorDemo,
      ReverseDemo,
      PendingDemo,
      DotDemo,
    },
  };
</script>
