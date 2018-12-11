<template>
  <article class="doc">
    <h1 class="ux-heading">Drawer
      <span class="subtitle">抽屉</span>
    </h1>

    <basic-demo />
    <multiple-demo />
    <placement-demo />
    <destroy-demo />
    <close-demo />
    <title-demo />
    <width-demo />
    <hr>
    <doc />
  </article>
</template>


<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import MultipleDemo from './multiple.vue';
  import PlacementDemo from './placement.vue';
  import DestroyDemo from './destroy-on-close.vue';
  import CloseDemo from './close.vue';
  import TitleDemo from './title.vue';
  import WidthDemo from './width.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      MultipleDemo,
      PlacementDemo,
      DestroyDemo,
      CloseDemo,
      TitleDemo,
      WidthDemo,
    },
  };
</script>

