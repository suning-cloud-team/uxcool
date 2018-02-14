<template>
  <v-tabs v-bind="bindProps"
          :class="classes"
          :tab-bar-position="tabPosition"
          :animated="isAnimated"
          v-on="$listeners">
    <slot></slot>
  </v-tabs>
</template>


<script>
  import omit from 'object.omit';
  import { VTabs } from '@suning/v-tabs';
  import { buildComponentName, isFlexSupported } from '../utils';

  export default {
    name: buildComponentName('Tabs'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-tabs',
      },
      type: {
        type: String,
        default: 'line',
        validator(val) {
          return ['line', 'card'].indexOf(val) > -1;
        },
      },
      editable: Boolean,
      size: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'large', 'small'].indexOf(val) > -1;
        },
      },
      tabPosition: {
        type: String,
        default: 'top',
        validator(val) {
          return ['top', 'left', 'right', 'bottom'].indexOf(val) > -1;
        },
      },
      value: String,
      animated: Boolean,
      theme: {
        type: String,
        default: 'light',
      },
    },
    computed: {
      isSupportFlex() {
        return isFlexSupported();
      },
      bindProps() {
        return omit(this.$props, ['theme', 'tabPosition', 'type', 'animated']);
      },
      classes() {
        const {
          prefixCls, type, tabPosition, size, theme, isSupportFlex
        } = this;
        return {
          [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
          [`${prefixCls}-${size}`]: !!size,
          [`${prefixCls}-${type}`]: true,
          [`${prefixCls}-${theme}`]: true,
          'no-flex': !isSupportFlex,
        };
      },
      isAnimated() {
        const { animated, type } = this;
        return animated || type === 'line';
      },
    },
    components: {
      VTabs,
    },
  };
</script>
