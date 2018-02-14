<template>
  <ux-demo title="图标">
    <div slot="demo">
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item>
          <ux-icon type="home">
          </ux-icon>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <ux-icon type="account"></ux-icon>
          用户管理
        </ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>
    <div slot="desc">自定义图标</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/breadcrumb/customIcon';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
