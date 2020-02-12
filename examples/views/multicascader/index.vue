<template>
  <div>
    <basic-demo />
    <disabled-demo />
    <clear-demo />
    <hover-demo />
    <strict-demo />
    <field-demo />
    <limit-demo />
    <custom-demo />
    <render-demo />
    <custom-trigger-demo />
    <size-demo />
    <async-demo />
    <event-demo />
    <watch-demo />
  </div>
</template>

<script>
  import BasicDemo from './basic.vue';
  import DisabledDemo from './disabled.vue';
  import ClearDemo from './clear.vue';
  import HoverDemo from './hover.vue';
  import StrictDemo from './strict.vue';
  import FieldDemo from './field.vue';
  import LimitDemo from './limit.vue';
  import CustomDemo from './custom.vue';
  import RenderDemo from './render.vue';
  import CustomTriggerDemo from './custom-trigger.vue';
  import SizeDemo from './size.vue';
  import AsyncDemo from './async.vue';
  import EventDemo from './event.vue';
  import WatchDemo from './watch.vue';

  export default {
    components: {
      BasicDemo,
      DisabledDemo,
      ClearDemo,
      HoverDemo,
      StrictDemo,
      FieldDemo,
      LimitDemo,
      CustomDemo,
      RenderDemo,
      CustomTriggerDemo,
      SizeDemo,
      AsyncDemo,
      EventDemo,
      WatchDemo,
    },
  };
</script>
