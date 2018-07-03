<template>
  <div :class="clazz"
       :style="style">
    <slot />
  </div>
</template>


<script>
  import { buildComponentName } from '../utils';

  const name = buildComponentName('Row');
  const prefixCls = 'ux-row';

  export default {
    name,
    componentName: 'UxRow',
    provide() {
      return {
        rowRoot: this,
      };
    },
    props: {
      gutter: {
        type: Number,
        default: 0,
      },
      flex: {
        type: Boolean,
        default: false,
      },
      align: {
        validator(value) {
          return ['top', 'middle', 'bottom'].indexOf(value) > -1;
        },
      },
      justify: {
        validator(value) {
          return ['start', 'center', 'end', 'space-around', 'space-between'].indexOf(value) > -1;
        },
      },
    },
    computed: {
      clazz() {
        return {
          [`${prefixCls}`]: !this.flex,
          [`${prefixCls}-flex`]: this.flex,
          [`${prefixCls}-flex-${this.align}`]: this.align,
          [`${prefixCls}-flex-${this.justify}`]: this.justify,
        };
      },
      style() {
        let style = null;

        if (this.gutter !== 0) {
          style = {
            marginLeft: `${this.gutter / -2}px`,
            marginRight: `${this.gutter / -2}px`,
          };
        }

        return style;
      },
    },
  };
</script>
