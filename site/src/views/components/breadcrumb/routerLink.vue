<template>
  <ux-demo title="router-link">
    <div slot="demo">
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item>
          <router-link to="/modal">Modal</router-link>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <router-link to="/message">Message</router-link>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>
    <div slot="desc">结合vue-router使用</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/breadcrumb/routerLink';

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
