<template>
  <div>
    <normal-demo />
    <directory-demo />
    <rowkey-demo />
    <async-demo />
    <async-rebuild-demo />
    <render-demo />
    <input-render-demo/>
    <filter-demo />
    <drag-demo />
    <drag-checkbox-demo />
    <drag-async-demo />
    <virtual-tree-demo />
    <auto-measure-tree-demo/>
    <!--<huge-demo />-->
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import AsyncDemo from './async.vue';
  import AsyncRebuildDemo from './async-rebuild.vue';
  import RenderDemo from './render.vue';
  import InputRenderDemo from './input-render.vue';
  import HugeDemo from './huge.vue';
  import FilterDemo from './filter.vue';
  import RowkeyDemo from './rowkey.vue';
  import DirectoryDemo from './directory.vue';
  import DragDemo from './draggable.vue';
  import DragCheckboxDemo from './draggable-checkbox.vue';
  import DragAsyncDemo from './draggable-async.vue';
  import VirtualTreeDemo from './virtual-tree.vue';
  import AutoMeasureTreeDemo from './auto-measure-tree.vue';

  export default {
    components: {
      NormalDemo,
      AsyncDemo,
      AsyncRebuildDemo,
      RenderDemo,
      HugeDemo,
      FilterDemo,
      RowkeyDemo,
      DirectoryDemo,
      DragDemo,
      DragCheckboxDemo,
      DragAsyncDemo,
      VirtualTreeDemo,
      AutoMeasureTreeDemo,
      InputRenderDemo,
    },
  };
</script>
