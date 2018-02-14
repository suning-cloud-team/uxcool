import Vue from 'vue';

import Trigger from '@suning/v-trigger';
import '@suning/v-trigger/css/index.scss';

Vue.component('AB', {
  render(h) {
    return h('div', ['this is ab component']);
  },
});

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

const placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
};

const vm = new Vue({
  el: '#app',
  data() {
    return {
      inputDisabled: false,
      placements,
      placement: 'right',
    };
  },
  created() {
    setTimeout(() => {
      this.inputDisabled = true;
    }, 2000);
  },
  methods: {
    onTriggerClick(e) {
      console.log('trigger', e.type);
    },
    onClick(e) {
      console.log('a-b default click', e.type);
    },
  },
  components: {
    Trigger,
  },
});
