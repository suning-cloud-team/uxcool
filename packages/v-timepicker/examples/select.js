import Vue from 'vue';

import '@suning/v-timepicker/css/index.scss';
import VSelect from '@suning/v-timepicker/src/select.vue';

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  data: {
    list: [1, 2, 3, 4, 5, 6, 7, 8].map(v => ({ value: v })),
    selectedIndex: 3,
  },
  created() {
    setTimeout(() => {
      this.selectedIndex = 1;
      // this.list = [11, 22, 33, 44, 55, 66, 77].map(v => ({ value: v }));
    }, 2000);
    setTimeout(() => {
      // this.selectedIndex = 6;
    }, 3000);
  },
  components: {
    VSelect,
  },
});
