import Vue from 'vue';

import '@suning/v-timepicker/css/index.scss';
import Combobox from '@suning/v-timepicker/src/combobox.vue';

function mock(n) {
  return Array(n)
    .fill(0)
    .map((v, i) => i);
}
const vm = new Vue({
  el: '#app',
  data: {
    hourOptions: [],
    minuteOptions: [],
    secondOptions: [],
    value: new Date(),
  },
  created() {
    this.hourOptions = mock(24);

    this.minuteOptions = mock(60);

    // this.secondOptions = mock(60);
  },
  methods: {
    onSelect(val) {
      this.value = val;
    },
  },
  components: {
    Combobox,
  },
});
