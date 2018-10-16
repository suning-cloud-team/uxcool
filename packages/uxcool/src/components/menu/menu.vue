<template>
  <v-menu :class="classes"
          v-bind="bindProps"
          v-on="bindListeners">
    <slot />
  </v-menu>
</template>


<script>
  import VMenu from '@suning/v-menu';
  import { isEqual } from '@suning/v-utils';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Menu'),
    components: {
      VMenu,
    },
    provide() {
      return {
        menuWrap: this,
      };
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-menu',
      },
      theme: {
        type: String,
        default: 'light',
      },
      mode: {
        type: String,
        default: 'inline',
        validator(v) {
          return v === 'vertical' || v === 'horizontal' || v === 'inline';
        },
      },
      inlineIndent: {
        type: Number,
        default: 24,
      },
      selectedKeys: {
        type: Array,
        default() {
          return [];
        },
      },
      openKeys: {
        type: Array,
        default() {
          return [];
        },
      },
      visible: {
        type: Boolean,
        default: true,
      },
      uniqueOpened: {
        type: Boolean,
        default: false,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      inlineCollapsed: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isWrap: true,
        innerOpenKeys: [],
        collapsedOpenKeys: [],
      };
    },
    computed: {
      classes() {
        const { prefixCls, inlineCollapsed } = this;
        return {
          [`${prefixCls}-inline-collapsed`]: inlineCollapsed,
        };
      },
      bindProps() {
        const {
          $props, inlineCollapsed, mode, collapsedOpenKeys
        } = this;

        return {
          ...$props,
          mode: inlineCollapsed ? 'vertical' : mode,
          openKeys: collapsedOpenKeys,
        };
      },
      bindListeners() {
        const { $listeners, onOpenChange } = this;
        return {
          ...$listeners,
          'open-change': onOpenChange,
        };
      },
    },
    watch: {
      openKeys(nVal, oVal) {
        if (!isEqual(nVal, oVal)) {
          const { inlineCollapsed } = this;
          const val = nVal || [];
          this.setOpenKeys(val);
          this.prevCollapsedOpenKeys = val;
          if (!inlineCollapsed) {
            this.collapsedOpenKeys = val;
          }
        }
      },
      inlineCollapsed() {
        this.updateCollapseOpenKeys();
      },
    },
    created() {
      const val = this.openKeys || [];
      this.setOpenKeys(val);
      // no reactive
      this.prevCollapsedOpenKeys = val;
      // no reactive
      this.updateCollapseOpenKeys();
    },
    methods: {
      setOpenKeys(keys) {
        this.innerOpenKeys = keys;
      },
      onOpenChange(keys) {
        this.setOpenKeys(keys);
        this.$emit('open-change', keys);
      },
      updateCollapseOpenKeys() {
        const { inlineCollapsed, innerOpenKeys, prevCollapsedOpenKeys } = this;
        if (inlineCollapsed) {
          this.prevCollapsedOpenKeys = innerOpenKeys;
          this.collapsedOpenKeys = [];
        } else {
          setTimeout(() => {
            this.collapsedOpenKeys = prevCollapsedOpenKeys;
            this.prevCollapsedOpenKeys = [];
          }, 100);
        }
      },
    },
  };
</script>
