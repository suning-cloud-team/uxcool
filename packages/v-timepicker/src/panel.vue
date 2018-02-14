<template>
  <div :class="classes">
    <time-header :prefix-cls="prefixCls"
                 :value="innerValue">
    </time-header>
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
              @on-change="onChange">
    </combobox>
  </div>
</template>

<script>
  import TimeHeader from './header.vue';
  import Combobox from './combobox.vue';

  export default {
    name: 'TimePickerPanel',
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
    created() {
      this.innerValue = this.value;
    },
    computed: {
      columns() {
        const { showHour, showMinute, showSecond } = this;
        return [showHour, showMinute, showSecond].filter(v => !!v).length;
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
          disabledMinutes, minuteStep, hideDisabledOptions, genOptions
        } = this;
        const disabledOpts = disabledMinutes && disabledMinutes();
        return genOptions(60, disabledOpts, hideDisabledOptions, minuteStep);
      },
      secondOptions() {
        const {
          disabledSeconds, secondStep, hideDisabledOptions, genOptions
        } = this;
        const disabledOpts = disabledSeconds && disabledSeconds();
        return genOptions(60, disabledOpts, hideDisabledOptions, secondStep);
      },
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
    components: {
      TimeHeader,
      Combobox,
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
  };
</script>