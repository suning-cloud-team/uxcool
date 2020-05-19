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
