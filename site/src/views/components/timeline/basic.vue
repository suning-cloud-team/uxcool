<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-timeline>
        <ux-timeline-item>A</ux-timeline-item>
        <ux-timeline-item>B</ux-timeline-item>
        <ux-timeline-item>C</ux-timeline-item>
      </ux-timeline>
    </div>
    <div slot="desc"></div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timeline/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

