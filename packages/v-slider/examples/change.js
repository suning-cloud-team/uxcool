import Vue from 'vue';
import '@cloud-sn/v-slider/css/index.scss';

import VSlider from '@cloud-sn/v-slider';

const vm = new Vue({
  el: '#app',
  components: {
    VSlider,
    VSliderRange: VSlider.Range,
  },
  data() {
    return {
      value: 40,
      min: 0,
      max: 150,
      rangeValue: [20, 140],
    };
  },
  created() {
    setTimeout(() => {
      // this.value = 5;
      this.min = 20;
      this.max = 130;
      // this.rangeValue = [130, 20];
      // this.rangeValue.push(100);
    }, 4500);
  },
  methods: {
    onChange(v) {
      console.log(v);
    },
  },
});
