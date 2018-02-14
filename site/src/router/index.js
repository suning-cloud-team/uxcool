import Vue from 'vue';
import Router from 'vue-router';
import UxModal from '@suning/uxcool/es/modal';

import store from '../store';
import { UPDATE_NAV_PAGE_INDEX } from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
  routes: store.getters.routes,
});

router.beforeEach((to, from, next) => {
  store.commit(UPDATE_NAV_PAGE_INDEX, to.meta.pos);
  UxModal.destroy();
  next();
});

router.afterEach((to) => {
  document.title = to.meta.title || 'UXCool';
  window.scrollTo(0, 0);
});

export default router;
