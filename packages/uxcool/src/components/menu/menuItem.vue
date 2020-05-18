<template>
  <v-menu-item v-bind="$props">
    <slot></slot>
  </v-menu-item>
</template>

<script>
  import { VMenuItem } from '@cloud-sn/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('MenuItem'),
    props: {
      name: String,
      disabled: Boolean,
    },
    data() {
      return {
        isWrap: true,
      };
    },
    components: {
      VMenuItem,
    },
  };
</script>
