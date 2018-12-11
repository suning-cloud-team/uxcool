<template>
  <article class="doc">
    <h1 class="ux-heading">Tag
      <span class="subtitle">标签</span>
    </h1>
    <basic-demo />
    <color-demo />
    <checkable-demo />
    <hr>
    <doc />
  </article>
</template>


<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import CheckableDemo from './checkable.vue';
  import ColorDemo from './color.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      CheckableDemo,
      ColorDemo,
    },
  };
</script>
