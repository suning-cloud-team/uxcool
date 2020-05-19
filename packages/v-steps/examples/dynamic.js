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
let seed = 3;
const vm = new Vue({
  el: '#app',
  data: {
    rows: [
      {
        title: 'row1',
        desc: '这是内容1'.repeat(1),
      },
      {
        title: 'row2',
        desc: '这是内容2'.repeat(2),
      },
      {
        title: 'row3',
        desc: '这是内容3'.repeat(3),
      },
    ],
  },
  methods: {
    add() {
      seed += 1;
      const idx = seed;
      this.rows.push({
        title: `row${idx}`,
        desc: `这是内容${idx}`.repeat(idx),
      });
    },
    remove() {
      const { rows } = this;
      const idx = Math.floor(Math.random() * rows.length);
      this.rows.splice(idx, 1);
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
