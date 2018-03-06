import { genUUID } from '../utils';

export default {
  props: {
    prefixCls: {
      type: String,
      default: 'v-menu',
    },
    isRoot: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'light',
    },
    mode: {
      type: String,
      default: 'inline',
      validator(v) {
        return v === 'vertical' || v === 'horizontal' || v === 'inline';
      },
    },
    inlineIndent: {
      type: Number,
      default: 24,
    },
    activeKey: String,
    selectedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    openKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    focusable: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    openTransitionName: {
      type: String,
      default: '',
    },
    openAnimation: {
      type: [String, Object],
      default: '',
    },
    subMenuOpenDelay: {
      type: Number,
      default: 0,
    },
    subMenuCloseDelay: {
      type: Number,
      default: 0.1,
    },
    triggerSubMenuAction: {
      type: String,
      default: 'hover',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    // 同一时间只展开一个菜单
    uniqueOpened: {
      type: Boolean,
      default: false,
    },
    // 是否支持多选
    multiple: Boolean,
  },
  computed: {
    uuid() {
      return genUUID();
    },
  },
};
