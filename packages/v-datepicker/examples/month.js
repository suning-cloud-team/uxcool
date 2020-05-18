import Vue from 'vue';
import { addMonths, subDays } from 'date-fns';
import '@cloud-sn/v-datepicker/css/index.scss';
import '@cloud-sn/v-timepicker/assets/index.css';
import { VMonthPicker } from '@cloud-sn/v-datepicker';

// import Pikcer from '@cloud-sn/v-datepicker/picker.vue';
const vm = new Vue({
  el: '#app',
  components: {
    VMonthPicker,
  },
  data: {
    formatValue: '',
    disabled: false,
    value: null,
  },
  created() {},
  methods: {
    onChange(value) {
      console.log(value, 'value');
      this.formatValue = value;
    },
    onOk(value) {
      console.log('onok', value);
    },
    onOpenChange(visible) {
      console.log('onOpenChange', visible);
    },
  },
});
