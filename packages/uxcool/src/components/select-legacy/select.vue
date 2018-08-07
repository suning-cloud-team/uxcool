<template>
  <v-select v-bind="$props"
            v-on="$listeners">
    <slot />
  </v-select>
</template>


<script>
  import VSelect from '@suning/v-select';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Select'),
    components: {
      VSelect,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-select',
      },
      value: {
        type: [String, Number, Array],
        default: '',
      },
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
      disabled: {
        type: Boolean,
        default: false,
      },
      allowClear: {
        type: Boolean,
        default: false,
      },
      showSearch: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '',
      },
      showArrow: {
        type: Boolean,
        default: true,
      },
      dropdownMatchSelectWidth: {
        type: Boolean,
        default: true,
      },
      dropdownMenuStyle: {
        type: [Array, Object],
        default: undefined,
      },
      getContainer: {
        type: Function,
        default: null,
      },
      filterOption: {
        type: Function,
        default: null,
      },
    },
  };
</script>
