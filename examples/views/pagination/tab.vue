<template>
  <div class="demo">
    <ux-tabs value="2">
      <ux-tab-pane tab="Tab 1"
                   name="1">
        <ux-pagination :current="current"
                       :total="500"
                       show-quick-jumper-confirm-btn
                       show-quick-jumper />
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
  import { Tabs, Pagination } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTabs: Tabs,
      UxTabPane: Tabs.TabPane,
      UxPagination: Pagination,
    },
    data() {
      return {
        current: 1,
      };
    },
  };
</script>
