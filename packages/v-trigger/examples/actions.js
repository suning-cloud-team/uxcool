import Vue from 'vue';

import Trigger from '@suning/v-trigger';
import '@suning/v-trigger/css/index.scss';

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

const placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  topCenter: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
};

const vm = new Vue({
  el: '#app',
  components: {
    Trigger,
  },
  data() {
    return {
      actions: ['hover'],
      disabled: false,
      placements,
    };
  },
  created() {
    setTimeout(() => {
      this.disabled = false;
      this.actions = ['click'];
    }, 2000);
  },
  methods: {
    onMouseEnter() {
      console.log('mouse enter');
    },
    onMouseDown() {
      console.log('mouse down');
    },
    onClick(e) {
      console.log('click', e.type);
    },
  },
});
