import Vue from 'vue';
// eslint-disable-next-line
import Uxcool from '@suning/uxcool/es/index';
// eslint-disable-next-line
import UxcoolExtra from '@suning/uxcool/es/extra/index';

import uxDemo from './components/Demo.vue';
import uxCode from './components/Code.vue';
import uxHeading from './components/AnchoredHeading.vue';
import {
  Chrome
} from 'vue-color';

import VueClipboard from './directives/clipboard';

Vue.use(Uxcool);
Vue.use(UxcoolExtra);
Vue.use(VueClipboard);

Vue.component('uxDemo', uxDemo);
Vue.component('uxCode', uxCode);
Vue.component('uxHeading', uxHeading);
Vue.component('chrome-picker', Chrome);
