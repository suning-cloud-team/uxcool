export default {
  inject: ['root'],
  computed: {
    prefixCls() {
      return this.root.prefixCls;
    },
    marks() {
      return this.root.marks;
    },
    dots() {
      return this.root.dots;
    },
    included() {
      return this.root.included;
    },
    min() {
      return this.root.min;
    },
    max() {
      return this.root.max;
    },
    vertical() {
      return this.root.vertical;
    },
    step() {
      return this.root.step;
    },
    dotStyle() {
      return this.root.dotStyle;
    },
    activeDotStyle() {
      return this.root.activeDotStyle;
    },
  },
  methods: {
    calcOffset(val) {
      return this.root.calcOffset(val);
    },
  },
};
