<template>
  <ux-demo :height="200"
           title="颜色">
    <div slot="demo">
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
    <div slot="desc">
      红色代表告警或错误, 绿色代表完成或成功, 蓝色代表默认或正在进行
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timeline/color.vue';

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
