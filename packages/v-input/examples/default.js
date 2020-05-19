import Vue from 'vue';

import '@cloud-sn/v-input/css/index.scss';
import { VTextarea } from '@cloud-sn/v-input';

const vm = new Vue({
  el: '#app',
  data: {
    // value: 'abc\n123123\n1231231231231231231\n123123',
    value: '',
  },
  created() {
    setTimeout(() => {
      // this.value = 'cccc\n123123';
    }, 1600);
  },
  methods: {
    onChange(e) {
      // this.value = e.target.value;
      console.log(e.target.value);
    },
  },
  components: {
    VTextarea,
  },
});
