<template>
  <v-sub-menu v-bind="$props"
              v-on="$listeners">
    <slot></slot>
  </v-sub-menu>
</template>

<script>
  import { VSubMenu } from '@suning/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('SubMenu'),
    props: {
      name: String,
      title: String,
      disabled: Boolean,
    },
    data() {
      return {
        isWrap: true,
      };
    },
    components: {
      VSubMenu,
    },
  };
</script>
