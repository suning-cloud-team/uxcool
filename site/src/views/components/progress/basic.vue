<template>
  <ux-demo title="基本用法">
    <div slot="demo">
      <div style="width: 400px">
          <ux-progress :theme="theme"></ux-progress>
          <ux-progress percentage="30" :theme="theme"></ux-progress>
          <ux-progress percentage="30" status="error" :theme="theme"></ux-progress>
          <ux-progress percentage="100" status="success" :theme="theme"></ux-progress>
          <ux-progress percentage="100" hide-info :theme="theme"></ux-progress>
      </div>
    </div>
    <div slot="desc">
      通过<code>percentage</code>指定百分比,  通过<code>status</code>指定状态。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/progress/basic';

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
