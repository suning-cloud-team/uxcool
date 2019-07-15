<template>
  <div>
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
</template>

<script>
export default {
  methods: {
    beforeHashChange() {
      return false;
    },
  },
};
</script>
