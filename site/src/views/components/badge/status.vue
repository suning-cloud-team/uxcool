<template>
  <ux-demo title="状态">
    <div slot="demo">
      <div class="demo-badge-group">
        <ux-badge status="success"
                  :theme="theme"></ux-badge>
        <ux-badge status="error"
                  :theme="theme"></ux-badge>
        <ux-badge status="default"
                  :theme="theme"></ux-badge>
        <ux-badge status="processing"
                  :theme="theme"></ux-badge>
        <ux-badge status="warning"
                  :theme="theme"></ux-badge>
      </div>
      <div class="demo-badge-group">
        <ux-badge status="success"
                  text="success"
                  :theme="theme"></ux-badge>
        <ux-badge status="error"
                  text="error"
                  :theme="theme"></ux-badge>
        <ux-badge status="default"
                  text="default"
                  :theme="theme"></ux-badge>
        <ux-badge status="processing"
                  text="processing"
                  :theme="theme"></ux-badge>
        <ux-badge status="warning"
                  text="warning"
                  :theme="theme"></ux-badge>
      </div>
    </div>
    <div slot="desc">可以通过指定
      <code>status</code>来定义不同状态的徽章。可选的
      <code>status</code>有:
      <code>success</code>,
      <code>error</code>,
      <code>processing</code>,
      <code>default</code>,
      <code>warning</code>。 </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/badge/status';

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
