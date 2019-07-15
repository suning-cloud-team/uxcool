<template>
  <ux-demo title="自定义路由行为"
           :height="200">
    <div slot="demo">
      <ux-anchor :before-hash-change="beforeHashChange">
        <ux-anchor-link href="#基本用法"
                        title="基本用法" />
        <ux-anchor-link href="#自定义容器"
                        title="自定义容器" />
        <ux-anchor-link href="#顶端偏移"
                        title="顶端偏移" />
        <ux-anchor-link href="#自定义路由行为"
                        title="自定义路由行为" />
        <ux-anchor-link href="#自定义滚动行为"
                        title="自定义滚动行为" />
        <ux-anchor-link href="#api"
                        title="api" />
      </ux-anchor>
    </div>
    <div slot="desc"></div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/anchor/before-hash-change.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      beforeHashChange() {
        return false;
      }
    }
  };
</script>
