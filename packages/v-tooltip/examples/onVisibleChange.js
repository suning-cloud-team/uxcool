import Vue from 'vue';

import '@suning/v-tooltip/css/bootstrap.scss';

import Tooltip from '@suning/v-tooltip';

const vm = new Vue({
  el: '#app',
  data: {
    visible: false,
    disabled: true,
  },
  created() {
    setTimeout(() => {
      this.disabled = false;
    }, 2500);
  },
  methods: {
    onVisibleChange(visible) {
      this.visible = visible;
    },
  },
  components: {
    Tooltip,
  },
});
