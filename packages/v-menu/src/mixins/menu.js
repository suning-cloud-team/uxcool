import { genUUID } from '../utils';
import placements from '../placements';

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
      // ms
      default: 100,
    },
    subMenuCloseDelay: {
      type: Number,
      // ms
      default: 100,
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
    trigger: {
      type: [Array, String],
      default: 'hover',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    popupClass: {
      type: [String, Array, Object],
      default: '',
    },
    hasTitleAttr: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    uuid() {
      return genUUID();
    },
  },
};
