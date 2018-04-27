<template>
  <div ref="tablistRef"
       role="tablist"
       tabindex="0"
       :class="classes">
    <scrollable-ink-tab-bar v-bind="$props"
                            :root-node="$refs.tablistRef"
                            v-on="$listeners">
    </scrollable-ink-tab-bar>
    <!-- <ink-tab-bar :prefix-cls="prefixCls"
                 :active-tab="activeTab"
                 :wrap-node="$refs.tablistRef"
                 :tab-bar-position="tabBarPosition"></ink-tab-bar>
    <div ref="tabs"
         role="tab"
         v-for="(item,i) in tabs"
         :key="i"
         :data-active="item.isActive"
         :class="itemClasses(item)"
         @click="item.disabled ? null : onTabClick(item)">
      {{item.tab}}
    </div> -->
  </div>
</template>

<script>
  import ScrollableInkTabBar from './scrollableInkTabBar.vue';

  export default {
    name: 'TabBar',
    props: {
      prefixCls: String,
      tabs: Array,
      tabBarPosition: String,
      size: String,
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return `${prefixCls}-bar`;
      },
    },
    components: {
      ScrollableInkTabBar,
    },
  };
</script>
