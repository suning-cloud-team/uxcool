import Vue from 'vue';
import Router from 'vue-router';
import UxModal from '@suning/uxcool/src/components/modal';
import Tooltip from './views/tooltip/index';
import Popover from './views/popover/index';
import Pagination from './views/pagination/index';
import Spin from './views/spin/index';
import Steps from './views/steps/index';
import Tabs from './views/tabs/index';
import Button from './views/button/index';
import Modal from './views/modal/index';
import Message from './views/message/index';
import Grid from './views/grid/index';
import Breadcrumb from './views/breadcrumb/index';
import Icon from './views/icon/index';
import Progress from './views/progress/index';
import Card from './views/card/index';
import Checkbox from './views/checkbox/index';
import Radio from './views/radio/index';
import Dropdown from './views/dropdown/index';
import Divider from './views/divider/index';
import Tag from './views/tag/index';
import Switch from './views/switch/index';
import Alert from './views/alert/index';
import Slider from './views/slider/index';
import BackTop from './views/backtop/index';
import Avatar from './views/avatar/index';
import Popconfirm from './views/popconfirm/index';
import InputNumber from './views/input-number/index';
import Notification from './views/notification/index';
import Anchor from './views/anchor/index';
import Transfer from './views/transfer/index';
import Rate from './views/rate/index';
import Affix from './views/affix/index';
import Box from './views/box/index';

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
    component: Tooltip,
  },
  {
    name: 'Popover',
    path: '/popover',
    component: Popover,
  },
  {
    name: 'Pagination',
    path: '/pagination',
    component: Pagination,
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
    name: 'Spin',
    path: '/spin',
    component: Spin,
  },
  {
    name: 'Steps',
    path: '/steps',
    component: Steps,
  },
  {
    name: 'Tabs',
    path: '/tabs',
    component: Tabs,
  },
  {
    name: 'Button',
    path: '/button',
    component: Button,
  },
  {
    name: 'Modal',
    path: '/modal',
    component: Modal,
  },
  {
    name: 'Message',
    path: '/message',
    component: Message,
  },
  {
    name: 'Grid',
    path: '/grid',
    component: Grid,
  },
  // {
  //   name: 'Chart',
  //   path: '/chart',
  //   component: () => import('./views/chart/index'),
  // },
  {
    name: 'Breadcrumb',
    path: '/breadcrumb',
    component: Breadcrumb,
  },
  {
    name: 'Icon',
    path: '/icon',
    component: Icon,
  },
  {
    name: 'Progress',
    path: '/progress',
    component: Progress,
  },
  {
    name: 'Card',
    path: '/card',
    component: Card,
  },
  {
    name: 'Checkbox',
    path: '/checkbox',
    component: Checkbox,
  },
  {
    name: 'Radio',
    path: '/radio',
    component: Radio,
  },
  {
    name: 'Table',
    path: '/table',
    component: () => import('./views/table/index'),
  },
  {
    name: 'Dropdown',
    path: '/dropdown',
    component: Dropdown,
  },
  {
    name: 'Divider',
    path: '/divider',
    component: Divider,
  },
  {
    name: 'Tag',
    path: '/tag',
    component: Tag,
  },
  {
    name: 'Switch',
    path: '/switch',
    component: Switch,
  },
  {
    name: 'Alert',
    path: '/alert',
    component: Alert,
  },
  {
    name: 'Slider',
    path: '/slider',
    component: Slider,
  },
  {
    name: 'Form',
    path: '/form',
    component: () => import('./views/form/index'),
  },
  {
    name: 'BackTop',
    path: '/backtop',
    component: BackTop,
  },
  {
    name: 'Avatar',
    path: '/avatar',
    component: Avatar,
  },
  {
    name: 'Popconfirm',
    path: '/popconfirm',
    component: Popconfirm,
  },
  {
    name: 'InputNumber',
    path: '/inputnumber',
    component: InputNumber,
  },
  {
    name: 'Notification',
    path: '/notification',
    component: Notification,
  },
  {
    name: 'Anchor',
    path: '/anchor',
    component: Anchor,
  },
  {
    name: 'Transfer',
    path: '/transfer',
    component: Transfer,
  },
  {
    name: 'Rate',
    path: '/rate',
    component: Rate,
  },
  {
    name: 'Affix',
    path: '/affix',
    component: Affix,
  },
  {
    name: 'Tree',
    path: '/tree',
    component: () => import('./views/tree/index'),
  },
  {
    name: 'Box',
    path: '/box',
    component: Box,
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
];

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  UxModal.destroy();
  next();
});
export { routes };
export default router;
