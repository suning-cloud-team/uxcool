<template>
  <div :class="`${prefixCls}-header`">
    <div style="position:relative">
      <a v-if="hasPrev&&!isTimePicker"
         :title="locale.previousYear"
         :class="`${prefixCls}-prev-year-btn`"
         role="button"
         @click="prevYear" />
      <!--prev month-->
      <a v-if="hasPrev&&!isTimePicker"
         :title="locale.previousMonth"
         :class="`${prefixCls}-prev-month-btn`"
         role="button"
         @click="prevMonth" />
      <year-month-day :prefix-cls="prefixCls"
                      :locale="locale"
                      :value="value"
                      :is-time-picker="isTimePicker"
                      @on-month-panel-click="showMonthPanel"
                      @on-year-panel-click="showYearPanel" />
      <!-- next month-->
      <a v-if="hasNext&&!isTimePicker"
         :title="locale.nextMonth"
         :class="`${prefixCls}-next-month-btn`"
         role="button"
         @click="nextMonth" />
      <!-- next year-->
      <a v-if="hasNext&&!isTimePicker"
         :title="locale.nextYear"
         :class="`${prefixCls}-next-year-btn`"
         role="button"
         @click="nextYear" />
    </div>
    <header-panel :prefix-cls="prefixCls"
                  :locale="locale"
                  :mode="mode"
                  :value="value"
                  :year-from="yearFrom"
                  :disabled-month="disabledMonth"
                  :disabled-year="disabledYear"
                  :month-nav="monthNav"
                  :year-nav="yearNav"
                  @month-value-change="onMonthValueChange"
                  @year-value-change="onYearValueChange"
                  @on-show-year-panel="showYearPanel"
                  @on-show-decade-panel="showDescadePanel"
                  @on-select="onPanelSelect" />
  </div>
</template>

<script>
  import { addMonths, addYears } from 'date-fns';
  import { formatDate } from '../utils';
  import HeaderPanel from './headerPanel.vue';

  export default {
    name: 'CalendarHeader',
    components: {
      HeaderPanel,
      yearMonthDay: {
        props: {
          prefixCls: String,
          value: Date,
          locale: Object,
          isTimePicker: Boolean,
        },
        render(h) {
          const that = this;
          const {
            prefixCls, locale, value, isTimePicker
          } = that;
          const {
            monthSelect,
            yearSelect,
            monthBeforeYear = false,
            yearFormat,
            dayFormat,
            DateFnsLocale,
          } = locale;
          const subElements = [];
          let selectClassName = `${prefixCls}-ym-select`;
          const year = h(
            'a',
            {
              class: {
                [`${prefixCls}-year-select`]: true,
              },
              attrs: {
                role: 'button',
                title: yearSelect,
              },
              on: {
                click(e) {
                  e.stopPropagation();
                  e.preventDefault();
                  that.$emit('on-year-panel-click', 'date');
                },
              },
            },
            formatDate(value, yearFormat, { locale: DateFnsLocale })
          );

          const month = h(
            'a',
            {
              class: {
                [`${prefixCls}-month-select`]: true,
              },
              attrs: {
                role: 'button',
                title: monthSelect,
              },
              on: {
                click(e) {
                  e.stopPropagation();
                  e.preventDefault();
                  that.$emit('on-month-panel-click');
                },
              },
            },
            formatDate(value, 'MMM', { locale: DateFnsLocale })
          );

          if (monthBeforeYear) {
            selectClassName = `${prefixCls}-my-select`;
            subElements.push(month, year);
          } else {
            subElements.push(year, month);
          }

          if (isTimePicker) {
            const day = h(
              'a',
              {
                class: {
                  [`${prefixCls}-day-select`]: true,
                },
                attrs: {
                  role: 'button',
                },
              },
              formatDate(value, dayFormat, { locale: DateFnsLocale })
            );

            if (monthBeforeYear) {
              subElements.splice(1, 0, day);
            } else {
              subElements.push(day);
            }
          }

          return h(
            'span',
            {
              class: {
                [selectClassName]: true,
              },
            },
            subElements
          );
        },
      },
    },
    props: {
      prefixCls: String,
      locale: Object,
      mode: String,
      value: Date,
      format: String,
      hasPrev: {
        type: Boolean,
        default: true,
      },
      hasNext: {
        type: Boolean,
        default: true,
      },
      disabledMonth: {
        type: Function,
        default: undefined,
      },
      disabledYear: {
        type: Function,
        default: undefined,
      },
      isTimePicker: {
        type: Boolean,
        default: false,
      },
      monthNav: {
        type: Object,
        default() {
          return {
            prev: true,
            next: true,
          };
        },
      },
      yearNav: {
        type: Object,
        default() {
          return {
            prev: true,
            next: true,
          };
        },
      },
    },
    data() {
      return {
        yearFrom: null,
      };
    },
    methods: {
      onChange(value, originMode) {
        this.$emit('on-change', value, originMode);
        this.$emit('change', value, originMode);
      },
      onPanelChange(value, next, originMode) {
        this.$emit('on-panel-change', value, next, originMode);
        this.$emit('panel-change', value, next, originMode);
      },
      onPanelSelect(value, next, originMode) {
        this.onPanelChange(value, next, originMode);
        this.onChange(value, originMode);
      },
      goMonth(direction) {
        this.onChange(addMonths(this.value, direction));
      },
      goYear(direction) {
        this.onChange(addYears(this.value, direction));
      },
      prevYear() {
        this.goYear(-1);
      },
      prevMonth() {
        this.goMonth(-1);
      },
      nextMonth() {
        this.goMonth(1);
      },
      nextYear() {
        this.goYear(1);
      },
      showYearPanel(from) {
        if (this.isTimePicker) {
          return;
        }
        this.yearFrom = from;
        this.onPanelChange(null, 'year');
      },
      showMonthPanel() {
        if (this.isTimePicker) {
          return;
        }
        this.onPanelChange(null, 'month');
      },
      showDescadePanel() {
        this.onPanelChange(null, 'decade');
      },
      onMonthValueChange(value) {
        this.$emit('month-value-change', value);
      },
      onYearValueChange(value) {
        this.$emit('year-value-change', value);
      },
    },
  };
</script>
