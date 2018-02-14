import Vue from 'vue';

import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import { VRangeDatePicker } from '@suning/v-datepicker';
import { subMonths, subDays, addMonths, subWeeks } from 'date-fns';

const vm = new Vue({
  el: '#app',
  data: {
    formatValue: '',
    disabled: false,
    pickerInputClass: {
      'v-input': true,
      'v-calendar-picker-input': true,
    },
    selectedValues: [],
    ranges: {
      今天: [new Date(), new Date()],
      昨天: [subDays(new Date(), 1), subDays(new Date(), 1)],
      最近一个月: [subMonths(new Date(), 1), new Date()],
      未来一个月: [new Date(), addMonths(new Date(), 1)],
      过去一周: [subWeeks(new Date(), 1), new Date()],
    },
    range1: {
      今天: [new Date()],
    },
    // range1: 'abc',
  },
  created() {
    // setTimeout(() => {
    //   this.disabled = false;
    // }, 2500);
  },
  methods: {
    onClear() {
      this.selectedValues = [];
    },
    onOk(values) {
      console.log('on-ok', values);
    },
    onChange(values) {
      this.formatValue = values;
      this.selectedValues = values;
      console.log('on-change', values);
    },
    onOpenChange(visible) {
      console.log('open-change', visible);
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
  components: {
    VRangeDatePicker,
  },
});
