<template>
  <ux-demo :height="200"
           title="仪表盘">
    <div slot="demo">
      <ux-progress percentage="35"
                   type="dashboard" />
    </div>
    <div slot="desc">
      设置
      <code>type=dashboard</code>,实现仪表盘样式进度条
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/dashboard.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
