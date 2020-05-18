<template>
  <v-menu-item-group v-bind="$props">
    <slot></slot>
  </v-menu-item-group>
</template>

<script>
  import { VMenuItemGroup } from '@cloud-sn/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('MenuItemGroup'),
    props: {
      title: String,
    },
    data() {
      return {
        isWrap: true,
      };
    },
    components: {
      VMenuItemGroup,
    },
  };
</script>
