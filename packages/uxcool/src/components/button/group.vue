<template>
  <div :class="classes">
    <slot/>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  const sizeMapping = {
    small: 'sm',
    large: 'lg',
  };
  export default {
    name: buildComponentName('ButtonGroup'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-btn-group',
      },
      size: {
        type: String,
        default: 'default',
        validate(val) {
          return ['small', 'default', 'large'].indexOf(val) > -1;
        },
      },
    },
    computed: {
      sizeType() {
        const { size } = this;
        return sizeMapping[size];
      },
      classes() {
        const { prefixCls, sizeType } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${sizeType}`]: !!sizeType,
        };
      },
    },
  };
</script>
