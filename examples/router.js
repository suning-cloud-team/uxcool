import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line
import UxModal from '@suning/uxcool/src/components/modal';

Vue.use(Router);
const routes = [
  {
    name: 'Badge',
    path: '/badge',
    component: () => import('./views/badge/index'),
  },
  {
    name: 'Input',
    path: '/input',
    component: () => import('./views/input/index'),
  },
  {
    name: 'Tooltip',
    path: '/tooltip',
    component: () => import('./views/tooltip/index'),
  },
  {
    name: 'Popover',
    path: '/popover',
    component: () => import('./views/popover/index'),
  },
  {
    name: 'Pagination',
    path: '/pagination',
    component: () => import('./views/pagination/index'),
  },
  {
    name: 'Menu',
    path: '/menu',
    component: () => import('./views/menu/index'),
  },
  {
    name: 'Select',
    path: '/select',
    component: () => import('./views/select/index'),
  },
  {
    name: 'DatePicker',
    path: '/datePicker',
    component: () => import('./views/datepicker/index'),
  },
  {
    name: 'MultiDatePicker',
    path: '/multi-date-picker',
    component: () => import('./views/multi-date-picker/index'),
  },
  {
    name: 'Spin',
    path: '/spin',
    component: () => import('./views/spin/index'),
  },
  {
    name: 'Steps',
    path: '/steps',
    component: () => import('./views/steps/index'),
  },
  {
    name: 'Tabs',
    path: '/tabs',
    component: () => import('./views/tabs/index'),
  },
  {
    name: 'TabsTest',
    path: '/tabs-test',
    component: () => import('./views/tabs-test/index'),
  },
  {
    name: 'Button',
    path: '/button',
    component: () => import('./views/button/index'),
  },
  {
    name: 'Modal',
    path: '/modal',
    component: () => import('./views/modal/index'),
  },
  {
    name: 'Message',
    path: '/message',
    component: () => import('./views/message/index'),
  },
  {
    name: 'Grid',
    path: '/grid',
    component: () => import('./views/grid/index'),
  },
  {
    name: 'Breadcrumb',
    path: '/breadcrumb',
    component: () => import('./views/breadcrumb/index'),
  },
  {
    name: 'Icon',
    path: '/icon',
    component: () => import('./views/icon/index'),
  },
  {
    name: 'Progress',
    path: '/progress',
    component: () => import('./views/progress/index'),
  },
  {
    name: 'Card',
    path: '/card',
    component: () => import('./views/card/index'),
  },
  {
    name: 'Checkbox',
    path: '/checkbox',
    component: () => import('./views/checkbox/index'),
  },
  {
    name: 'Radio',
    path: '/radio',
    component: () => import('./views/radio/index'),
  },
  {
    name: 'Table',
    path: '/table',
    component: () => import('./views/table/index'),
  },
  {
    name: 'Dropdown',
    path: '/dropdown',
    component: () => import('./views/dropdown/index'),
  },
  {
    name: 'Divider',
    path: '/divider',
    component: () => import('./views/divider/index'),
  },
  {
    name: 'Tag',
    path: '/tag',
    component: () => import('./views/tag/index'),
  },
  {
    name: 'Switch',
    path: '/switch',
    component: () => import('./views/switch/index'),
  },
  {
    name: 'Alert',
    path: '/alert',
    component: () => import('./views/alert/index'),
  },
  {
    name: 'Slider',
    path: '/slider',
    component: () => import('./views/slider/index'),
  },
  {
    name: 'Form',
    path: '/form',
    component: () => import('./views/form/index'),
  },
  {
    name: 'BackTop',
    path: '/backtop',
    component: () => import('./views/backtop/index'),
  },
  {
    name: 'Avatar',
    path: '/avatar',
    component: () => import('./views/avatar/index'),
  },
  {
    name: 'Popconfirm',
    path: '/popconfirm',
    component: () => import('./views/popconfirm/index'),
  },
  {
    name: 'InputNumber',
    path: '/inputnumber',
    component: () => import('./views/input-number/index'),
  },
  {
    name: 'Notification',
    path: '/notification',
    component: () => import('./views/notification/index'),
  },
  {
    name: 'Anchor',
    path: '/anchor',
    component: () => import('./views/anchor/index'),
  },
  {
    name: 'Transfer',
    path: '/transfer',
    component: () => import('./views/transfer/index'),
  },
  {
    name: 'Rate',
    path: '/rate',
    component: () => import('./views/rate/index'),
  },
  {
    name: 'Affix',
    path: '/affix',
    component: () => import('./views/affix/index'),
  },
  {
    name: 'Tree',
    path: '/tree',
    component: () => import('./views/tree/index'),
  },
  {
    name: 'Box',
    path: '/box',
    component: () => import('./views/box/index'),
  },
  {
    name: 'Collapse',
    path: '/collapse',
    component: () => import('./views/collapse/index'),
  },
  {
    name: 'List',
    path: '/list',
    component: () => import('./views/list/index'),
  },
  {
    name: 'Timeline',
    path: '/timeline',
    component: () => import('./views/timeline/index'),
  },
  {
    name: 'Cascader',
    path: '/cascader',
    component: () => import('./views/cascader/index'),
  },
  {
    name: 'Timepicker',
    path: '/timepicker',
    component: () => import('./views/timepicker/index'),
  },
  {
    name: 'TreeSelect',
    path: '/treeselect',
    component: () => import('./views/tree-select/index'),
  },
  {
    name: 'AutoComplete',
    path: '/autocomplete',
    component: () => import('./views/auto-complete/index'),
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: () => import('./views/calendar/index'),
  },
  {
    name: 'Upload',
    path: '/upload',
    component: () => import('./views/upload/index'),
  },
  {
    name: 'CardAdvance',
    path: '/cardadvance',
    component: () => import('./views/card-advance/index'),
  },
  {
    name: 'Drawer',
    path: '/drawer',
    component: () => import('./views/drawer/index'),
  },
  {
    name: 'TreeBigData',
    path: '/treebigdata',
    component: () => import('./views/tree-big-data/index'),
  },
  // {
  //   name: 'Chart',
  //   path: '/chart',
  //   component: () => import('./views/chart/index'),
  // },
  {
    name: 'MultiCascader',
    path: '/multicascader',
    component: () => import('./views/multicascader/index.vue'),
  },
];

function compare(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}

routes.sort(compare);

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  UxModal.destroy();
  next();
});
export { routes };
export default router;
