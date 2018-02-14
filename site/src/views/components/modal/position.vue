<template>
  <ux-demo title="自定义位置">
    <div slot="demo">
      <button class="ux-btn"
              @click="customStyleOpen">
        距离顶部10像素
      </button>
      <ux-modal v-model="customStyleVisible"
                title="自定义样式"
                :theme="theme"
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
                :theme="theme"
                wrap-class="vertical-center-modal"
                @ok="onOk($event, 'vertical center')"
                @cancel="onCancel($event, 'vertical center')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>
    <div slot="desc">可以通过
      <code>wrap-class</code>、
      <code>wrap-style</code>、
      <code>dialog-class</code>、
      <code>dialog-style</code>等属性自定义样式。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/position';

  export default {
    data() {
      return {
        customStyleVisible: false,
        verticalCenterVisible: false,
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      customStyleOpen() {
        this.customStyleVisible = true;
      },
      verticalCenterOpen() {
        this.verticalCenterVisible = true;
      },
      onOk(e, from) {
        console.log(`${from} ok`, e);
      },
      onCancel(e, from) {
        console.log(`${from} cancel`, e);
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
