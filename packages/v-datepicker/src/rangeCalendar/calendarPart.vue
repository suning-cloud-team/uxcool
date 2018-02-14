<template>
  <div :class="classes">
    <date-input :prefix-cls="prefixCls"
                :locale="locale"
                :format="format"
                :value="rangeVal"
                :placeholder="placeholder"
                :disabled-date="disabledDate"
                :disabled-time="disabledTime"
                @on-change="onSelect">
    </date-input>
    <div>
      <calendar-header :prefix-cls="prefixCls"
                       :format="format"
                       :mode="mode"
                       :value="value"
                       :locale="locale"
                       :is-time-picker="isTimePicker"
                       :has-prev="enablePrev"
                       :has-next="enableNext"
                       :disabled-month="disabledMonth"
                       @on-change="onInnerValueChange"
                       @on-panel-change="onPanelChange">
      </calendar-header>
      <div v-if="hasTimePicker&&isTimePicker">
        <div :class="`${prefixCls}-time-picker`">
          <div :class="`${prefixCls}-time-picker-panel`">
            <slot name="timePicker"></slot>
          </div>
        </div>
      </div>
      <div :class="`${prefixCls}-body`">
        <date-table :prefix-cls="prefixCls"
                    :value="value"
                    :selected-value="selectedValue"
                    :hover-values="hoverValues"
                    :format="format"
                    :locale="locale"
                    :disabled-date="disabledDate"
                    @on-day-hover="onDayHover"
                    @on-select="onSelect">
        </date-table>
      </div>
    </div>
    </date-input>
  </div>
</template>

<script>
  import CalendarHeader from '../calendar/calendarHeader.vue';
  import DateInput from '../date/dateInput.vue';
  import DateTable from '../date/dateTable.vue';

  export default {
    name: 'CalendarPart',
    props: {
      prefixCls: String,
      value: Date,
      selectedValue: Array,
      mode: String,
      hoverValues: Array,
      direction: String,
      locale: Object,
      hasTimePicker: Boolean,
      isTimePicker: Boolean,
      format: String,
      placeholder: String,
      disabledMonth: Function,
      disabledDate: Function,
      disabledTime: Function,
      enableNext: Boolean,
      enablePrev: Boolean,
    },
    data() {
      return {};
    },
    computed: {
      rangeVal() {
        const { direction, selectedValue } = this;
        return selectedValue[direction === 'left' ? 0 : 1];
      },
      classes() {
        const { prefixCls, direction } = this;
        const rangeClass = `${prefixCls}-range`;
        return {
          [`${rangeClass}-part`]: true,
          [`${rangeClass}-${direction}`]: true,
        };
      },
    },
    methods: {
      onInnerValueChange(value) {
        this.$emit('on-value-change', value);
      },
      onDayHover(value) {
        this.$emit('on-day-hover', value);
      },
      onSelect(value) {
        this.$emit('on-select', value);
      },
      onPanelChange(value, next) {
        this.$emit('on-panel-change', value, next);
      },
    },
    components: {
      DateInput,
      DateTable,
      CalendarHeader,
    },
  };
</script>