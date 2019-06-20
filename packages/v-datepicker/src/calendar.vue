<template>
  <div v-show="visible"
       :class="classes">
    <div :class="`${prefixCls}-panel`"
         role="panel">
      <date-input v-if="showDateInput"
                  :prefix-cls="prefixCls"
                  :locale="locale"
                  :format="dateFormat"
                  :value="selectedValue"
                  :placeholder="dateInputPlaceholder"
                  @on-change="updateValue" />
      <div :class="`${prefixCls}-date-panel`">
        <calendar-header :prefix-cls="prefixCls"
                         :format="dateFormat"
                         :mode="innerMode"
                         :value="innerValue"
                         :locale="locale"
                         :is-time-picker="isTimePicker"
                         @on-change="updateInnerValue"
                         @on-panel-change="onPanelChange" />
        <div v-if="hasTimePicker&&isTimePicker">
          <div :class="`${prefixCls}-time-picker`">
            <div :class="`${prefixCls}-time-picker-panel`">
              <slot :on-change="updateValue"
                    name="timePicker" />
            </div>
          </div>
        </div>
        <div :class="`${prefixCls}-body`">
          <date-table :prefix-cls="prefixCls"
                      :value="innerValue"
                      :selected-value="innerValue"
                      :format="format"
                      :locale="locale"
                      :disabled-date="disabledDate"
                      @on-select="updateValue" />
        </div>
        <calendar-footer :prefix-cls="prefixCls"
                         :locale="locale"
                         :value="innerValue"
                         :show-ok="showOk"
                         :is-time-picker="isTimePicker"
                         :has-time-picker="hasTimePicker"
                         :show-today="showToday"
                         :ok-disabled="okDisabled"
                         :format="format"
                         :disabled-date="disabledDate"
                         @on-ok="onOK"
                         @on-today="updateValue"
                         @on-time-picker="onTimePickerClick" />
      </div>
    </div>
  </div>
</template>


<script>
  import DateInput from './date/dateInput.vue';
  import CalendarHeader from './calendar/calendarHeader.vue';
  import DateTable from './date/dateTable.vue';
  import CalendarFooter from './calendar/calendarFooter.vue';
  import { noop, isAllowedDate, syncTime } from './utils';

  export default {
    name: 'Calendar',
    components: {
      DateInput,
      CalendarHeader,
      DateTable,
      CalendarFooter,
    },
    props: {
      locale: Object,
      prefixCls: String,
      value: {
        type: Date,
      },
      mode: {
        type: String,
        default: 'date',
        validator(v) {
          return ['time', 'date', 'month', 'year', 'decade'].indexOf(v) > -1;
        },
      },
      format: String,
      visible: {
        type: Boolean,
        default: true,
      },
      showDateInput: {
        type: Boolean,
        default: true,
      },
      showWeekNumber: {
        type: Boolean,
        default: false,
      },
      showToday: {
        type: Boolean,
        default: true,
      },
      showOk: {
        type: Boolean,
        default: false,
      },
      showTime: {
        type: [Boolean, Object],
        default: false,
      },
      dateInputPlaceholder: {
        type: String,
        default: '',
      },
      disabledDate: {
        type: Function,
        default: noop,
      },
      disabledTime: {
        type: Function,
        default: noop,
      },
      hasTimePicker: {
        type: Boolean,
        default: false,
      },
      controlMode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selectedValue: this.value,
        // 内部值传递
        innerValue: this.value,
        innerMode: this.mode,
      };
    },
    computed: {
      okDisabled() {
        const { selectedValue } = this;
        return !this.isAllowedDate(selectedValue);
      },
      isTimePicker() {
        return this.innerMode === 'time';
      },
      dateFormat() {
        const { locale, hasTimePicker } = this;
        let { format } = this;
        if (!format) {
          if (hasTimePicker) {
            format = locale.dateTimeFormat;
          } else {
            format = locale.dateFormat;
          }
        }
        return format;
      },
      classes() {
        const { prefixCls, showWeekNumber, hasTimePicker } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-week-number`]: showWeekNumber,
          [`${prefixCls}-time`]: hasTimePicker,
        };
      },
    },
    watch: {
      value(nVal) {
        this.selectedValue = nVal ? nVal : new Date();
        this.innerValue = nVal ? nVal : new Date();
      },
      mode(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerMode = nVal;
        }
      },
    },
    created() {
      const { innerValue, showTime } = this;
      if (!(innerValue instanceof Date)) {
        let date = new Date();

        if (typeof showTime === 'object') {
          date = syncTime(date, showTime.defaultValue);
        }
        this.innerValue = date;
      }
    },
    methods: {
      isAllowedDate(value) {
        const { disabledDate, disabledTime } = this;
        return isAllowedDate(value, disabledDate, disabledTime);
      },
      onPanelChange(value, next) {
        const { controlMode, innerValue } = this;
        if (!controlMode) {
          this.innerMode = next;
        }
        this.$emit('on-panel-change', value || innerValue, next);
      },
      updateValue(value) {
        this.selectedValue = value;
        this.innerValue = value;
        this.$emit('on-select', value);
      },
      updateInnerValue(value) {
        this.innerValue = value;
      },
      onOK() {
        this.$emit('on-ok', this.selectedValue);
      },
      onTimePickerClick() {
        const { isTimePicker, onPanelChange } = this;
        if (isTimePicker) {
          onPanelChange(null, 'date');
        } else {
          onPanelChange(null, 'time');
        }
      },
    },
  };
</script>
