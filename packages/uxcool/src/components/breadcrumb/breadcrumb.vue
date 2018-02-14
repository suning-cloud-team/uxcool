<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Breadcrumb'),
    provide() {
      return {
        root: this,
      };
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-breadcrumb',
      },
      separator: {
        type: [String, Function],
        default: '>',
      },
      theme: {
        type: String,
        default: 'light',
      },
    },
    computed: {
      classes() {
        const { prefixCls, theme } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${theme}`]: true,
        };
      },
    },
  };
</script>
