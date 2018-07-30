<template>
  <ux-demo :height="200"
           title="反转时间轴">
    <div slot="demo">
      <ux-timeline :reverse="reverse"
                   pending="loading">
        <ux-timeline-item>A</ux-timeline-item>
        <ux-timeline-item>B</ux-timeline-item>
        <ux-timeline-item>C</ux-timeline-item>
      </ux-timeline>
      <ux-button @click="toggle">toggle reverse</ux-button>
    </div>
    <div slot="desc">
      通过
      <code>reverse</code>属性,控制时间轴是否反转
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timeline/reverse.vue';

  export default {
    data() {
      return {
        code,
        reverse: false,
      };
    },
    methods: {
      toggle() {
        this.reverse = !this.reverse;
      },
    },
  };
</script>
