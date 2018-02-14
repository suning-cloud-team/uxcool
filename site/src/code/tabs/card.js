export default `
<template>
<ux-tabs type="card">
  <ux-tab-pane v-for="(pane,i) in panes"
             :key="i"
             :disabled="pane.disabled"
             :tab="pane.tab"
             :name="pane.name">
    {{pane.content}}
  </ux-tab-pane>
</ux-tabs>  
</template>

<script>
export default {
  data() {
    return {
      panes: [],
    };
  },
  created() {
    this.panes = Array(20)
      .fill(0)
      .map((v, i) => ({
        tab: \`Tab \${i}\`,
        name: \`name\${i}\`,
        content: \`Tab \${i} Content\`,
      }));
  },
};
</script>
`;
