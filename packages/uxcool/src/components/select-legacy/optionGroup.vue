<template>
  <v-option-group v-bind="$props">
    <slot></slot>
  </v-option-group>
</template>


<script>
  import { VOptionGroup } from '@suning/v-select';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('OptionGroup'),
    props: {
      label: { type: String, required: true },
    },
    components: {
      VOptionGroup,
    },
  };
</script>
