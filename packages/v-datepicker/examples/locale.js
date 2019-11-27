import Vue from 'vue';

import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import VDatePicker from '@suning/v-datepicker';
import { isBefore } from 'date-fns';
import localeEN from '@suning/v-datepicker/es/locale/en_US';
import localeCN from '@suning/v-datepicker/es/locale/zh_CN';
import DateFnsLocaleEN from 'date-fns/locale/en';
import DateFnsLocaleCN from 'date-fns/locale/zh_cn';

const vm = new Vue({
  el: '#app',
  components: {
    VDatePicker,
  },
  data: {
    formatValue: '',
    pickerInputClass: {
      'v-input': true,
      'v-calendar-picker-input': true,
    },
    localeCN: {
      WeekLocale: {
        weekStartsOn: 1,
        /* Monday */
        firstWeekContainsDate: 4,
      },
      ...localeCN,
      DateFnsLocale: DateFnsLocaleCN,
    },
    localeEN: {
      WeekLocale: {
        weekStartsOn: 0,
        /* Sunday */
        firstWeekContainsDate: 1,
      },
      ...localeEN,
      DateFnsLocale: DateFnsLocaleEN,
    },
  },
  methods: {},
});
