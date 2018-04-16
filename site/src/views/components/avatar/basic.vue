<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <div class="demo">
        <ux-avatar icon="account"
                   size="large" />
        <ux-avatar icon="account" />
        <ux-avatar icon="account"
                   size="small" />
      </div>
      <div class="demo">
        <ux-avatar icon="account"
                   size="large"
                   shape="square" />
        <ux-avatar icon="account"
                   shape="square" />
        <ux-avatar icon="account"
                   size="small"
                   shape="square" />
      </div>
    </div>
    <div slot="desc">
      三种尺寸, 两种形状可选
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/avatar/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

<style scoped>
  .ux-avatar {
    margin: 10px 10px 0 0;
  }
</style>
