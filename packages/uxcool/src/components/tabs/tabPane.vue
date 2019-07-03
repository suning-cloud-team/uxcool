<template>
  <v-tab-pane v-bind="{...$props, tab: $slots.tab || $props.tab }"
              v-on="$listeners">
    <slot name="tab" />
    <slot />
  </v-tab-pane>
</template>


<script>
  import { VTabPane } from '@suning/v-tabs';
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
