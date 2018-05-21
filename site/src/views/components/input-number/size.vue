<template>
  <ux-demo title="大小">
    <div slot="demo">
      <ux-input-number size="large"
                       class="mr-xs-2" />
      <ux-input-number class="mr-xs-2" />
      <ux-input-number size="small" />
    </div>
    <div slot="desc">
      数字输入框有三种尺寸大小：
      <code>large</code>、
      <code>default</code>、
      <code>small</code>，可以通过
      <code>size</code> 设置。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/size.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

