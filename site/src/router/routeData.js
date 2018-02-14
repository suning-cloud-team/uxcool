import Layout from '@/views/Layout.vue';

import Install from '@/views/guide/install/index.vue';
import Start from '@/views/guide/start/index.vue';
import Theme from '@/views/guide/theme/index.vue';
import Grid from '@/views/components/grid/index.vue';
import Badge from '@/views/components/badge/index.vue';
import Chart from '@/views/components/chart/index.vue';
import Topo from '@/views/components/topology/index.vue';
import Input from '@/views/components/input/index.vue';
import Select from '@/views/components/select/index.vue';
import Menu from '@/views/components/menu/index.vue';
import Pagination from '@/views/components/pagination/index.vue';
import Popover from '@/views/components/popover/index.vue';
import Tooltip from '@/views/components/tooltip/index.vue';
import DatePicker from '@/views/components/datepicker/index.vue';
import Step from '@/views/components/step/index.vue';
import Spin from '@/views/components/spin/index.vue';
import Tabs from '@/views/components/tabs/index.vue';
import Card from '@/views/components/card/index.vue';
import Modal from '@/views/components/modal/index.vue';
import Message from '@/views/components/message/index.vue';
import Breadcrumb from '@/views/components/breadcrumb/index.vue';
import Icon from '@/views/components/icon/index.vue';
import Progress from '@/views/components/progress/index.vue';
import Table from '@/views/components/table/index.vue';

export const groups = {
  general: {
    name: 'General',
    sort: 0,
  },
  layout: {
    name: 'Layout',
    sort: 5,
  },
  nav: {
    name: 'Navigation',
    sort: 10,
  },
  form: {
    name: 'Form',
    sort: 15,
  },
  data: {
    name: 'Data',
    sort: 20,
  },
  notice: {
    name: 'Notice',
    sort: 25,
  },
  business: {
    name: 'Business',
    sort: 1000,
  },
  a: {
    name: 'A',
    sort: 1,
  },
};

export default [
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        name: 'install',
        path: 'install',
        meta: {
          title: '简介',
        },
        component: Install,
      },
      {
        name: 'start',
        path: 'start',
        meta: {
          title: '快速上手',
        },
        component: Start,
      },
      {
        name: 'theme',
        path: 'theme',
        meta: {
          title: '主题',
        },
        component: Theme,
      },
    ],
  },

  {
    path: '/components',
    component: Layout,
    children: [
      {
        name: 'grid',
        path: 'grid',
        meta: {
          title: 'Grid 栅格',
          group: 'layout',
        },
        component: Grid,
      },
      {
        name: 'badge',
        path: 'badge',
        meta: {
          title: 'Badge',
          subTitle: '徽章',
          group: 'data',
        },
        component: Badge,
      },
      {
        name: 'chart',
        path: 'chart',
        meta: {
          title: 'Chart',
          subTitle: '图表',
          group: 'business',
        },
        component: Chart,
      },
      {
        name: 'topo',
        path: 'topology',
        meta: {
          title: 'Topology',
          subTitle: '拓扑图',
          group: 'business',
        },
        component: Topo,
      },
      {
        name: 'input',
        path: 'input',
        meta: {
          title: 'Input',
          subTitle: '输入框',
          group: 'form',
        },
        component: Input,
      },
      {
        name: 'select',
        path: 'select',
        meta: {
          title: 'Select',
          subTitle: '下拉框',
          group: 'form',
        },
        component: Select,
      },
      {
        name: 'menu',
        path: 'menu',
        meta: {
          title: 'Menu',
          subTitle: '菜单',
          group: 'nav',
        },
        component: Menu,
      },
      {
        name: 'pagination',
        path: 'pagintaion',
        meta: {
          title: 'Pagination',
          subTitle: '分页',
          group: 'nav',
        },
        component: Pagination,
      },
      {
        name: 'popover',
        path: 'popover',
        meta: {
          title: 'Popover',
          subTitle: '悬浮框',
          group: 'notice',
        },
        component: Popover,
      },
      {
        name: 'tooltip',
        path: 'tooltip',
        meta: {
          title: 'Tooltip',
          subTitle: '工具提示',
          group: 'notice',
        },
        component: Tooltip,
      },
      {
        name: 'datepicker',
        path: 'datePicker',
        meta: {
          title: 'DatePicker',
          subTitle: '日期控件',
          group: 'form',
        },
        component: DatePicker,
      },
      {
        name: 'step',
        path: 'step',
        meta: {
          title: 'Step',
          subTitle: '步骤条',
          group: 'nav',
        },
        component: Step,
      },
      {
        name: 'spin',
        path: 'spin',
        meta: {
          title: 'Spin',
          subTitle: '加载动画',
          group: 'notice',
        },
        component: Spin,
      },
      {
        name: 'tabs',
        path: 'tabs',
        meta: {
          title: 'Tabs',
          subTitle: '标签页',
          group: 'nav',
        },
        component: Tabs,
      },
      {
        name: 'card',
        path: 'card',
        meta: {
          title: 'Card',
          subTitle: '卡片',
          group: 'business',
        },
        component: Card,
      },
      {
        name: 'modal',
        path: 'modal',
        meta: {
          title: 'Modal',
          subTitle: '模态框',
          group: 'notice',
        },
        component: Modal,
      },
      {
        name: 'message',
        path: 'message',
        meta: {
          title: 'Message',
          subTitle: '消息提示',
          group: 'notice',
        },
        component: Message,
      },
      {
        name: 'breadcrumb',
        path: 'breadcrumb',
        meta: {
          title: 'Breadcrumb',
          subTitle: '面包屑',
          group: 'nav',
        },
        component: Breadcrumb,
      },
      {
        name: 'icon',
        path: 'icon',
        meta: {
          title: 'Icon',
          subTitle: '图标',
          group: 'general',
        },
        component: Icon,
      },
      {
        name: 'progress',
        path: 'progress',
        meta: {
          title: 'Progress',
          subTitle: '进度条',
          group: 'data',
        },
        component: Progress,
      },
      {
        name: 'table',
        path: 'table',
        meta: {
          title: 'Table',
          subTitle: '表格',
          group: 'data',
        },
        component: Table,
      },
    ],
  },
  {
    path: '*',
    redirect: '/guide/install',
  },
];
