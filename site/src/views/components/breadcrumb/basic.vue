<template>
  <ux-demo title="基本用法">
    <div slot="demo">
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item>首页</ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
        <ux-breadcrumb-item> </ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>
    <div slot="desc">最基本的用法</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/breadcrumb/basic';

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
