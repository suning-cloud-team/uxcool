<template>
  <ux-demo title="自定义">
    <div slot="demo">
      <div style="width: 400px">
          <ux-progress stroke-width="2" :theme="theme"></ux-progress>
          <ux-progress percentage="30" stroke-width="2" :theme="theme">
          </ux-progress>
          <ux-progress percentage="30" stroke-width="2" status="error" :theme="theme">
            <ux-icon type="close_circle_o"></ux-icon>
          </ux-progress>
          <ux-progress percentage="100" stroke-width="2" status="success" :theme="theme">
            <ux-icon type="ok_circle"></ux-icon>
          </ux-progress>
          <ux-progress percentage="100" stroke-width="20" hide-info :theme="theme"></ux-progress>
          <ux-progress percentage="100" stroke-width="20"  status="error"  hide-info :theme="theme"></ux-progress>
          <ux-progress percentage="100" stroke-width="20"  status="success" hide-info :theme="theme"></ux-progress>
      </div>
    </div>
    <div slot="desc">
      通过自定义<code>slot</code>和<code>stroke-width</code>改变进度条效果。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/progress/custom';

export default {
  data() {
    return {
      code,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>
