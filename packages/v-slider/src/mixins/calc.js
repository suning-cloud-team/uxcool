export default {
  methods: {
    getSliderStart() {
      const { sliderRef, vertical } = this;
      const sliderRect = sliderRef.getBoundingClientRect();
      return vertical ? sliderRect.top : sliderRect.left;
    },
    getSliderLength() {
      const { sliderRef, vertical } = this;
      const sliderRect = sliderRef.getBoundingClientRect();
      return vertical ? sliderRect.height : sliderRect.width;
    },
    calcValue(offset) {
      const {
        vertical, min, max, getSliderLength
      } = this;
      // percentage => value
      const ratio = Math.abs(Math.max(offset, 0) / getSliderLength());
      // from ant.design
      // eslint-disable-next-line
      return vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
    },
    calcValueByPos(position) {
      const { getSliderStart, calcValue, trimAlignValue } = this;
      const offset = position - getSliderStart();
      return trimAlignValue(calcValue(offset));
    },
    calcOffset(val) {
      const { min, max } = this;
      const ratio = (val - min) / (max - min);
      return ratio * 100;
    },
  },
};
