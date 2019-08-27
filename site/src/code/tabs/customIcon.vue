<template>
  <ux-tabs @tab-click="onTabClick">
    <ux-tab-pane name="1">
      <span slot="tab">
        <i class="fu fu-account"></i> Tab 1
      </span>
      Tab 1 Content
    </ux-tab-pane>
    <ux-tab-pane name="2">
      <span slot="tab">
        <i class="fu fu-star"></i>Tab 2
      </span>
      Tab 2 Content
    </ux-tab-pane>
    <ux-tab-pane tab="Tab 3"
                 name="3">
      Tab 3 Content
    </ux-tab-pane>
  </ux-tabs>
</template>

<script>
  export default {
    methods: {
      onTabClick(...args) {
        console.log(...args);
      },
    },
  };
</script>
