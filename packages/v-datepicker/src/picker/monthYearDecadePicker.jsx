import Trigger from '@suning/v-trigger';
import placements from './placements';
import MonthYearDecadeCalendar from '../monthYearDecadeCalendar';

export default {
  name: 'MonthYearDecadePicker',
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar',
    },
    pickerPrefixCls: {
      type: String,
      default() {
        return `${this.prefixCls}-picker`;
      },
    },
    mode: {
      type: String,
      default: 'month',
      validator(v) {
        return ['month', 'year', 'decade'].indexOf(v) > -1;
      },
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
    disabledYear: {
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
          // points: ['tl', 'tl'],
        };
      },
    },
    placement: {
      type: String,
      default: 'bottomLeft',
    },
    transitionName: {
      type: String,
      default: 'slide-up',
    },
    animation: {
      type: String,
      default: '',
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
      this.$emit('open-change', visible);
    },
    onChange(val) {
      this.setInnerVisible(false);
      this.$emit('change', val);
    },
    onPanelChange(...args) {
      this.$emit('panel-change', ...args);
    },
  },
  render() {
    const {
      $slots,
      prefixCls,
      pickerPrefixCls,
      mode,
      value,
      locale,
      format,
      disabledMonth,
      disabledYear,
      innerVisible,
      disabled,
      align,
      placement,
      builtinPlacements,
      getPopupContainer,
      animation,
      transitionName,
      onPopupVisibleChange,
      onChange,
      onPanelChange,
    } = this;
    const triggerProps = {
      prefixCls: pickerPrefixCls,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      popupAlign: align,
      popupPlacement: placement,
      builtinPlacements,
      getPopupContainer,
      destroyPopupOnHide: true,
      popupTransitionName: transitionName,
      poupAnimation: animation,
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    const calendarProps = {
      prefixCls,
      mode,
      value,
      locale,
      format,
      disabledMonth,
      disabledYear,
    };
    const calendarOn = {
      'panel-change': onPanelChange,
      change: onChange,
    };
    return (
      <Trigger {...{ props: triggerProps, on }}>
        <template slot="trigger">{$slots.trigger}</template>
        <MonthYearDecadeCalendar {...{ props: calendarProps, on: calendarOn, slot: 'popup' }} />
      </Trigger>
    );
  },
};
