<template>
  <div>
    <normal-demo />
    <directory-demo />
    <rowkey-demo />
    <async-demo />
    <render-demo />
    <huge-demo />
    <filter-demo />
    <empty-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import AsyncDemo from './async.vue';
  import RenderDemo from './render.vue';
  import HugeDemo from './huge.vue';
  import FilterDemo from './filter.vue';
  import RowkeyDemo from './rowkey.vue';
  import EmptyDemo from './empty.vue';
  import DirectoryDemo from './directory.vue';

  export default {
    components: {
      NormalDemo,
      AsyncDemo,
      RenderDemo,
      HugeDemo,
      FilterDemo,
      RowkeyDemo,
      EmptyDemo,
      DirectoryDemo,
    },
  };
</script>
