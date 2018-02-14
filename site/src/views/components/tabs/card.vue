<template>
  <ux-demo title="卡片式标签页"
           vertical>
    <div slot="demo">
      <ux-tabs type="card"
               :theme="theme">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{pane.content}}
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <div slot="desc">不支持垂直样式</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/card';

  export default {
    data() {
      return {
        panes: [],
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.panes = Array(20)
        .fill(0)
        .map((v, i) => ({
          tab: `Tab ${i}`,
          name: `name${i}`,
          content: `Tab ${i} Content`,
        }));
    },
  };
</script>

