<template>
  <v-menu v-bind="$props"
          v-on="$listeners">
    <slot />
  </v-menu>
</template>


<script>
  import VMenu from '@suning/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Menu'),
    components: {
      VMenu,
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
    },
    data() {
      return {
        isWrap: true,
      };
    },
  };
</script>
