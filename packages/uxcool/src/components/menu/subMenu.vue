<template>
  <v-sub-menu v-bind="$props"
              v-on="$listeners">
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
  </v-sub-menu>
</template>

<script>
  import { VSubMenu } from '@suning/v-menu';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('SubMenu'),
    components: {
      VSubMenu,
    },
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
  };
</script>
