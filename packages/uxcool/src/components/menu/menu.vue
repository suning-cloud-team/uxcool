<template>
  <v-menu v-bind="$props"
          v-on="$listeners">
    <slot></slot>
  </v-menu>
</template>


<script>
  import VMenu from '@suning/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Menu'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-menu',
      },
      theme: String,
      mode: String,
      inlineIndent: Number,
      selectedKeys: Array,
      openKeys: Array,
      visible: { type: Boolean, default: true },
      uniqueOpened: Boolean,
    },
    data() {
      return {
        isWrap: true,
      };
    },
    components: {
      VMenu,
    },
  };
</script>
