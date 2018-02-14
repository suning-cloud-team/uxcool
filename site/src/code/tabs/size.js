export default `
<template>
<div class="ux-btn-group">
  <button class="ux-btn ux-btn-default"
          :class="{active: size === 'small'}"
          @click="changeSize('small')">small</button>
  <button class="ux-btn ux-btn-default"
          :class="{active: size === 'default'}"
          @click="changeSize('default')">default</button>
  <button class="ux-btn ux-btn-default"
          :class="{active: size === 'large'}"
          @click="changeSize('large')">large</button>
</div>
<ux-tabs :size="size"
       value="name5"
       @tab-click="onTabClick">
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
        size: 'default',
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
    methods: {
      onTabClick(...args) {
        console.log(args);
      },
      changeSize(size) {
        this.size = size;
      },
    },
  };
</script>

`;
