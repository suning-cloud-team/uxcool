<template>
  <div class="demo">
    <h4>reverse</h4>
    <ux-timeline :reverse="reverse"
                 pending="loading">
      <ux-timeline-item>A</ux-timeline-item>
      <ux-timeline-item>B</ux-timeline-item>
      <ux-timeline-item>C</ux-timeline-item>
    </ux-timeline>
    <ux-button @click="toggle">toggle reverse</ux-button>
  </div>
</template>
<script>
  import { Timeline, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTimeline: Timeline,
      UxTimelineItem: Timeline.Item,
      UxButton: Button,
    },
    data() {
      return {
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
