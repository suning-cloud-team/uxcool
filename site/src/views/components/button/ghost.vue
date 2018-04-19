<template>
  <ux-demo title="幽灵按钮"
           vertical>
    <div slot="demo"
         style="background: #ccc;padding: 10px;"
         class="gutter-group">
      <ux-button type="primary"
                 ghost>Primary</ux-button>
      <ux-button ghost>Default</ux-button>
      <ux-button type="dashed"
                 ghost>Dashed</ux-button>
      <ux-button type="danger"
                 ghost>danger</ux-button>
    </div>
    <div slot="desc">
      将内容颜色反转, 背景透明,常用于有色背景中
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/ghost';

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
