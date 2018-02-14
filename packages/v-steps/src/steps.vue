<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>


<script>
  import { isFlexSupported } from './utils';

  export default {
    name: 'Steps',
    provide() {
      return {
        root: this,
      };
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-steps',
      },
      iconPrefix: {
        type: String,
        default: 'vicon',
      },
      direction: { type: String, default: 'horizontal' },
      labelPlacement: { type: String, default: 'horizontal' },
      current: { type: [Number, String], default: 0 },
      status: { type: String, default: 'process' },
      size: String,
      progressDot: Boolean,
    },
    data() {
      return {
        descendants: [],
        isSupportFlex: isFlexSupported(),
        lastDescendantOffsetW: 0,
      };
    },
    computed: {
      classes() {
        const {
          prefixCls, direction, size, progressDot, labelPlacement
        } = this;
        const adjustLabelPlacement = progressDot ? 'vertical' : labelPlacement;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${direction}`]: true,
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-label-${adjustLabelPlacement}`]: direction === 'horizontal',
          [`${prefixCls}-dot`]: !!progressDot,
        };
      },
      normalizeCurrent() {
        const { current } = this;
        return Number.isNaN(Number(current)) ? 0 : Number(current);
      },
    },
    methods: {
      addDescendant(item) {
        this.descendants.push(item);
      },
      removeDescendant(item) {
        this.descendants = this.descendants.filter(v => v !== item);
      },
      updateLastDescendantOffsetW(width) {
        this.lastDescendantOffsetW = width;
      },
    },
    watch: {
      descendants() {
        const { descendants } = this;
        const len = descendants.length;
        this.descendants.forEach((v, i) => {
          const nv = v;
          nv.seq = i;
          nv.stepSize = len;
          nv.isLast = i === len - 1;
        });
      },
    },
  };
</script>
