import Trigger from '@suning/v-trigger';
import placements from './placements';
import MonthCalendar from '../monthCalendar';

export default {
  name: 'MonthPicker',
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Date,
      default: undefined,
    },
    format: {
      type: String,
      default: undefined,
    },
    disabledMonth: {
      type: Function,
      default: undefined,
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
    align: {
      type: Object,
      default() {
        return {
          points: ['tl', 'tl'],
        };
      },
    },
    placement: {
      type: String,
      default: 'bottomLeft',
    },
  },
  data() {
    return {
      innerVisible: false,
    };
  },
  watch: {
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    this.setInnerVisible(this.visible);
  },
  methods: {
    setInnerVisible(visible) {
      this.innerVisible = visible;
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
    onInput(val) {
      this.setInnerVisible(false);
      this.$emit('input', val);
    },
  },
  render() {
    const {
      $slots,
      prefixCls,
      value,
      locale,
      format,
      disabledMonth,
      innerVisible,
      disabled,
      align,
      placement,
      builtinPlacements,
      getPopupContainer,
      onPopupVisibleChange,
      onInput,
    } = this;
    const triggerProps = {
      prefixCls: `${prefixCls}-picker`,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      popupAlign: align,
      popupPlacement: placement,
      builtinPlacements,
      getPopupContainer,
      destroyPopupOnHide: true,
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    const calendarProps = {
      prefixCls,
      value,
      locale,
      format,
      disabledMonth,
    };
    const calendarOn = {
      input: onInput,
    };
    return (
      <Trigger {...{ props: triggerProps, on }}>
        <template slot="trigger">{$slots.trigger}</template>
        <MonthCalendar {...{ props: calendarProps, on: calendarOn, slot: 'popup' }} />
      </Trigger>
    );
  },
};
