<template>
  <div class="demo">
    <h4>normal</h4>
    <ux-timeline>
      <ux-timeline-item>A</ux-timeline-item>
      <ux-timeline-item>B</ux-timeline-item>
      <ux-timeline-item>C</ux-timeline-item>
    </ux-timeline>
  </div>
</template>
<script>
  import { Timeline } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTimeline: Timeline,
      UxTimelineItem: Timeline.Item,
    },
  };
</script>
