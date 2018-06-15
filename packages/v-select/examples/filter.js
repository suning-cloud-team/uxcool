import Vue from 'vue';

import '@suning/v-select/css/index.scss';

import VSelect, { VOption, VOptionGroup } from '@suning/v-select';

function mock(label, cnt = 10) {
  return Array(cnt)
    .fill(label)
    .map((v, i) => ({ value: i, label: `label-${v}${i}` }));
}
const vm = new Vue({
  el: '#app',
  components: {
    VSelect,
    VOption,
    VOptionGroup,
  },
  data: {
    options: mock('测试', 20),
    dropdownMenuStyle: {
      maxHeight: '200px',
      overflow: 'auto',
    },
  },
  created() {},
  methods: {
    filterOption(input, option) {
      return option.label.indexOf(input) > -1;
    },
    onSelect(...args) {
      console.log('on-select', ...args);
    },
    onDeselect(...args) {
      console.log('on-deselect', ...args);
    },
    onChange(...args) {
      console.log('on-change', args);
    },
    onFocus() {
      console.log('on-focus');
    },
  },
});
