<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-progress percentage="40" />
      <ux-progress percentage="50"
                   status="active" />
      <ux-progress percentage="60"
                   status="error" />
      <ux-progress percentage="100" />
      <ux-progress percentage="75"
                   hide-info/>
      <ux-progress percentage="30"
                   stroke-width="1" />
      <ux-progress percentage="30"
                   stroke-color="skyblue" />
      <ux-progress stroke-width="4" />
    </div>
    <div slot="desc">
      基本的进度条
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
