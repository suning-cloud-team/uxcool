<template>
  <div>
    <normal-demo />
    <target-demo />
    <render-demo />
    <event-demo />
    <search-demo />
    <custom-demo />
    <huge-demo />
    <disabled-item-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import TargetDemo from './target.vue';
  import RenderDemo from './render.vue';
  import EventDemo from './event.vue';
  import SearchDemo from './search.vue';
  import CustomDemo from './custom.vue';
  import HugeDemo from './huge.vue';
  import DisabledItemDemo from './disabledItem.vue';

  export default {
    components: {
      NormalDemo,
      TargetDemo,
      RenderDemo,
      EventDemo,
      SearchDemo,
      CustomDemo,
      HugeDemo,
      DisabledItemDemo,
    },
  };
</script>
