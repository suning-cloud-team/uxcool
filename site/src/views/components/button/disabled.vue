<template>
  <ux-demo title="不可用"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-button type="primary">Primary</ux-button>
      <ux-button type="primary"
                 disabled>Primary(disabled)</ux-button>
      <br>
      <ux-button>Default</ux-button>
      <ux-button disabled>Default(disabled)</ux-button>
      <br>
      <ux-button>Ghost</ux-button>
      <ux-button disabled>Ghost(disabled)</ux-button>
      <br>
      <ux-button type="dashed">Dashed</ux-button>
      <ux-button type="dashed"
                 disabled>Dashed(disabled)</ux-button>
    </div>
    <div slot="desc">
      设置
      <code>disabled</code>使按钮处于不可用状态, 样式会发生变化
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/disabled';

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

