<template>
  <trigger :prefix-cls="pickerPrefixCls"
           :visible="open"
           :actions="actions"
           :popup-align="align"
           :popup-placement="placement"
           :builtin-placements="buildinPlacements"
           destroy-popup-on-hide
           @on-popup-visible-change="onPopupVisible">
    <template slot="trigger">
      <slot name="trigger" />
    </template>
    <range-calendar slot="popup"
                    :prefix-cls="prefixCls"
                    :class="clanderClasses"
                    :value="value"
                    :selected-value="innerValues"
                    :format="dateFormat"
                    :show-clear="showClear"
                    :date-input-placeholder="dateInputPlaceholder"
                    :has-time-picker="isShowTime"
                    :locale="locale"
                    :mode="mode"
                    :show-ok="showOk"
                    :show-today="showToday"
                    :disabled-date="disabledDate"
                    :disabled-time="disabledTime"
                    :ranges="ranges"
                    @on-select="onSelect"
                    @calendar-change="onCalendarChange"
                    @on-quick-select="onQuickSelect"
                    @on-ok="onOk" />
  </trigger>
</template>

<script>
  import { addMonths } from 'date-fns';
  import Trigger from '@suning/v-trigger';
  import { formatDate, isValidArray } from '../utils';
  import RangeCalendar from '../rangeCalendar.vue';
  import localeEN from '../locale/en_US';
  import placements from './placements';

  export default {
    name: 'RangeDatePicker',
    components: {
      Trigger,
      RangeCalendar,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-calendar',
      },
      pickerPrefixCls: {
        type: String,
        default: 'v-calendar-picker',
      },
      locale: {
        type: Object,
        default() {
          return localeEN;
        },
      },
      value: {
        type: Array,
        default() {
          const date = new Date();
          return [date, addMonths(date, 1)];
        },
      },
      selectedValue: {
        type: Array,
        default() {
          return [];
        },
      },
      mode: {
        type: Array,
        default() {
          return ['date', 'date'];
        },
      },
      theme: {
        type: String,
        default: 'light',
      },
      showClear: Boolean,
      isOpen: Boolean,
      format: String,
      disabled: Boolean,
      disabledDate: Function,
      disabledTime: Function,
      dateInputPlaceholder: [String, Array],
      showTime: Boolean,
      showOk: {
        type: Boolean,
        default() {
          return this.showTime;
        },
      },
      showToday: Boolean,
      ranges: {
        type: Object,
        default: undefined,
      },
      placement: {
        type: String,
        default: 'bottomLeft',
      },
    },
    data() {
      return {
        buildinPlacements: placements,
        open: false,
        align: {
          points: ['tl', 'tl'],
        },
        innerValues: this.selectedValue,
        inputValues: this.selectedValue,
      };
    },
    computed: {
      clanderClasses() {
        const { prefixCls, theme, isShowTime } = this;
        return {
          [`${prefixCls}-time`]: isShowTime,
          [`${prefixCls}-${theme}`]: true,
        };
      },
      actions() {
        const { disabled } = this;
        return disabled ? [] : ['click'];
      },
      isShowTime() {
        return !!this.showTime;
      },
      dateFormat() {
        const { format, isShowTime } = this;
        return format || (isShowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
      },
      formatValue() {
        const { inputValues, dateFormat } = this;
        const [start, end] = inputValues;
        return isValidArray(inputValues)
          ? `${formatDate(start, dateFormat)}~${formatDate(end, dateFormat)}`
          : '';
      },
    },
    watch: {
      selectedValue(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValues = nVal;
          this.inputValues = nVal;
        }
      },
    },
    created() {
      this.open = this.disabled ? false : this.isOpen;
    },
    methods: {
      setOpen(flag) {
        this.open = flag;
      },
      // 每次选择时间后都触发
      onCalendarChange(values) {
        this.$emit('calendar-change', values);
      },
      onChange(values, hide = true) {
        const { dateFormat, setOpen } = this;
        this.inputValues = values;
        this.$emit('change', values, [
          formatDate(values[0], dateFormat),
          formatDate(values[1], dateFormat),
        ]);
        if (hide) {
          setOpen(false);
        }
      },
      onQuickSelect(values) {
        this.innerValues = values;
        this.onChange(values);
      },
      onSelect(values) {
        this.innerValues = values;
        this.onChange(values, !this.showOk && !this.showTime);
      },
      onPopupVisible(visible) {
        if (visible) {
          this.innerValues = this.inputValues;
        }
        this.setOpen(visible);
        this.$emit('open-change', visible);
      },
      onOk(values) {
        this.setOpen(false);
        if (this.showOk || this.showTime) {
          this.$emit('ok', values);
        }
      },
    },
  };
</script>
