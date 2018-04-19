import Vue from 'vue';

import '@suning/v-select/css/index.scss';

import VSelect, { VOption, VOptionGroup } from '@suning/v-select';

const vm = new Vue({
  el: '#app',
  components: {
    VSelect,
    VOption,
    VOptionGroup,
  },
  data: {},
  methods: {
    getContainer() {
      return this.$refs.selectRef;
    },
  },
});
