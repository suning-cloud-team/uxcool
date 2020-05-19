import Vue from 'vue';
import VCheckbox from '@cloud-sn/v-checkbox';
import '@cloud-sn/v-checkbox/css/normalize.css';
import '@cloud-sn/v-checkbox/css/index.scss';

const vm = new Vue({
  el: '#app',

  components: {
    VCheckbox,
  },
  data: {
    checked: false,
    readonlyChecked: false,
    radioChecked: false,
  },
  methods: {
    onChange(e) {
      console.log('target', e);
    },
    onReadonlyChange(e) {
      console.log('readonly change', e);
    },
  },
});
