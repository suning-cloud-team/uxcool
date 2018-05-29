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

    <calendar slot="popup"
              :prefix-cls="prefixCls"
              :class="`${prefixCls}-${theme}`"
              :value="innerValue"
              :mode="mode"
              :locale="locale"
              :format="dateFormat"
              :show-ok="showOk"
              :has-time-picker="isShowTime"
              :show-today="showToday"
              :disabled-date="disabledDate"
              :disabled-time="disabledTime"
              :date-input-placeholder="dateInputPlaceholder"
              @on-select="onSelect"
              @on-ok="onOk">
      <template slot="timePicker"
                slot-scope="props">
        <time-picker-panel v-if="isShowTime"
                           :prefix-cls="`${prefixCls}-time-picker`"
                           :value="innerValue"
                           show-hour
                           show-minute
                           show-second
                           :disabled-hours="disabledHours"
                           :disabled-minutes="disabledMinutes"
                           :disabled-seconds="disabledSeconds"
                           @on-change="props.onChange" />
      </template>
    </calendar>
  </trigger>
</template>


<script>
  import Trigger from '@suning/v-trigger';
  import TimePickerPanel from '@suning/v-timepicker/es/panel';
  import { formatDate } from '../utils';
  import Calendar from '../calendar.vue';
  import localeEN from '../locale/en_US';
  import placements from './placements';

  export default {
    name: 'DatePicker',
    components: {
      Calendar,
      Trigger,
      TimePickerPanel,
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
      pickerInputClass: Object,
      locale: {
        type: Object,
        default() {
          return localeEN;
        },
      },
      mode: String,
      theme: {
        type: String,
        default: 'light',
      },
      isOpen: Boolean,
      value: Date,
      disabled: Boolean,
      format: String,
      showTime: [Boolean, Object],
      showToday: Boolean,
      showOk: {
        type: Boolean,
        default() {
          return !!this.showTime;
        },
      },
      showDateInput: Boolean,
      dateInputPlaceholder: String,
      disabledDate: Function,
      disabledTime: Function,
      placement: {
        type: String,
        default: 'bottomLeft',
      },
    },
    data() {
      return {
        buildinPlacements: placements,
        innerValue: null,
        inputValue: null,
        open: false,
        align: {
          points: ['tl', 'tl'],
        },
        disabledHours: null,
        disabledMinutes: null,
        disabledSeconds: null,
      };
    },
    computed: {
      inputClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-picker-input`]: true,
        };
      },
      actions() {
        const { disabled } = this;
        return disabled ? [] : ['click'];
      },
      formatValue() {
        const { inputValue, dateFormat } = this;
        if (!inputValue) {
          return '';
        }
        return formatDate(inputValue, dateFormat);
      },
      isShowTime() {
        return !!this.showTime;
      },
      timeProps() {
        const { showTime } = this;
        if (typeof showTime === 'object') {
          return showTime;
        }
        return {};
      },
      dateFormat() {
        const { format, isShowTime } = this;
        return format || (isShowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
          this.inputValue = nVal;
        }
      },
    },
    created() {
      const {
        value, isOpen, disabledTime, disabled
      } = this;
      this.innerValue = value;
      this.inputValue = value;
      this.open = disabled ? false : isOpen;
      if (disabledTime) {
        const opts = disabledTime(value);
        this.disabledHours = opts.disabledHours;
        this.disabledMinutes = opts.disabledMinutes;
        this.disabledSeconds = opts.disabledSeconds;
      }
    },
    methods: {
      setOpen(flag) {
        this.open = flag;
      },
      onSelect(val) {
        const { dateFormat } = this;
        this.innerValue = val;
        this.$emit('change', val, formatDate(val, dateFormat));
        if (!this.showOk && !this.showTime) {
          this.inputValue = val;
          this.setOpen(false);
        }
      },
      onFocus(e) {
        this.$emit('focus', e);
      },
      onPopupVisible(visible) {
        if (visible) {
          this.innerValue = this.inputValue;
        }
        this.setOpen(visible);
        this.$emit('open-change', visible);
      },
      onOk(value) {
        this.setOpen(false);
        if (this.showTime || this.showOk) {
          this.inputValue = value;
          this.$emit('ok', value);
        }
      },
    },
  };
</script>
