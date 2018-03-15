import Vue from 'vue';
import Router from 'vue-router';
import UxModal from '@suning/uxcool/es/modal';

import store from '../store';
import { UPDATE_NAV_PAGE_INDEX, CHANGE_PAGE_NAME } from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
  routes: store.getters.routes,
});

router.beforeEach((to, from, next) => {
  store.commit(UPDATE_NAV_PAGE_INDEX, to.meta.pos);
  UxModal.destroy();
  next();
});

// router.afterEach((to) => {
//   document.title = to.meta.title || 'UXCool';
//   window.scrollTo(0, 0);
// });

router.afterEach(({ meta = {} }) => {
  const { title, subTitle = '' } = meta;

  document.title = title ? `${title}${subTitle ? ' ' : ''}${subTitle}` : 'UXCool Vue组件';
  store.commit(CHANGE_PAGE_NAME, `pgtitle=vue组件-${subTitle || title}`);
  window.scrollTo(0, 0);

  /* eslint-disable no-underscore-dangle */
  // 这边埋点函数会读取dom 所以要延迟一下
  Vue.nextTick(() => {
    const fromUrl = window._getFromUrl();
    const toUrl = window._getToUrl();
    window._ssaSendPvData(fromUrl, toUrl, document.title);
  });
  /* eslint-enable no-underscore-dangle */
});

export default router;
