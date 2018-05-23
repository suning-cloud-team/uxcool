<template>
  <div :class="[classes,{[`${prefixCls}-with-text${orientation ? `-${orientation}` : ''}`]: $slots.default}]">
    <span v-if="$slots.default"
          :class="`${prefixCls}-inner-text`">
      <slot/>
    </span>
  </div>
</template>


<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Divider'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-divider',
      },
      type: {
        type: String,
        default: 'horizontal',
        validator(val) {
          return ['horizontal', 'vertical'].indexOf(val) > -1;
        },
      },
      dashed: {
        type: Boolean,
        default: false,
      },
      orientation: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'left', 'right'].indexOf(val) > -1;
        },
      },
    },
    computed: {
      classes() {
        const { prefixCls, type, dashed } = this;

        return {
          [prefixCls]: true,
          [`${prefixCls}-${type}`]: true,
          [`${prefixCls}-dashed`]: dashed,
        };
      },
    },
  };
</script>
