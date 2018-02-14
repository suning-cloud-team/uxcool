export default `
<template>
  <div>
    <button class="ux-btn"
      @click="visible = true">禁用关闭按钮</button>
    <ux-modal v-model="visible"
        title="标题"
        :closable="false">
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
    </ux-modal>

    <button class="ux-btn"
      @click="visible2 = true">禁用蒙层关闭</button>
    <ux-modal v-model="visible2"
        :mask-closable="false"
        title="标题">
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
    </ux-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        visible2: false
      };
    },
  };
</script>
`;
