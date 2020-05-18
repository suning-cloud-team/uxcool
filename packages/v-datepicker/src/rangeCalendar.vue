<template>
  <div :class="classes">
    <div :class="`${prefixCls}-panel`">
      <a v-if="isShowClear"
         :title="locale.clear"
         :class="`${prefixCls}-clear-btn`"
         role="button"
         @click="clear" />
      <div :class="`${prefixCls}-date-panel`">
        <calendar-part :prefix-cls="prefixCls"
                       :value="startValue"
                       :mode="innerMode[0]"
                       :selected-value="selectedValue"
                       :hover-values="hoverValues"
                       :locale="locale"
                       :has-time-picker="hasTimePicker"
                       :is-time-picker="isTimePicker"
                       :format="format"
                       :placeholder="startPlaceholder"
                       :disabled-month="disabledStartMonth"
                       :disabled-date="disabledDate"
                       :disabled-time="disabledTime"
                       :enable-next="enableBtn"
                       direction="left"
                       enable-prev
                       @on-value-change="onValueChange('left', $event)"
                       @on-panel-change="onStartPanelChange"
                       @on-day-hover="onDayHover"
                       @on-select="onSelect">
          <time-picker-panel v-if="hasTimePicker"
                             slot="timePicker"
                             v-bind="timeStartPickerProps"
                             @on-change="onTimePickerChange('left',$event)" />
        </calendar-part>
        <span :class="`${prefixCls}-range-middle`">~</span>
        <calendar-part :prefix-cls="prefixCls"
                       :value="endValue"
                       :mode="innerMode[1]"
                       :selected-value="selectedValue"
                       :hover-values="hoverValues"
                       :locale="locale"
                       :has-time-picker="hasTimePicker"
                       :is-time-picker="isTimePicker"
                       :format="format"
                       :placeholder="endPlaceholder"
                       :disabled-month="disabledEndMonth"
                       :disabled-date="disabledDate"
                       :disabled-time="disabledTime"
                       :enable-prev="enableBtn"
                       direction="right"
                       enable-next
                       @on-value-change="onValueChange('right', $event)"
                       @on-panel-change="onEndPanelChange"
                       @on-day-hover="onDayHover"
                       @on-select="onSelect">
          <time-picker-panel v-if="hasTimePicker"
                             slot="timePicker"
                             v-bind="timeEndPickerProps"
                             @on-change="onTimePickerChange('right',$event)" />
        </calendar-part>
        <div v-if="isRanges"
             :class="`${prefixCls}-range-quick-selector`">
          <template v-if="rangesIsArr">
            <div v-for="(v,k) in ranges"
                 :key="k"
                 :class="`${prefixCls}-range-quick-selector-item`"
                 @mouseenter="onRangeMouseEnter(v.dates)"
                 @mouseleave="onRangeMouseLeave"
                 @click.stop="onRangeClick(v.dates, v)">
              <a role="button">{{ v.label }}</a>
            </div>
          </template>
          <template v-else>
            <div v-for="(v,k) in ranges"
                 :key="k"
                 :class="`${prefixCls}-range-quick-selector-item`"
                 @mouseenter="onRangeMouseEnter(v)"
                 @mouseleave="onRangeMouseLeave"
                 @click.stop="onRangeClick(v)">
              <a role="button">{{ k }}</a>
            </div>
          </template>
        </div>
      </div>
      <div :class="footerClasses">
        <div v-if="showToday || isShowOk"
             :class="`${prefixCls}-footer-btn`">
          <today-button v-if="showToday"
                        :prefix-cls="prefixCls"
                        :locale="locale"
                        :disabled="isTodayInView||isTimePicker"
                        :disabled-date="disabledDate"
                        :text="locale.backToToday"
                        :has-time-picker="hasTimePicker"
                        :is-show-ok="isShowOk"
                        :format="format"
                        @on-click="onTodayClick" />
          <time-picker-button v-if="hasTimePicker"
                              :prefix-cls="prefixCls"
                              :locale="locale"
                              :disabled="isTimePickerDisabled"
                              :is-time-picker="isTimePicker"
                              @on-click="onTimePickerClick" />
          <ok-button v-if="isShowOk"
                     :prefix-cls="prefixCls"
                     :locale="locale"
                     :disabled="isOkDisabled"
                     @on-click="onOkClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { cloneDeep, isPlainObject } from '@cloud-sn/v-utils';
  import {
    addMonths,
    isSameMonth,
    isSameDay,
    isSameHour,
    isSameMinute,
    isBefore,
    isAfter,
    isEqual,
    getHours,
    getMinutes,
    getSeconds,
  } from 'date-fns';
  import { VTimePickerPanel } from '@cloud-sn/v-timepicker';
  import {
    noop, isValidArray, formatDate, isAllowedDate, getTimeConfig, syncTime
  } from './utils';
  import CalendarPart from './rangeCalendar/calendarPart.vue';
  import TodayButton from './calendar/todayButton.vue';
  import TimePickerButton from './calendar/timePickerButton.vue';
  import OkButton from './calendar/okButton.vue';

  function genEndDisabledTime(start, end, cfg) {
    let nCfg = cfg;
    if (end && isSameDay(start, end)) {
      const [sHour, sMinute, sSecond] = [getHours(start), getMinutes(start), getSeconds(start)];
      const [eHour, eMinute] = [getHours(end), getMinutes(end)];
      const hours = new Set(cfg.disabledHours());
      for (let i = 0; i < sHour; i += 1) {
        hours.add(i);
      }

      const minutes = new Set(cfg.disabledMinutes(eHour));
      if (isSameHour(start, end)) {
        for (let i = 0; i < sMinute; i += 1) {
          minutes.add(i);
        }
      }
      const seconds = new Set(cfg.disabledSeconds(eHour, eMinute));
      if (isSameMinute(start, end)) {
        for (let i = 0; i < sSecond; i += 1) {
          seconds.add(i);
        }
      }
      nCfg = {
        disabledHours() {
          return Array.from(hours);
        },
        disabledMinutes() {
          return Array.from(minutes);
        },
        disabledSeconds() {
          return Array.from(seconds);
        },
      };
    }

    return nCfg;
  }

  export default {
    name: 'RangeCalendar',
    components: {
      CalendarPart,
      TimePickerPanel: VTimePickerPanel,
      TodayButton,
      TimePickerButton,
      OkButton,
    },
    props: {
      prefixCls: {
        type: String,
        default: '',
      },
      value: {
        type: Array,
        required: true,
        validator(val) {
          return val.every((v) => v instanceof Date);
        },
      },
      selectedValue: {
        type: Array,
        default() {
          return [];
        },
        validator(val) {
          return val.every((v) => v instanceof Date);
        },
      },
      showClear: Boolean,
      locale: Object,
      mode: {
        type: Array,
        default() {
          return ['date', 'date'];
        },
        required: true,
        validator(val) {
          return val.every((v) => ['date', 'month', 'year', 'decade'].indexOf(v) !== -1);
        },
      },
      showOk: Boolean,
      showToday: Boolean,
      format: String,
      disabledTime: { type: Function, default: noop },
      disabledDate: { type: Function, default: noop },
      dateInputPlaceholder: [String, Array],
      hasTimePicker: Boolean,
      ranges: {
        type: [Object, Array],
        default: undefined,
      },
      showTime: {
        type: [Boolean, Object],
        default: false,
      },
      controlMode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        innerMode: [],
        hoverValues: [],
        innerValues: [],
        isTimePicker: false,
        firstSelectedVal: null,
      };
    },
    computed: {
      isSelectedValue() {
        const { selectedValue } = this;
        return selectedValue[0] && selectedValue[1];
      },
      isShowClear() {
        const { showClear, selectedValue } = this;
        return showClear && selectedValue[0] && selectedValue[1];
      },
      isShowOk() {
        const { showOk, hasTimePicker } = this;
        return showOk === true || (showOk !== false && !!hasTimePicker);
      },
      isTodayInView() {
        const {
          innerValues: [start, end],
        } = this;
        const today = new Date();
        return isSameMonth(today, start) || isSameMonth(today, end);
      },
      isTimePickerDisabled() {
        const { isSelectedValue, hoverValues } = this;
        return !isSelectedValue || hoverValues.length > 0;
      },
      isOkDisabled() {
        const { isAllowedDateAndTime, isTimePickerDisabled, selectedValue } = this;
        return isTimePickerDisabled || !isAllowedDateAndTime(selectedValue);
      },
      classes() {
        const { prefixCls, isTimePicker, isRanges } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-range`]: true,
          [`${prefixCls}-range-with-ranges`]: isRanges,
          [`${prefixCls}-show-time-picker`]: isTimePicker,
        };
      },
      footerClasses() {
        const { prefixCls, isShowOk } = this;
        return {
          [`${prefixCls}-footer`]: true,
          [`${prefixCls}-range-bottom`]: true,
          [`${prefixCls}-footer-show-ok`]: isShowOk,
        };
      },
      placeholders() {
        const { dateInputPlaceholder } = this;
        let holders = ['', ''];
        if (dateInputPlaceholder) {
          if (Array.isArray(dateInputPlaceholder)) {
            holders = dateInputPlaceholder;
          } else {
            holders = [dateInputPlaceholder, dateInputPlaceholder];
          }
        }
        return holders;
      },
      startPlaceholder() {
        const { placeholders } = this;
        return placeholders[0];
      },
      endPlaceholder() {
        const { placeholders } = this;
        return placeholders[1];
      },
      startValue() {
        const { innerValues } = this;
        const [start] = innerValues;
        // const [selectedStart] = selectedValue;
        // if (selectedStart) {
        //   start = selectedStart;
        // }
        return start;
      },
      endValue() {
        const { innerValues } = this;
        const [, end] = innerValues;
        // const [, selectedEnd] = selectedValue;
        // if (selectedEnd) {
        //   end = selectedEnd;
        // }
        return end;
      },
      enableBtn() {
        const { startValue, endValue } = this;
        const next = addMonths(startValue, 1);
        return !isSameMonth(next, endValue);
      },
      disabledStartTime() {
        const { selectedValue, disabledTime } = this;
        const disabledTimeConfig = disabledTime(selectedValue, 'start');
        return getTimeConfig(selectedValue, disabledTimeConfig);
      },
      disabledEndTime() {
        const { selectedValue, disabledTime } = this;
        const [start, end] = selectedValue;

        const cfg = getTimeConfig(selectedValue, disabledTime(selectedValue, 'end'));
        //   结束时间和开始时间为同一天时, 结束时间的时分秒要在开始时间时分秒之后
        return genEndDisabledTime(start, end, cfg);
      },
      rangesIsArr() {
        return Array.isArray(this.ranges);
      },
      isRanges() {
        const { ranges, rangesIsArr } = this;
        let ret = false;
        if (ranges) {
          if (rangesIsArr) {
            ret = ranges.length > 0;
          } else {
            ret = Object.keys(ranges).length > 0;
          }
        }
        return ret;
      },
      timeProps() {
        const { showTime } = this;
        if (typeof showTime === 'object') {
          return showTime;
        }
        return {};
      },
      timeStartPickerProps() {
        const {
          prefixCls,
          timeProps,
          selectedValue,
          disabledStartTime: { disabledHours, disabledMinutes, disabledSeconds },
        } = this;

        return {
          showHour: true,
          showMinute: true,
          showSecond: true,
          ...timeProps,
          prefixCls: `${prefixCls}-time-picker`,
          value: selectedValue[0],
          disabledHours,
          disabledMinutes,
          disabledSeconds,
        };
      },
      timeEndPickerProps() {
        const {
          prefixCls,
          timeProps,
          selectedValue,
          disabledEndTime: { disabledHours, disabledMinutes, disabledSeconds },
        } = this;
        return {
          showHour: true,
          showMinute: true,
          showSecond: true,
          ...timeProps,
          prefixCls: `${prefixCls}-time-picker`,
          value: selectedValue[1],
          disabledHours,
          disabledMinutes,
          disabledSeconds,
        };
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValues = this.normalizeAnchor();
        }
      },
      selectedValue() {
        this.innerValues = this.normalizeAnchor();
      },
      mode(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerMode = nVal;
        }
      },
    },
    created() {
      const { mode, normalizeAnchor } = this;
      this.innerMode = mode;
      this.innerValues = normalizeAnchor();
    },
    methods: {
      getValueFromSelectedValue(selectedValue) {
        const [start, end] = selectedValue;
        const newEnd = end && isSameMonth(end, start) ? addMonths(end, 1) : end;
        return [start, newEnd];
      },
      normalizeAnchor() {
        const {
          selectedValue, value, getValueFromSelectedValue, showTime
        } = this;
        let normalizedValue = getValueFromSelectedValue(selectedValue);

        if (isValidArray(normalizedValue)) {
          return normalizedValue;
        }
        normalizedValue = getValueFromSelectedValue(value);

        if (isValidArray(normalizedValue)) {
          return normalizedValue;
        }

        const date = new Date();

        // issue #166 如果设置了默认值且selected-value和value都没有的情况下，以默认值同步innerValue的时分秒
        if (isPlainObject(showTime) && isValidArray(showTime.defaultValue)) {
          const [defaultStart, defaultEnd] = showTime.defaultValue;

          return [syncTime(date, defaultStart), syncTime(addMonths(date, 1), defaultEnd)];
        }

        return [date, addMonths(date, 1)];
      },
      updateHoverValues(values) {
        const hoverValues = cloneDeep(values);
        this.hoverValues = hoverValues;
        this.$emit('on-hover-change', hoverValues);
      },
      updateSelectedValues(values = []) {
        const { updateHoverValues } = this;
        const [start, end] = values;
        if (start && !end) {
          updateHoverValues(values);
        }

        this.$emit('calendar-change', values);
        if ((!start && !end) || (start && end)) {
          this.firstSelectedVal = null;
          updateHoverValues([]);
          this.$emit('on-select', values);
        }
      },
      disabledStartMonth(month) {
        const {
          innerValues: [, end],
        } = this;
        const eVal = formatDate(end, 'YYYY-MM');
        const mVal = formatDate(month, 'YYYY-MM');
        return isAfter(mVal, eVal) || isEqual(mVal, eVal);
      },
      disabledEndMonth(month) {
        const {
          innerValues: [start],
        } = this;
        const sVal = formatDate(start, 'YYYY-MM');
        const mVal = formatDate(month, 'YYYY-MM');
        return isBefore(mVal, sVal) || isEqual(mVal, sVal);
      },

      isAllowedDateAndTime(selectedValue) {
        const {
          disabledDate, disabledStartTime, disabledEndTime, hasTimePicker
        } = this;
        if (!hasTimePicker) {
          return (
            isAllowedDate(selectedValue[0], disabledDate)
            && isAllowedDate(selectedValue[1], disabledDate)
          );
        }
        return (
          isAllowedDate(selectedValue[0], disabledDate, disabledStartTime)
          && isAllowedDate(selectedValue[1], disabledDate, disabledEndTime)
        );
      },
      onDayHover(value) {
        const { firstSelectedVal, updateHoverValues } = this;
        if (firstSelectedVal) {
          const values = [firstSelectedVal];
          if (isBefore(value, firstSelectedVal)) {
            values.unshift(value);
          } else {
            values.push(value);
          }
          updateHoverValues(values);
        }
      },
      // 选择的时间与上一次选择的时间范围时间部分保持同步
      getSyncTime(values) {
        const { selectedValue, innerValues } = this;
        return values.map((val, i) => {
          // 上一次选择过有效范围的话会通过事件通知外部组件更新selectedValue
          // 如果selectedValue没有值，可能是还没有选择过,取innerValue
          const prevSelected = selectedValue[i] || innerValues[i];

          if (val && prevSelected) {
            return syncTime(val, prevSelected);
          }

          return val;
        });
      },
      onSelect(value) {
        const { firstSelectedVal, updateSelectedValues, getSyncTime } = this;
        const values = [];
        if (!firstSelectedVal) {
          this.firstSelectedVal = value;
          values.push(value);
        } else if (isBefore(firstSelectedVal, value)) {
          values.push(firstSelectedVal, value);
        } else {
          values.push(value, firstSelectedVal);
        }

        // issue 165 166: 选择完范围后与上一次的选择同步时分秒
        updateSelectedValues(getSyncTime(values));
        // updateSelectedValues(values);
      },
      onValueChange(direction, value) {
        const { innerValues } = this;
        this.innerValues = direction === 'left' ? [value, innerValues[1]] : [innerValues[0], value];
      },
      onStartPanelChange(value, next) {
        const { controlMode, innerMode, innerValues } = this;
        const mode = [next, innerMode[1]];
        if (!controlMode) {
          this.innerMode = mode;
        }
        this.$emit('on-panel-change', [value || innerValues[0], innerValues[1]], mode);
      },
      onEndPanelChange(value, next) {
        const { controlMode, innerMode, innerValues } = this;
        const mode = [innerMode[0], next];
        if (!controlMode) {
          this.innerMode = mode;
        }
        this.$emit('on-panel-change', [innerValues[0], value || innerValues[1]], mode);
      },
      onTimePickerChange(type, value) {
        const { selectedValue } = this;

        const values = cloneDeep(selectedValue);

        const idx = type === 'left' ? 0 : 1;
        values[idx] = value;
        // 防止结束时间小于开始时间
        if (isBefore(values[1], values[0])) {
          values[1 - idx] = values[idx];
        }

        this.updateSelectedValues(values);
      },
      onTodayClick() {
        const today = new Date();
        this.innerValues = [today, addMonths(today, 1)];
      },
      onTimePickerClick() {
        this.isTimePicker = !this.isTimePicker;
      },
      onOkClick() {
        this.$emit('on-ok', this.selectedValue);
      },
      getRangeVal(range) {
        let val = range;
        if (typeof val === 'function') {
          val = val();
        }
        return val;
      },
      onRangeMouseEnter(range) {
        const { getRangeVal } = this;
        const val = getRangeVal(range);
        if (Array.isArray(val)) {
          this.updateHoverValues(val);
        }
      },
      onRangeMouseLeave() {
        this.updateHoverValues([]);
      },
      onRangeClick(range, item) {
        const { getRangeVal } = this;
        const val = getRangeVal(range);
        if (Array.isArray(val)) {
          if (val.every((v) => v instanceof Date)) {
            this.$emit('on-quick-select', val, item);
          }
        }
      },
    },
  };
</script>
