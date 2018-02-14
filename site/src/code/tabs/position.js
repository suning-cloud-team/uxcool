export default `
<template>
<ux-select :value="selectedPosition"
          @change="selectChange">
  <ux-option value="top">top</ux-option>
  <ux-option value="left">left</ux-option>
  <ux-option value="right">right</ux-option>
  <ux-option value="bottom">bottom</ux-option>
</ux-select>
<ux-tabs :tab-position="selectedPosition"
  @tab-click="onTabClick"
  :style="positionStyle">
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
        mode: 'top',
        size: 'default',
        selectedPosition: 'top',
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
    computed: {
      positionStyle() {
        const { selectedPosition } = this;
        let style = {};
        if (selectedPosition === 'left' || selectedPosition === 'right') {
          style = {
            height: '220px',
          };
        }
        return style;
      },
    },
    methods: {
      onTabClick(...args) {
        console.log(...args);
      },
      selectChange(selectedVal) {
        this.selectedPosition = selectedVal.value;
      },
    },
  };
</script>
`;
