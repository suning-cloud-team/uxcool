import Vue from 'vue';
import { addMonths, subDays, isBefore, startOfDay } from 'date-fns';
import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import DatePicker, { VRangeDatePicker } from '@suning/v-datepicker';

// import Pikcer from '@suning/v-datepicker/picker.vue';
const vm = new Vue({
  el: '#app',
  data: {
    values: [],
    formatValue: null,
    pickerInputClass: {
      'v-input': true,
      'v-calendar-picker-input': true,
    },
  },
  methods: {
    disabledDate(current) {
      return current && isBefore(current, startOfDay(subDays(new Date(), 3)));
    },
    disabledTime() {
      return {
        disabledHours() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 5);
        },
        disabledMinutes() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 10);
        },
        disabledSeconds() {
          return [25, 56];
        },
      };
    },
    disabledRangeTime(values, type) {
      if (type === 'start') {
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 1);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 2);
          },
          disabledSeconds() {
            return [20, 21];
          },
        };
      }
      return {
        disabledHours() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 5);
        },
        disabledMinutes() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 10);
        },
        disabledSeconds() {
          return [25, 56];
        },
      };
    },
    onChange(value) {
      console.log(value, 'value');
      this.formatValue = value;
    },
    onRangeChange(values) {
      this.values = values;
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
    VRangeDatePicker,
  },
});
