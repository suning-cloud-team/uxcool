<template>
  <v-select v-bind="$props"
            v-on="$listeners">
    <slot></slot>
  </v-select>
</template>


<script>
  import VSelect from '@suning/v-select';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Select'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-select',
      },
      value: [String, Array],
      mode: {
        type: String,
        validator(val) {
          return ['multiple', 'default'].indexOf(val) > -1;
        },
        default: 'default',
      },
      theme: {
        type: String,
        default: 'light',
      },
      disabled: Boolean,
      allowClear: Boolean,
      showSearch: Boolean,
      placeholder: String,
      showArrow: {
        type: Boolean,
        default: true,
      },
      dropdownMatchSelectWidth: {
        type: Boolean,
      },
      dropdownMenuStyle: [Array, Object],
    },
    components: {
      VSelect,
    },
  };
</script>
