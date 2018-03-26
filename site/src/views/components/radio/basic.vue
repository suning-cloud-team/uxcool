<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <ux-radio />
      <br>
      <ux-radio>inner label</ux-radio>
    </div>
    <div slot="desc">
      Radio的简单的使用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/basic.vue';

  export default {
    data() {
      return {
        code,
        opts5: ['aa', 'bb', 'cc'],
      };
    },
  };
</script>
