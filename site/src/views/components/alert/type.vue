<template>
  <ux-demo title="四种样式"
           :height="200">
    <div slot="demo">
      <ux-alert type="success"
                message="Success Tip" />
      <ux-alert type="info"
                message="Info Tip" />
      <ux-alert type="error"
                message="Error Tip" />
      <ux-alert type="warning"
                message="Warning Tip" />
    </div>
    <div slot="desc">
      共有四种样式
      <code>success</code>,
      <code>info</code>,
      <code>error</code>,
      <code>warning</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/type.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
