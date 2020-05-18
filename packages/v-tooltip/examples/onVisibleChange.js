import Vue from 'vue';

import '@cloud-sn/v-tooltip/css/bootstrap.scss';

import Tooltip from '@cloud-sn/v-tooltip';

const vm = new Vue({
  el: '#app',
  data: {
    visible: false,
    disabled: true,
    popupVisible: true,
  },
  created() {
    setTimeout(() => {
      this.disabled = false;
      this.popupVisible = true;
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
