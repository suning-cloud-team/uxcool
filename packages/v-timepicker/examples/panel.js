import Vue from 'vue';
import '@suning/v-timepicker/css/index.scss';

import Panel from '@suning/v-timepicker/src/panel.vue';

const vm = new Vue({
  el: '#app',
  data: {
    value: new Date(),
    hideOnDisabledOpts: false,
  },
  created() {
    setTimeout(() => {
      this.hideOnDisabledOpts = true;
    }, 5000);
  },
  methods: {
    disabledHours() {
      return [2, 4, 7];
    },
    disabledMinutes() {
      return [10, 29];
    },
  },
  components: {
    Panel,
  },
});
