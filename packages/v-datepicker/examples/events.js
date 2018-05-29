import Vue from 'vue';

import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import VDatePicker, { VRangeDatePicker } from '@suning/v-datepicker';
import { isBefore } from 'date-fns';

const vm = new Vue({
  el: '#app',
  components: {
    VRangeDatePicker,
    VDatePicker,
  },
  data: {
    formatValue: '',
    disabled: false,
    pickerInputClass: {
      'v-input': true,
      'v-calendar-picker-input': true,
    },
    selectedValues: [],
    calendarValues: [],
  },
  methods: {
    onClear() {
      this.selectedValues = [];
    },
    onOk(values) {
      console.log('on-ok', values);
    },
    onChange(values, dateString) {
      // this.formatValue = values;
      // this.selectedValues = values;
      console.log('on-change', values, dateString);
    },
    onCalendarChange(values) {
      this.calendarValues = values;
      console.log('onCalendarChange', values);
    },
    onOpenChange(visible) {
      console.log('open-change', visible);
    },
    disabledDate(current) {
      const { calendarValues: [start] } = this;

      return isBefore(current, start);
    },
    disabledTime(value, type) {
      if (type === 'start') {
        return {
          disabledHours() {
            return [4, 7, 23];
          },
          disabledMinutes() {
            return [55, 56, 59, 1];
          },
          disabledSeconds() {
            return [20, 55, 56, 59, 1];
          },
        };
      }

      return {
        disabledHours() {
          return [10, 13, 17, 22, 23];
        },
        disabledMinutes() {
          return [20, 23, 25, 26];
        },
        disabledSeconds() {
          return [30, 43, 35, 26];
        },
      };
    },
  },
});
