<template>
  <div class="demo">
    <ux-tabs>
      <ux-tab-pane name="tab1"
                   tab="tab1">
        Tab1 {{ count }}
      </ux-tab-pane>
      <ux-tab-pane name="tab2"
                   tab="tab2">
        Tab2
      </ux-tab-pane>
      <ux-tab-pane name="tab3">
        <template slot="tab">
          count: {{ count }}
        </template>
        Tab3
      </ux-tab-pane>
    </ux-tabs>
    <ux-tabs value="tab1">
      <ux-tab-pane name="tab1"
                   tab="tab1">
        Tab1 {{ count }}
      </ux-tab-pane>
      <ux-tab-pane name="tab2"
                   tab="tab2">
        Tab2
      </ux-tab-pane>
      <ux-tab-pane name="tab3">
        <template slot="tab">
          count: {{ count }}
        </template>
        Tab3
      </ux-tab-pane>
    </ux-tabs>
    <br>
    <ux-button @click="onClickChange">{{ count }}</ux-button>
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
        count: 0,
      };
    },
    methods: {
      onClickChange() {
        this.count += 1;
      },
    },
  };
</script>
