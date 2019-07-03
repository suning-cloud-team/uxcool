<template>
  <div class="demo">
    <ux-tabs>
      <ux-tab-pane name="tab1"
                   tab="tab1">
        Tab1
      </ux-tab-pane>
      <ux-tab-pane name="tab2"
                   tab="tab2">
        Tab2
      </ux-tab-pane>
      <ux-tab-pane name="tab3">
        <template slot="tab">
          <ux-button>
            {{ tab3 }}
          </ux-button>
        </template>
        Tab3
      </ux-tab-pane>
    </ux-tabs>
    <br>
    <ux-button @click="onClickChange">CHANGE!</ux-button>
  </div>
</template>

<script>
  import { Tabs, Button } from '@suning/uxcool';

  export default {
    components: {
      UxTabs: Tabs,
      UxTabPane: Tabs.TabPane,
      UxButton: Button,
    },
    data() {
      return {
        tab3: 'tab3 once'
      };
    },
    methods: {
      onClickChange() {
        this.tab3 = 'tab3 twice';
      },
    },
  };
</script>
