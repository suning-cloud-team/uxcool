<template>
  <div class="demo">
    <h6>color</h6>
    <ux-button @click="changeColor">change color</ux-button>
    <ux-tabs v-model="value"
             @tab-click="onTabClick">
      <ux-tab-pane tab="Tab 1"
                   name="1">

        <span slot="tab"
              :style="color">
          Tab 1
        </span>
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
</template>

<script>
  import { Tabs, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTabs: Tabs,
      UxTabPane: Tabs.TabPane,
      UxButton: Button,
    },
    data() {
      return {
        value: '2',
        color: { color: 'green' },
      };
    },
    created() {
      setTimeout(() => {
        this.value = '2';
      }, 2500);
    },
    methods: {
      onTabClick(...args) {
        console.log(...args);
      },
      changeColor() {
        const { color } = this;
        this.color = color.color === 'red' ? { color: 'green' } : { color: 'red' };
      },
    },
  };
</script>
