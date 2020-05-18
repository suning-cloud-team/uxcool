import Vue from 'vue';
import '@cloud-sn/v-slider/css/index.scss';

import VSlider from '@cloud-sn/v-slider';

const vm = new Vue({
  el: '#app',
  components: {
    VSlider,
  },
  data() {
    return {
      value: 40,
      min: 20,
      max: 250,
    };
  },
  created() {
    setTimeout(() => {
      // this.value = 5;
      this.min = 50;
      this.max = 110;
    }, 2500);
  },
  methods: {
    onChange(v) {
      console.log(v);
    },
  },
});
