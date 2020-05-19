import Vue from 'vue';

import Align from '@cloud-sn/v-align';

Vue.config.productionTip = false;

Vue.component('BA', {
  render(h) {
    console.log('default', this.$slots.default);
    return h('div', [this.$slots.default, '测试']);
  },
});

const vm = new Vue({
  el: '#app',
  data() {
    return {
      sHAlign: 't',
      sVAlign: 'l',
      tHAlign: 't',
      tVAlign: 'l',
      monitor: false,
      alignHArr: ['t', 'b', 'c'],
      alignVArr: ['c', 'l', 'r'],
      monitorBufferTime: 50,
      disabled: false,
    };
  },
  computed: {
    points() {
      const {
        sHAlign, sVAlign, tHAlign, tVAlign
      } = this;
      return [`${sHAlign}${sVAlign}`, `${tHAlign}${tVAlign}`];
    },
    align() {
      const { points } = this;
      return {
        useCssTransform: true,
        points,
      };
    },
  },
  methods: {
    changeH(e) {
      console.log(e.target.value);
    },
    getTarget() {
      return this.$refs.wrapper;
    },
    onAlign(e) {
      console.log('onAlign', e);
    },
  },
  components: {
    Align,
  },
});
