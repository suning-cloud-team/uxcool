<template>
  <ux-demo title="位置"
           vertical>
    <div slot="demo">
      <ux-select :value="selectedPosition"
                 :theme="theme"
                 @change="selectChange">
        <ux-option value="top">top</ux-option>
        <ux-option value="left">left</ux-option>
        <ux-option value="right">right</ux-option>
        <ux-option value="bottom">bottom</ux-option>
      </ux-select>
      <ux-tabs :tab-position="selectedPosition"
               :theme="theme"
               :style="positionStyle"
               @tab-click="onTabClick">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{ pane.content }}
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <div slot="desc">支持上右下左四个位置, 通过
      <code>tab-position=top|right|bottom|right</code>设置</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/position.vue';

  export default {
    data() {
      return {
        panes: [],
        selectedPosition: 'top',
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
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
    created() {
      this.panes = Array(20)
        .fill(0)
        .map((v, i) => ({
          tab: `Tab ${i}`,
          name: `name${i}`,
          content: `Tab ${i} Content`,
      }));
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
