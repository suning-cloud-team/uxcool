import Vue from 'vue';
import '@suning/v-slider/css/index.scss';

import VSlider from '@suning/v-slider';

const vm = new Vue({
  el: '#app',
  components: {
    VSlider,
    VSliderRange: VSlider.Range,
  },
  data() {
    return {
      value: [],
    };
  },
  created() {},
  methods: {
    onChange(v) {
      console.log(v);
    },
  },
});
