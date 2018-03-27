<template>
  <ux-demo title="图标"
           :height="200">
    <div slot="demo">
      <ux-alert type="success"
                message="Success Tip"
                show-icon/>
      <ux-alert type="info"
                message="Info Tip"
                show-icon/>
      <ux-alert type="error"
                message="Error Tip"
                show-icon />
      <ux-alert type="warning"
                message="Warning Tip"
                show-icon />
      <ux-alert type="success"
                message="Success Tip"
                description="This is a success description"
                show-icon/>
      <ux-alert type="info"
                message="Info Tip"
                description="This is an info description"
                show-icon/>
      <ux-alert type="error"
                message="Error Tip"
                description="This is an error description"
                show-icon />
      <ux-alert type="warning"
                message="Warning Tip"
                description="This is a warning description"
                show-icon />
    </div>
    <div slot="desc">
      设置
      <code>show-icon</code>, 显示图标
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/icon.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
