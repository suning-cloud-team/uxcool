import Vue from 'vue';

import '@suning/v-select/css/index.scss';

import VSelect, { VOption, VOptionGroup } from '@suning/v-select';

function mock(label, cnt = 10) {
  return Array(cnt)
    .fill(label)
    .map((v, i) => ({ value: i, label: `${v}${i}` }));
}
const vm = new Vue({
  el: '#app',
  data: {},
  components: {
    VSelect,
    VOption,
    VOptionGroup,
  },
});
