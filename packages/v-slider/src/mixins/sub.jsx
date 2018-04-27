export default {
  inject: ['sliderRoot'],
  computed: {
    prefixCls() {
      return this.sliderRoot.prefixCls;
    },
    marks() {
      return this.sliderRoot.marks;
    },
    dots() {
      return this.sliderRoot.dots;
    },
    included() {
      return this.sliderRoot.included;
    },
    min() {
      return this.sliderRoot.min;
    },
    max() {
      return this.sliderRoot.max;
    },
    vertical() {
      return this.sliderRoot.vertical;
    },
    step() {
      return this.sliderRoot.step;
    },
    dotStyle() {
      return this.sliderRoot.dotStyle;
    },
    activeDotStyle() {
      return this.sliderRoot.activeDotStyle;
    },
  },
  methods: {
    calcOffset(val) {
      return this.sliderRoot.calcOffset(val);
    },
  },
};
