<template>
  <ux-demo title="带徽标的头像"
           :height="200">
    <div slot="demo">
      <ux-badge count="11">
        <ux-avatar icon="account"
                   shape="square" />
      </ux-badge>

      <ux-badge dot>
        <ux-avatar icon="account"
                   shape="square" />
      </ux-badge>

    </div>
    <div slot="desc">
      带徽标的头像,可用于消息提示
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/avatar/badge.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

<style scoped>
  .ux-badge {
    margin: 10px 20px 0 0;
  }
</style>
