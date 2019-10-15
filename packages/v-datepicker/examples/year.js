import Vue from 'vue';
import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import { VMonthYearDecadePicker } from '@suning/v-datepicker';

// import Pikcer from '@suning/v-datepicker/picker.vue';
const vm = new Vue({
  el: '#app',
  components: {
    VMonthYearDecadePicker,
  },
  data: {
    disabled: false,
    value: null,
  },
  created() {},
  methods: {
    onChange(val) {
      console.log('onChange', val);
      this.value = val;
    },
    onPanelChange(...args) {
      console.log('onPanelChange', ...args);
    },
    onOpenChange(visible) {
      console.log('onOpenChange', visible);
    },
  },
});
