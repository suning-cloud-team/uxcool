<template>
  <div>
    <normal-demo />
    <offset-demo />
    <container-demo />

  </div>
</template>


<script>
  import { Anchor } from '@suning/uxcool';
  import NormalDemo from './normal.vue';
  import OffsetDemo from './offset.vue';
  import ContainerDemo from './container.vue';

  export default {
    components: {
      UxAnchor: Anchor,
      UxAnchorLink: Anchor.Link,
      ContainerDemo,
      NormalDemo,
      OffsetDemo,
    },
  };
</script>
