<template>
  <ux-demo title="额外提示内容"
           :height="200">
    <div slot="demo">
      <ux-alert type="success"
                message="Success Tip"
                description="This is a success description" />
      <ux-alert type="info"
                message="Info Tip"
                description="This is an info description" />
      <ux-alert type="error"
                message="Error Tip"
                description="This is an error description" />
      <ux-alert type="warning"
                message="Warning Tip"
                description="This is a warning description" />
    </div>
    <div slot="desc">
      含有额外提示内容的警告提示
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/description.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
