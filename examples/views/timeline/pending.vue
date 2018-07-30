<template>
  <div class="demo">
    <h4>pending</h4>
    <ux-timeline>
      <span slot="pending"
            style="green">this is slot pending</span>
      <ux-icon slot="pendingDot"
               type="horn_o" />
      <ux-timeline-item>A</ux-timeline-item>
      <ux-timeline-item>B</ux-timeline-item>
      <ux-timeline-item>C</ux-timeline-item>
    </ux-timeline>
  </div>
</template>
<script>
  import { Timeline, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxTimeline: Timeline,
      UxTimelineItem: Timeline.Item,
      UxIcon: Icon,
    },
  };
</script>
