<template>
  <div :class="[classes,{[`${prefixCls}-with-text`]: $slots.default}]">
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
        validate(val) {
          return ['horizontal', 'vertical'].indexOf(val) > -1;
        },
      },
      dashed: {
        type: Boolean,
        default: false,
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
