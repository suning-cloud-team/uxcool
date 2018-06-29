<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-rate />
    </div>
    <div slot="desc">
      基本用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
