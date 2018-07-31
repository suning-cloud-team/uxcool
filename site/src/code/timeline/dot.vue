<template>
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
</template>

<script>
  export default {};
</script>

 <style scoped>
  .demo p {
    margin: 0;
  }
</style>


