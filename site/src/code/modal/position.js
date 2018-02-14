export default `
<template>
  <div>
    <button class="ux-btn"
      @click="customStyleOpen">
    距离顶部10像素
    </button>
    <ux-modal v-model="customStyleVisible"
        title="自定义样式"
        :dialog-style="{'top':'10px'}"
        @ok="onOk($event, 'custom style')"
        @cancel="onCancel($event, 'custom style')">
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
    </ux-modal>

    <button class="ux-btn"
      @click="verticalCenterOpen">
    垂直居中
    </button>
    <ux-modal v-model="verticalCenterVisible"
        title="垂直居中"
        wrap-class="vertical-center-modal"
        @ok="onOk($event, 'vertical center')"
        @cancel="onCancel($event, 'vertical center')">
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
        customStyleVisible: false,
        verticalCenterVisible: false
      };
    },
    methods: {
      customStyleOpen() {
        this.customStyleVisible = true;
      },
      verticalCenterOpen() {
        this.verticalCenterVisible = true;
      },
      onOk(e, from) {
        console.log(\`\${from} ok\`, e);
      },
      onCancel(e, from) {
        console.log(\`\${from} cancel\`, e);
      },
    },
  };
</script>

<style lang="scss">
  .vertical-center-modal {
    text-align: center;
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    .ux-modal {
      display: inline-block;
      top: 0;
      vertical-align: middle;
      text-align: left;
    }
  }
</style>
`;
