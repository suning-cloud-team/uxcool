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
import Tag from '@/views/components/tag/index.vue';
import Switch from '@/views/components/switch/index.vue';
import Button from '@/views/components/button/index.vue';
import Checkbox from '@/views/components/checkbox/index.vue';
import Radio from '@/views/components/radio/index.vue';
import Alert from '@/views/components/alert/index.vue';
import Slider from '@/views/components/slider/index.vue';
import Avatar from '@/views/components/avatar/index.vue';
import Backtop from '@/views/components/backtop/index.vue';
import Popconfirm from '@/views/components/popconfirm/index.vue';
import Form from '@/views/components/form/index.vue';
import InputNumber from '@/views/components/input-number/index.vue';
import Anchor from '@/views/components/anchor/index.vue';
import Notification from '@/views/components/notification/index.vue';
import Divider from '@/views/components/divider/index.vue';
import Transfer from '@/views/components/transfer/index.vue';
import Affix from '@/views/components/affix/index.vue';
import Rate from '@/views/components/rate/index.vue';
import Dropdown from '@/views/components/dropdown/index.vue';
import Tree from '@/views/components/tree/index.vue';

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
  other: {
    name: 'Other',
    sort: 30,
  },
  business: {
    name: 'Business',
    sort: 1000,
  },
};

// title不止充当文档标题作用，还充当埋点名称角色
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
          title: 'Grid',
          subTitle: '栅格',
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
      {
        name: 'tag',
        path: 'tag',
        meta: {
          title: 'Tag',
          subTitle: '标签',
          group: 'data',
        },
        component: Tag,
      },
      {
        name: 'switch',
        path: 'switch',
        meta: {
          title: 'Switch',
          subTitle: '开关',
          group: 'form',
        },
        component: Switch,
      },
      {
        name: 'button',
        path: 'button',
        meta: {
          title: 'Button',
          subTitle: '按钮',
          group: 'general',
        },
        component: Button,
      },
      {
        name: 'checkbox',
        path: 'checkbox',
        meta: {
          title: 'Checkbox',
          subTitle: '多选框',
          group: 'form',
        },
        component: Checkbox,
      },
      {
        name: 'radio',
        path: 'radio',
        meta: {
          title: 'Radio',
          subTitle: '单选框',
          group: 'form',
        },
        component: Radio,
      },
      {
        name: 'alert',
        path: 'alert',
        meta: {
          title: 'Alert',
          subTitle: '警告提示',
          group: 'notice',
        },
        component: Alert,
      },
      {
        name: 'slider',
        path: 'slider',
        meta: {
          title: 'Slider',
          subTitle: '滑动输入条',
          group: 'form',
        },
        component: Slider,
      },
      {
        name: 'avatar',
        path: 'avatar',
        meta: {
          title: 'Avatar',
          subTitle: '头像',
          group: 'data',
        },
        component: Avatar,
      },
      {
        name: 'backtop',
        path: 'backtop',
        meta: {
          title: 'Backtop',
          subTitle: '回到顶部',
          group: 'other',
        },
        component: Backtop,
      },
      {
        name: 'popconfirm',
        path: 'popconfirm',
        meta: {
          title: 'Popconfirm',
          subTitle: '气泡确认框',
          group: 'notice',
        },
        component: Popconfirm,
      },
      {
        name: 'form',
        path: 'form',
        meta: {
          title: 'Form',
          subTitle: '表单',
          group: 'form',
        },
        component: Form,
      },
      {
        name: 'input-number',
        path: 'input-number',
        meta: {
          title: 'InputNumber',
          subTitle: '数字输入框',
          group: 'form',
        },
        component: InputNumber,
      },
      {
        name: 'notification',
        path: 'notification',
        meta: {
          title: 'Notification',
          subTitle: '通知提示框',
          group: 'notice',
        },
        component: Notification,
      },
      {
        name: 'anchor',
        path: 'anchor',
        meta: {
          title: 'Anchor',
          subTitle: '锚点',
          group: 'other',
        },
        component: Anchor,
      },
      {
        name: 'divider',
        path: 'divider',
        meta: {
          title: 'Divider',
          subTitle: '分割线',
          group: 'other',
        },
        component: Divider,
      },
      {
        name: 'transfer',
        path: 'transfer',
        meta: {
          title: 'Transfer',
          subTitle: '穿梭框',
          group: 'form',
        },
        component: Transfer,
      },
      {
        name: 'affix',
        path: 'affix',
        meta: {
          title: 'Affix',
          subTitle: '固钉',
          group: 'nav',
        },
        component: Affix,
      },
      {
        name: 'rate',
        path: 'rate',
        meta: {
          title: 'Rate',
          subTitle: '评分',
          group: 'form',
        },
        component: Rate,
      },
      {
        name: 'dropdown',
        path: 'dropdown',
        meta: {
          title: 'Dropdown',
          subTitle: '下拉菜单',
          group: 'nav',
        },
        component: Dropdown,
      },
      {
        name: 'tree',
        path: 'tree',
        meta: {
          title: 'Tree',
          subTitle: '树',
          group: 'data',
        },
        component: Tree,
      },
      {
        name: 'treeselect',
        path: 'treeselect',
        meta: {
          title: 'TreeSelect',
          subTitle: '树选择',
          group: 'form',
        },
        component: () => import('@/views/components/tree-select/index.vue'),
      },
      {
        name: 'cascader',
        path: 'cascader',
        meta: {
          title: 'Cascader',
          subTitle: '级联选择',
          group: 'form',
        },
        component: () => import('@/views/components/cascader/index.vue'),
      },
      {
        name: 'collapse',
        path: 'collapse',
        meta: {
          title: 'Collapse',
          subTitle: '折叠面板',
          group: 'data',
        },
        component: () => import('@/views/components/collapse/index.vue'),
      }, {
        name: 'timeline',
        path: 'timeline',
        meta: {
          title: 'Timeline',
          subTitle: '时间轴',
          group: 'data',
        },
        component: () => import('@/views/components/timeline/index.vue'),
      },
      {
        name: 'list',
        path: 'list',
        meta: {
          title: 'List',
          subTitle: '列表',
          group: 'data',
        },
        component: () => import('@/views/components/list/index.vue'),
      }, {
        name: 'timepicker',
        path: 'timepicker',
        meta: {
          title: 'Timepicker',
          subTitle: '时间选择器',
          group: 'form',
        },
        component: () => import('@/views/components/timepicker/index.vue'),
      }, {
        name: 'upload',
        path: 'upload',
        meta: {
          title: 'Upload',
          subTitle: '上传',
          group: 'form',
        },
        component: () => import('@/views/components/upload/index.vue'),
      }
    ],
  },
  {
    path: '*',
    redirect: '/guide/install',
  },
];
