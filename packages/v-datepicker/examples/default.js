import Vue from 'vue';
import { addMonths, subDays } from 'date-fns';
import '@cloud-sn/v-datepicker/css/index.scss';
import '@cloud-sn/v-timepicker/assets/index.css';
import DatePicker, { noop } from '@cloud-sn/v-datepicker';

// import Pikcer from '@cloud-sn/v-datepicker/picker.vue';
console.log(DatePicker, noop);
const vm = new Vue({
  el: '#app',
  data: {
    formatValue: '',
    disabled: false,
    now: subDays(addMonths(new Date(), 2), 10),
    pickerInputClass: {
      'v-input': true,
      'v-calendar-picker-input': true,
    },
  },
  created() {
    setTimeout(() => {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1500);
    }, 1500);
  },
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
  components: {
    DatePicker,
  },
});
