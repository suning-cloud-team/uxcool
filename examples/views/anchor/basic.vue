<template>
  <div>
    <normal-demo />
    <offset-demo />
    <container-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import OffsetDemo from './offset.vue';
  import ContainerDemo from './container.vue';

  export default {
    components: {
      ContainerDemo,
      NormalDemo,
      OffsetDemo,
    },
  };
</script>
