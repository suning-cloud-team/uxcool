import Vue from 'vue';
import { addMonths, subDays } from 'date-fns';
import '@cloud-sn/v-datepicker/css/index.scss';
import '@cloud-sn/v-timepicker/assets/index.css';
import { VFullCaleadar } from '@cloud-sn/v-datepicker';

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
