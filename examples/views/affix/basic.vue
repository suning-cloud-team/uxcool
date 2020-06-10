<template>
  <div>
    <normal-demo />
    <bottom-demo />
    <container-demo />
    <event-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import BottomDemo from './bottom.vue';
  import ContainerDemo from './container.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      NormalDemo,
      BottomDemo,
      ContainerDemo,
      EventDemo,
    },
  };
</script>
