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
  data: {
    options: [],
    optionGroups: [
      {
        label: 'group1',
        options: mock('group1-', 2),
      },
      {
        label: 'group2',
        options: mock('group2-', 4),
      },
    ],
  },
  created() {
    setTimeout(() => {
      this.options = mock('options-', 1);
      this.optionGroups = [
        {
          label: 'group5',
          options: mock('group2-', 2),
        },
      ];
    }, 5500);
  },
  components: {
    VSelect,
    VOption,
    VOptionGroup,
  },
});
