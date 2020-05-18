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
      min: 20,
      max: 250,
      marks: {
        '-10': '-10°C',
        0: <strong>0°C</strong>,
        26: '26°C',
        37: '37°C',
        50: '50°C',
        100: {
          style: {
            color: 'red',
          },
          label: <strong>100°C</strong>,
        },
      },
    };
  },
  methods: {
    onChange(v) {
      console.log('marks', v);
    },
  },
});
