import Vue from 'vue';
import '@cloud-sn/v-slider/css/index.scss';

import VSlider from '@cloud-sn/v-slider';

const vm = new Vue({
  el: '#app',
  components: {
    VSlider,
    VSliderRange: VSlider.Range,
  },
  methods: {
    onFocus() {
      console.log('focus');
    },
    focus() {
      const {
        $refs: { sliderRef, sliderRef1 },
      } = this;
      if (sliderRef) {
        sliderRef.focus();
        sliderRef1.focus();
      }
    },
    blur() {
      const {
        $refs: { sliderRef, sliderRef1 },
      } = this;
      if (sliderRef) {
        sliderRef.blur();
        sliderRef1.blur();
      }
    },
  },
});
