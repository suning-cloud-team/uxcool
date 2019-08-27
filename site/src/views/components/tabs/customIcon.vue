<template>
  <ux-demo title="图标"
           vertical>
    <div slot="demo">
      <ux-tabs :theme="theme"
               @tab-click="onTabClick">
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
    </div>
    <div slot="desc">自定义图标</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/customIcon.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onTabClick(...args) {
        console.log(...args);
      },
    },
  };
</script>

