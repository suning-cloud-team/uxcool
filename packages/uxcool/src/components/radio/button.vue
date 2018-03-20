<template>
  <radio v-bind="[$attrs, $props]">
    <slot/>
  </radio>
</template>


<script>
  import { buildComponentName } from '../utils';
  import Radio from './radio.vue';

  export default {
    name: buildComponentName('RadioButton'),
    components: {
      Radio,
    },
    inheritAttrs: false,
    model: {
      prop: 'checked',
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-radio-button',
      },
      checked: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        required: true,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: null,
      },
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
    },
  };
</script>
