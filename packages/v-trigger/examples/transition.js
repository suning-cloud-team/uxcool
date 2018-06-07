import Vue from 'vue';

import Trigger from '@suning/v-trigger';
import '@suning/v-trigger/css/index.scss';
import '@suning/uxcool/es/input/style/index.js';
import Input from '@suning/uxcool/es/input';

Vue.component('AB', {
  mounted() {
    console.log('mounted default=---<>', this.$slots.default);
  },
  render(h) {
    console.log('default=---<>', this.$slots.default);
    return h('div', [this.$slots.default]);
  },
});

const vm = new Vue({
  el: '#app',
  components: {
    Trigger,
    UxInput: Input,
  },
  data() {
    return {
      isShow: false,
      inputDisabled: false,
      input1: '',
      triggerText: 'abc',
      actions: ['hover'],
    };
  },
  methods: {
    onShow() {
      this.isShow = !this.isShow;
    },
    onTriggerClick(e) {
      console.log('trigger', e.type);
    },
    onClick(e) {
      console.log('a-b default click', e.type);
    },
    onFocus() {
      console.log('onFocus');
    },
    onBlur() {
      console.log('onBlur');
    },
  },
});
