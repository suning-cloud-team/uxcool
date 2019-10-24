import Vue from 'vue';
import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import { VRangeMonthYearDecadePicker } from '@suning/v-datepicker';

const vm = new Vue({
  components: {
    VRangeMonthYearDecadePicker,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onChange(val, ...args) {
      console.log('onChange', val, ...args);
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

vm.$mount('#app');
