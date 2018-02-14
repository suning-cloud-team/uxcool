import Vue from 'vue';

import '@suning/v-select/css/index.scss';

import VSelect, {
  VOption,
  VOptionGroup
} from '@suning/v-select';

function mock(label, cnt = 10) {
  return Array(cnt)
    .fill(label)
    .map((v, i) => ({
      value: i,
      label: `${v}${i}`
    }));
}
const vm = new Vue({
  el: '#app',
  data: {
    options: mock('测试'),
    dropdownMenuStyle: {
      overflow: 'auto',
      maxHeight: '200px'
    }
  },
  created() {
    // setTimeout(() => {
    //   this.options = mock('after', 5);
    // }, 5500);
  },
  components: {
    VSelect,
    VOption,
    VOptionGroup,
  },
});
