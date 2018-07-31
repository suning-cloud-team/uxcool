<template>
  <div>
    <normal-demo />
    <hover-demo />
    <clear-demo />
    <search-demo />
    <disabled-demo />
    <custom-demo />
    <change-on-select-demo />
    <event-demo />
    <async-demo />
    <render-demo />
    <focus-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import HoverDemo from './hover.vue';
  import ClearDemo from './clear.vue';
  import SearchDemo from './search.vue';
  import DisabledDemo from './disabled.vue';
  import CustomDemo from './custom.vue';
  import changeOnSelectDemo from './changeOnSelect.vue';
  import EventDemo from './event.vue';
  import AsyncDemo from './async.vue';
  import RenderDemo from './render.vue';
  import FocusDemo from './focus.vue';

  export default {
    components: {
      NormalDemo,
      HoverDemo,
      ClearDemo,
      SearchDemo,
      DisabledDemo,
      CustomDemo,
      changeOnSelectDemo,
      EventDemo,
      AsyncDemo,
      RenderDemo,
      FocusDemo,
    },
  };
</script>
