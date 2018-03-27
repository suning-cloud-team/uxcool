import Vue from 'vue';
import Router from 'vue-router';
import UxModal from '@suning/uxcool/src/components/modal';
import Badge from './views/badge/index';
import Input from './views/input/index';
import Tooltip from './views/tooltip/index';
import Popover from './views/popover/index';
import Pagination from './views/pagination/index';
import Menu from './views/menu/index';
import Select from './views/select/index';
import DatePicker from './views/datepicker/index';
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
import Table from './views/table/index';
import Dropdown from './views/dropdown/index';
import Divider from './views/divider/index';
import Tag from './views/tag/index';
import Switch from './views/switch/index';
import Alert from './views/alert/index';
import Slider from './views/slider/index';

Vue.use(Router);
const routes = [
  {
    name: 'Badge',
    path: '/badge',
    component: Badge,
  },
  {
    name: 'Input',
    path: '/input',
    component: Input,
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
    component: Menu,
  },
  {
    name: 'Select',
    path: '/select',
    component: Select,
  },
  {
    name: 'DatePicker',
    path: '/datePicker',
    component: DatePicker,
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
    component: Table,
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
