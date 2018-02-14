<template>
  <ux-demo title="popover内关闭">
    <div slot="demo">
      <ux-popover trigger="click"
                  :theme="theme"
                  :visible="visible"
                  @visible-change="onVisibleChange">
        <button class="ux-btn">打开</button>
        <a slot="content"
           href="###"
           @click="close">关闭</a>
      </ux-popover>
    </div>
    <div slot="desc">
      使用
      <code>visible</code>属性控制显示, 需配置
      <code>visible-change</code>事件使用
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/popover/visible';

  export default {
    data() {
      return {
        code,
        visible: false,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onVisibleChange(visible) {
        this.visible = visible;
      },
      close() {
        this.visible = false;
      },
    },
  };
</script>
