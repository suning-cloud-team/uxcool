<template>
  <ux-demo :height="200"
           title="自定义时间轴点">
    <div slot="demo">
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
    <div slot="desc">
      自定义轴点为图标或其他元素
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timeline/dot.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

 <style scoped>
  .demo p {
    margin: 0;
  }
</style>


