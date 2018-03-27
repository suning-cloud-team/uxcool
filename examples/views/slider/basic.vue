<template>
  <div>
    <normal-demo/>
    <disabled-demo/>
    <icon-demo/>
    <event-demo/>
    <tip-demo />
    <marks-demo/>
    <vertical-demo/>
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import DisabledDemo from './disabled.vue';
  import IconDemo from './icon.vue';
  import EventDemo from './event.vue';
  import TipDemo from './tip.vue';
  import MarksDemo from './marks.vue';
  import VerticalDemo from './vertical.vue';

  export default {
    components: {
      NormalDemo,
      DisabledDemo,
      IconDemo,
      EventDemo,
      TipDemo,
      MarksDemo,
      VerticalDemo,
    },
  };
</script>
