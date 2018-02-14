import Vue from 'vue';

import '@suning/v-tooltip/css/bootstrap.scss';

import Tooltip from '@suning/v-tooltip';

function mock(label, cnt = 10) {
  return Array(cnt)
    .fill(label)
    .map((v, i) => ({
      value: i,
      label: `${v}${i}`,
    }));
}
const vm = new Vue({
  el: '#app',
  data: {},
  components: {
    Tooltip,
  },
});
