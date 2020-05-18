import Vue from 'vue';
import '@cloud-sn/v-datepicker/css/index.scss';
import MultiCalendar from '@cloud-sn/v-datepicker/src/multiCalendar';
import localeCN from '@cloud-sn/v-datepicker/src/locale/zh_CN';

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
