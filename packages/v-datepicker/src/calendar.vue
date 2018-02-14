<template>
  <div v-show="visible"
       :class="classes">
    <div role="panel"
         :class="`${prefixCls}-panel`">
      <date-input v-if="showDateInput"
                  :prefix-cls="prefixCls"
                  :locale="locale"
                  :format="dateFormat"
                  :value="selectedValue"
                  :placeholder="dateInputPlaceholder"
                  @on-change="updateValue">
      </date-input>
      <div :class="`${prefixCls}-date-panel`">
        <calendar-header :prefix-cls="prefixCls"
                         :format="dateFormat"
                         :mode="innerMode"
                         :value="innerValue"
                         :locale="locale"
                         :is-time-picker="isTimePicker"
                         @on-change="updateInnerValue"
                         @on-panel-change="onPanelChange">
        </calendar-header>
        <div v-if="hasTimePicker&&isTimePicker">
          <div :class="`${prefixCls}-time-picker`">
            <div :class="`${prefixCls}-time-picker-panel`">
              <slot name="timePicker"
                    :on-change="updateValue"></slot>
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
                      @on-select="updateValue">
          </date-table>
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
                         @on-time-picker="onTimePickerClick">
        </calendar-footer>
      </div>
    </div>
  </div>
</template>


<script>
  import DateInput from './date/dateInput.vue';
  import CalendarHeader from './calendar/calendarHeader.vue';
  import DateTable from './date/dateTable.vue';
  import CalendarFooter from './calendar/calendarFooter.vue';
  import { noop, isAllowedDate } from './utils';

  export default {
    name: 'Calendar',
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
    },
    data() {
      return {
        selectedValue: this.value,
        // 内部值传递
        innerValue: this.value,
        innerMode: this.mode,
      };
    },
    created() {
      const { innerValue } = this;
      if (!(innerValue instanceof Date)) {
        this.innerValue = new Date();
      }
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
    methods: {
      isAllowedDate(value) {
        const { disabledDate, disabledTime } = this;
        return isAllowedDate(value, disabledDate, disabledTime);
      },
      onPanelChange(value, next) {
        this.innerMode = next;
        this.$emit('on-panel-change', value || this.selectedValue, next);
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
    components: {
      DateInput,
      CalendarHeader,
      DateTable,
      CalendarFooter,
    },
  };
</script>
