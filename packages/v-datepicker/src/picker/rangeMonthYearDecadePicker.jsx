import Trigger from '@suning/v-trigger';
import { formatDate } from '../utils';
import placements from './placements';
import RangeMonthYearDecadeCalendar from '../rangeMonthYearDecadeCalendar';

export default {
  name: 'RangeMonthYearDecadePicker',
  props: {
    ...RangeMonthYearDecadeCalendar.props,
    prefixCls: {
      type: String,
      default: 'v-calendar',
    },
    pickerPrefixCls: {
      type: String,
      default: 'v-calendar-picker',
    },
    pickerValue: {
      type: Array,
      default() {
        return [];
      },
    },
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    align: {
      type: Object,
      default: undefined,
    },
    theme: {
      type: String,
      default: 'light',
    },
    placement: {
      type: String,
      default: 'bottomLeft',
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    transitionName: {
      type: String,
      default: 'slide-up',
    },
    animation: {
      type: String,
      default: '',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      innerVisible: false,
    };
  },
  computed: {
    clanderClasses() {
      return {};
    },
    actions() {
      const { disabled } = this;
      return disabled ? [] : ['click'];
    },
    dateFormat() {
      const { format, mode } = this;
      return format || (mode === 'month' ? 'YYYY-MM' : 'YYYY');
    },
  },
  watch: {
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    const { disabled, visible, setInnerVisible } = this;
    setInnerVisible(disabled ? false : visible);
  },
  methods: {
    setInnerVisible(visible, trigger = false) {
      this.innerVisible = visible;
      if (trigger) {
        this.$emit('open-change', visible);
      }
    },
    onHoverChange(value) {
      this.$emit('hover-change', value);
    },
    onCalendarChange(value) {
      this.$emit('calendar-change', value);
    },
    onPanelChange(...args) {
      this.$emit('panel-change', ...args);
    },
    onSelect(values) {
      const { dateFormat } = this;
      this.$emit('change', values, [
        formatDate(values[0], dateFormat),
        formatDate(values[1], dateFormat),
      ]);
      this.setInnerVisible(false);
    },
    onPopupVisible(visible) {
      this.setInnerVisible(visible, true);
    },
  },
  render() {
    const {
      $slots: { trigger: slotTrigger },
      pickerPrefixCls,
      innerVisible,
      actions,
      align,
      placement,
      builtinPlacements,
      transitionName,
      animation,
      getPopupContainer,
      onPopupVisible,
      prefixCls,
      pickerValue,
      mode,
      selectedValue,
      locale,
      format,
      disabledMonth,
      disabledYear,
      clanderClasses,
      onSelect,
      onHoverChange,
      onCalendarChange,
      onPanelChange,
    } = this;

    const triggerProps = {
      prefixCls: pickerPrefixCls,
      visible: innerVisible,
      actions,
      popupAlign: align,
      popupPlacement: placement,
      builtinPlacements,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      getPopupContainer,
      destroyPopupOnHide: true,
    };
    const triggerOn = {
      'popup-visible-change': onPopupVisible,
    };

    const calendarProps = {
      prefixCls,
      pickerValue,
      selectedValue,
      mode,
      locale,
      format,
      disabledMonth,
      disabledYear,
    };
    const on = {
      select: onSelect,
      'hover-change': onHoverChange,
      'calendar-change': onCalendarChange,
      'panel-change': onPanelChange,
    };
    return (
      <Trigger {...{ props: triggerProps, on: triggerOn }}>
        <template slot="trigger">{slotTrigger}</template>
        <RangeMonthYearDecadeCalendar
          {...{
            class: clanderClasses,
            props: calendarProps,
            on,
            slot: 'popup',
          }}
        />
      </Trigger>
    );
  },
};
