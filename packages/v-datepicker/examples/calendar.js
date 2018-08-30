import Vue from 'vue';
import { addMonths, subDays } from 'date-fns';
import '@suning/v-datepicker/css/index.scss';
import '@suning/v-timepicker/assets/index.css';
import { VFullCaleadar } from '@suning/v-datepicker';

const vm = new Vue({
  el: '#app',
  components: {
    FullCalendar: VFullCaleadar,
  },
  data: {},
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
