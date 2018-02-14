<template>
  <v-option v-bind="$props">
    <slot></slot>
  </v-option>
</template>


<script>
  import { VOption } from '@suning/v-select';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Option'),
    props: {
      value: {
        type: [String, Number],
        required: true,
      },
      label: String,
      disabled: Boolean,
    },
    components: {
      VOption,
    },
  };
</script>
