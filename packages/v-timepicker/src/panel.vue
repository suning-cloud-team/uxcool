<template>
  <div :class="classes">
    <time-header :prefix-cls="prefixCls"
                 :value="innerValue"
    />
    <combobox :prefix-cls="prefixCls"
              :value="innerValue"
              :format="format"
              :show-hour="showHour"
              :show-minute="showMinute"
              :show-second="showSecond"
              :hour-options="hourOptions"
              :minute-options="minuteOptions"
              :second-options="secondOptions"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
              :use12-hours="use12Hours"
              @on-change="onChange"
    />
  </div>
</template>

<script>
  import { getHours, getMinutes } from 'date-fns';
  import TimeHeader from './header.vue';
  import Combobox from './combobox.vue';

  export default {
    name: 'TimePickerPanel',
    components: {
      TimeHeader,
      Combobox,
    },
    props: {
      prefixCls: { type: String, default: 'v-time-picker-panel' },
      value: {
        type: Date,
        required: true,
        default() {
          return new Date();
        },
      },
      format: String,
      showHour: Boolean,
      showMinute: Boolean,
      showSecond: Boolean,
      disabledHours: Function,
      disabledMinutes: Function,
      disabledSeconds: Function,
      hourStep: Number,
      minuteStep: Number,
      secondStep: Number,
      hideDisabledOptions: Boolean,
      use12Hours: Boolean,
    },
    data() {
      return {
        innerValue: null,
      };
    },
    computed: {
      columns() {
        const { showHour, showMinute, showSecond } = this;
        return [showHour, showMinute, showSecond].filter((v) => !!v).length;
      },
      classes() {
        const { prefixCls, columns } = this;
        return {
          [`${prefixCls}-inner`]: true,
          [`${prefixCls}-column-${columns}`]: true,
        };
      },
      hourOptions() {
        const {
          disabledHours, hourStep, hideDisabledOptions, genOptions
        } = this;
        const disabledOpts = disabledHours && disabledHours();
        return genOptions(24, disabledOpts, hideDisabledOptions, hourStep);
      },
      minuteOptions() {
        const {
          innerValue, disabledMinutes, minuteStep, hideDisabledOptions, genOptions
        } = this;
        const hour = getHours(innerValue);
        const disabledOpts = disabledMinutes && disabledMinutes(hour);
        return genOptions(60, disabledOpts, hideDisabledOptions, minuteStep);
      },
      secondOptions() {
        const {
          innerValue, disabledSeconds, secondStep, hideDisabledOptions, genOptions
        } = this;
        const hour = getHours(innerValue);
        const minute = getMinutes(innerValue);
        const disabledOpts = disabledSeconds && disabledSeconds(hour, minute);
        return genOptions(60, disabledOpts, hideDisabledOptions, secondStep);
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
    created() {
      this.innerValue = this.value;
    },
    methods: {
      genOptions(len, disabledOpts, hideDisabledOptions, step = 1) {
        const options = [];
        for (let i = 0; i < len; i += step) {
          if (!disabledOpts || disabledOpts.indexOf(i) === -1 || !hideDisabledOptions) {
            options.push(i);
          }
        }
        return options;
      },
      onChange(val) {
        this.innerValue = val;
        this.$emit('on-change', val);
      },
    },
  };
</script>
