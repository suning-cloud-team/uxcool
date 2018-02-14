export default `
<template>
  <ux-breadcrumb :theme="theme">
    <ux-breadcrumb-item>
      <router-link to="/modal">Modal</router-link>
    </ux-breadcrumb-item>
    <ux-breadcrumb-item>
      <router-link to="/message">Message</router-link>
    </ux-breadcrumb-item>
    <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
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
