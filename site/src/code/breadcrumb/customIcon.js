export default `
<template>
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
</template>

<script>
  export default {
    data() {
      return {
      };
    },
  };
</script>
`;
