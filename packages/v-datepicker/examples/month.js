import Vue from 'vue';
import { addMonths, subDays } from 'date-fns';
import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import { VMonthPicker } from '@suning/v-datepicker';

// import Pikcer from '@suning/v-datepicker/picker.vue';
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
