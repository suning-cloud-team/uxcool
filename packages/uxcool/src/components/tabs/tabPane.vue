<template>
  <v-tab-pane v-bind="$props"
              v-on="$listeners">
    <template slot="tab">
      <slot name="tab" />
    </template>
    <slot />
  </v-tab-pane>
</template>


<script>
  import { VTabPane } from '@cloud-sn/v-tabs';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('TabPane'),
    components: {
      VTabPane,
    },
    isTabPane: true,
    props: {
      name: {
        type: String,
        required: true,
      },
      tab: String,
      disabled: Boolean,
      closable: Boolean,
    },
  };
</script>
