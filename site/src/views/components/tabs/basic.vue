<template>
  <ux-demo title="基本用法"
           vertical>
    <div slot="demo">
      <ux-tabs :theme="theme">
        <ux-tab-pane tab="Tab 1"
                     name="1">
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane tab="Tab 2"
                     name="2">
          Tab 2 Content
        </ux-tab-pane>
        <ux-tab-pane tab="Tab 3"
                     name="3">
          Tab 3 Content
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <div slot="desc">默认选择第一个tab</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/basic';

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
