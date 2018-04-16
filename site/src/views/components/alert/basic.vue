<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <ux-alert message="Success Tip"
                type="success" />
    </div>
    <div slot="desc">
      Alert基本用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
