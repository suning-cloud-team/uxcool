<template>
  <v-textarea v-bind="bindProps"
              v-on="$listeners"
              :class="`${prefixCls}-${theme}`" />
</template>


<script>
  import omit from 'object.omit';
  import { VTextarea } from '@suning/v-input';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Textarea'),
    components: {
      VTextarea,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-input',
      },
      autoSize: {
        type: [Boolean, Object],
        default() {
          return false;
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '',
      },
      theme: {
        type: String,
        default: 'light',
      },
    },
    computed: {
      bindProps() {
        return omit(this.$props, ['theme']);
      },
    },
  };
</script>
