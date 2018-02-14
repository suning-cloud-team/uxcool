<template>
  <v-tab-pane v-bind="$props"
              v-on="$listeners">
    <template slot="tab">
      <slot name="tab"></slot>
    </template>
    <slot></slot>
  </v-tab-pane>
</template>


<script>
  import { VTabPane } from '@suning/v-tabs';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('TabPane'),
    props: {
      name: {
        type: String,
        required: true,
      },
      tab: String,
      disabled: Boolean,
      closable: Boolean,
    },
    components: {
      VTabPane,
    },
  };
</script>
