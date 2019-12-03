import Vue from 'vue';
import '@suning/v-datepicker/css/index.scss';
import MultiCalendar from '@suning/v-datepicker/src/multiCalendar';
import localeCN from '@suning/v-datepicker/src/locale/zh_CN';

const vm = new Vue({
  components: {
    MultiCalendar,
  },
  data() {
    return {
      val1: '',
      locale: localeCN,
    };
  },
});
vm.$mount('#app');
