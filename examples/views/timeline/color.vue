<template>
  <div class="demo">
    <h4>color</h4>
    <p>红色代表告警或错误, 绿色代表完成或成功, 蓝色代表默认或正在进行</p>
    <ux-timeline>
      <ux-timeline-item color="green">A</ux-timeline-item>
      <ux-timeline-item color="blue">B</ux-timeline-item>
      <ux-timeline-item color="red">
        <p>Problem 1</p>
        <p>Problem 2</p>
        <p>Problem 3</p>
      </ux-timeline-item>
      <ux-timeline-item color="skyblue">自定义颜色</ux-timeline-item>
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

<style scoped>
  .demo p {
    margin: 0;
  }
</style>
