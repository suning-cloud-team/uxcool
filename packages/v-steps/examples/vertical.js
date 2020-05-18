import Vue from 'vue';

import '@cloud-sn/v-steps/css/index.scss';
import '@cloud-sn/v-steps/css/iconfont.scss';

import { VSteps, VStep } from '@cloud-sn/v-steps';

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
  data: {
    description: '这是内容'.repeat(10),
  },
  methods: {},
  components: {
    VSteps,
    VStep,
    AB: {
      render(h) {
        return h('a', '测试用');
      },
    },
  },
});
