<template>
  <div>
    <normal-demo />
    <rowkey-demo />
    <async-demo />
    <render-demo />
    <huge-demo />
    <filter-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import AsyncDemo from './async.vue';
  import RenderDemo from './render.vue';
  import HugeDemo from './huge.vue';
  import FilterDemo from './filter.vue';
  import RowkeyDemo from './rowkey.vue';

  export default {
    components: {
      NormalDemo,
      AsyncDemo,
      RenderDemo,
      HugeDemo,
      FilterDemo,
      RowkeyDemo,
    },
  };
</script>
