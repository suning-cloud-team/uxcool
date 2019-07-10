import Vue from 'vue';
import Router from 'vue-router';
import UxModal from '@suning/uxcool/es/modal';
import NProgress from 'nprogress';

import store from '../store';
import { UPDATE_NAV_PAGE_INDEX, CHANGE_PAGE_NAME } from '../store/mutation-types';

Vue.use(Router);

const router = new Router({
  routes: store.getters.routes,
  // scrollBehavior({ path }, from) {
  //   // anchor组件滚动时会触发路由变化，这边硬编码anchor组件页面不滚动到顶部
  //   if (path.endsWith('anchor') && from.path === path) {
  //     return false;
  //   }

  //   return {
  //     x: 0,
  //     y: 0,
  //   };
  // },
});

NProgress.configure({
  minimum: 0.2,
  speed: 500,
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  store.commit(UPDATE_NAV_PAGE_INDEX, to.meta.pos);
  UxModal.destroy();

  NProgress.start();
  next();
});

router.afterEach(({ meta = {}, path }) => {
  const { title, subTitle = '' } = meta;

  document.title = title ? `${title}${subTitle ? ' ' : ''}${subTitle}` : 'UXCool Vue组件';
  store.commit(CHANGE_PAGE_NAME, `pgtitle=vue组件-${subTitle || title}`);
  NProgress.done();

  // anchor组件滚动页面时会触发路由切换，只能硬编码判断非锚点页面滚动至顶端了
  // if (!path.endsWith('anchor')) {
  //   window.scrollTo(0, 0);
  // }

  /* eslint-disable no-underscore-dangle */
  // 这边埋点函数会读取dom 所以要延迟一下
  // Vue.nextTick(() => {
  //   try {
  //     const fromUrl = window._getFromUrl();
  //     const toUrl = window._getToUrl();
  //     window._ssaSendPvData(fromUrl, toUrl, document.title);
  //   } catch (e) {
  //     console.error('小场面 不要慌 埋点脚本服务器连不上而已\n', e);
  //   }
  // });
  /* eslint-enable no-underscore-dangle */
});

export default router;
