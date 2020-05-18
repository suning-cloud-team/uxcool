import Vue from 'vue';
import '@cloud-sn/v-datepicker/css/index.scss';
import '@cloud-sn/v-timepicker/assets/index.css';
import { VMonthYearDecadePicker } from '@cloud-sn/v-datepicker';

// import Pikcer from '@cloud-sn/v-datepicker/picker.vue';
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
