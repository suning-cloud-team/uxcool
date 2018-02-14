import Vue from 'vue';
import Uxcool from '@suning/uxcool/es/index';
import UxcoolExtra from '@suning/uxcool/es/extra/index';

import uxDemo from './components/Demo.vue';
import uxCode from './components/Code.vue';
import uxHeading from './components/AnchoredHeading.vue';

Vue.use(Uxcool);
Vue.use(UxcoolExtra);

Vue.component('uxDemo', uxDemo);
Vue.component('uxCode', uxCode);
Vue.component('uxHeading', uxHeading);
