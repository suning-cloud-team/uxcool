<template>
  <div>
    <normal-demo />
    <half-demo />
    <text-demo />
    <disabled-demo />
    <clear-demo />
    <custom-demo />
    <event-demo/>
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import HalfDemo from './half.vue';
  import TextDemo from './text.vue';
  import DisabledDemo from './disabled.vue';
  import ClearDemo from './clear.vue';
  import CustomDemo from './custom.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      NormalDemo,
      HalfDemo,
      TextDemo,
      DisabledDemo,
      ClearDemo,
      CustomDemo,
      EventDemo,
    },
  };
</script>
