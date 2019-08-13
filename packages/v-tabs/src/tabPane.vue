<template>
  <div :class="classes"
       role="tabpanel">
    <div style="display:none">
      <slot name="tab" />
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'TabPane',
    inject: ['tabRoot'],
    isTabPane: true,
    props: {
      name: { type: String, required: true },
      tab: String,
      disabled: Boolean,
      closable: Boolean,
    },
    data() {
      return {};
    },
    computed: {
      rootPrefixCls() {
        return this.tabRoot.prefixCls;
      },
      activeName() {
        return this.tabRoot.activeName;
      },
      destroyInactiveTabPane() {
        return this.tabRoot.destroyInactiveTabPane;
      },
      prefixCls() {
        return `${this.rootPrefixCls}-tabpane`;
      },
      normalizeName() {
        const { name } = this;
        return name;
      },
      isActive() {
        const { activeName, normalizeName } = this;
        return normalizeName && activeName === normalizeName;
      },
      classes() {
        const { prefixCls, isActive } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-inactive`]: !isActive,
          [`${prefixCls}-active`]: isActive,
        };
      },
    },
    created() {
      this.addToRoot();
    },
    updated() {
      this.tabRoot.$emit('tab-update');
    },
    beforeDestroy() {
      this.removeFromRoot();
    },
    methods: {
      addToRoot() {
        this.tabRoot.addDescendant(this);
      },
      removeFromRoot() {
        this.tabRoot.removeDescendant(this);
      },
    },
  };
</script>
