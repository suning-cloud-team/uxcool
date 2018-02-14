<template>
  <v-steps v-bind="bindProps"
           :class="`${prefixCls}-${theme}`"
           v-on="$listeners">
    <slot></slot>
  </v-steps>
</template>


<script>
  import omit from 'object.omit';
  import { VSteps } from '@suning/v-steps';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Steps'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-steps',
      },
      iconPrefix: {
        type: String,
        default: 'fu',
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator(v) {
          return ['horizontal', 'vertical'].indexOf(v) > -1;
        },
      },
      labelPlacement: {
        type: String,
        default: 'horizontal',
        validator(v) {
          return ['horizontal', 'vertical'].indexOf(v) > -1;
        },
      },
      // start 0
      current: {
        type: [Number, String],
        default: 0,
      },
      status: {
        type: String,
        default: 'process',
        validator(v) {
          return ['wait', 'process', 'finish', 'error'].indexOf(v) > -1;
        },
      },
      size: {
        type: String,
        default: 'default',
        validator(v) {
          return ['small', 'default'].indexOf(v) > -1;
        },
      },
      progressDot: Boolean,
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
    components: {
      VSteps,
    },
  };
</script>
