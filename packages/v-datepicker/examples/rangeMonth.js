import Vue from 'vue';
import '@cloud-sn/v-datepicker/css/index.scss';
import '@cloud-sn/v-timepicker/assets/index.css';
import { VRangeMonthYearDecadePicker } from '@cloud-sn/v-datepicker';

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
