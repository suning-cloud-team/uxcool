<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <ux-checkbox />
    </div>
    <div slot="desc">
      Checkbox的简单的使用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
