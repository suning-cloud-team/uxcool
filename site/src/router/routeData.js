const Layout = () => import('@/views/Layout.vue');

const Install = () => import('@/views/guide/install/index.vue');
const Start = () => import('@/views/guide/start/index.vue');
const Theme = () => import('@/views/guide/theme/index.vue');
const Grid = () => import('@/views/components/grid/index.vue');
const Badge = () => import('@/views/components/badge/index.vue');
const Chart = () => import('@/views/components/chart/index.vue');
const Topo = () => import('@/views/components/topology/index.vue');
const Input = () => import('@/views/components/input/index.vue');
const Select = () => import('@/views/components/select/index.vue');
const Menu = () => import('@/views/components/menu/index.vue');
const Pagination = () => import('@/views/components/pagination/index.vue');
const Popover = () => import('@/views/components/popover/index.vue');
const Tooltip = () => import('@/views/components/tooltip/index.vue');
const DatePicker = () => import('@/views/components/datepicker/index.vue');
const Step = () => import('@/views/components/step/index.vue');
const Spin = () => import('@/views/components/spin/index.vue');
const Tabs = () => import('@/views/components/tabs/index.vue');
const Card = () => import('@/views/components/card/index.vue');
const Modal = () => import('@/views/components/modal/index.vue');
const Message = () => import('@/views/components/message/index.vue');
const Breadcrumb = () => import('@/views/components/breadcrumb/index.vue');
const Icon = () => import('@/views/components/icon/index.vue');
const Progress = () => import('@/views/components/progress/index.vue');
const Table = () => import('@/views/components/table/index.vue');
const Tag = () => import('@/views/components/tag/index.vue');
const Switch = () => import('@/views/components/switch/index.vue');
const Button = () => import('@/views/components/button/index.vue');
const Checkbox = () => import('@/views/components/checkbox/index.vue');
const Radio = () => import('@/views/components/radio/index.vue');

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
    ],
  },
  {
    path: '*',
    redirect: '/guide/install',
  },
];
