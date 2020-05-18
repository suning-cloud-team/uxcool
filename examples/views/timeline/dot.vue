<template>
  <div class="demo">
    <h4>dot</h4>
    <ux-timeline>
      <ux-timeline-item color="green">A</ux-timeline-item>
      <ux-timeline-item color="blue">B</ux-timeline-item>
      <ux-timeline-item color="red">
        <ux-icon slot="dot"
                 type="unhappy_o" />
        <p>Problem 1</p>
        <p>Problem 2</p>
        <p>Problem 3</p>
      </ux-timeline-item>
      <ux-timeline-item color="skyblue">自定义颜色</ux-timeline-item>
    </ux-timeline>
  </div>
</template>
<script>
  import { Timeline, Icon, Popconfirm } from '@cloud-sn/uxcool';

  console.log(Object.keys(Popconfirm.props).map(k => ({ name: k, type: Popconfirm.props[k].type })));

  export default {
    components: {
      UxTimeline: Timeline,
      UxTimelineItem: Timeline.Item,
      UxIcon: Icon,
    },
  };
</script>

<style scoped>
  .demo p {
    margin: 0;
  }
</style>
