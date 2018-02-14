import Vue from 'vue';

import '@suning/v-steps/css/index.scss';
import '@suning/v-steps/css/iconfont.scss';

import { VSteps, VStep } from '@suning/v-steps';

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
    steps: [],
    current: -1,
  },
  created() {
    this.steps = Array(Math.floor(Math.random() * 5) + 3)
      .fill(0)
      .map((v, i) => ({ title: `步骤${i + 1}` }));

    this.current = Math.floor(Math.random() * this.steps.length);
  },
  methods: {
    prev() {
      const { current, steps } = this;
      const next = current - 1;
      this.current = next < 0 ? next + steps.length : next;
    },
    next() {
      const { current, steps } = this;
      const next = current + 1;
      this.current = next % steps.length;
    },
  },
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
