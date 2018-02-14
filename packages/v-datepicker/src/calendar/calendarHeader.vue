<template>
  <div :class="`${prefixCls}-header`">
    <div style="position:relative">
      <a v-if="hasPrev&&!isTimePicker"
         :class="`${prefixCls}-prev-year-btn`"
         role="button"
         @click="prevYear"
         :title="locale.previousYear"></a>
      <!--prev month-->
      <a v-if="hasPrev&&!isTimePicker"
         :class="`${prefixCls}-prev-month-btn`"
         role="button"
         @click="prevMonth"
         :title="locale.previousMonth"></a>
      <year-month-day :prefix-cls="prefixCls"
                      :locale="locale"
                      :value="value"
                      :is-time-picker="isTimePicker"
                      @on-month-panel-click="showMonthPanel"
                      @on-year-panel-click="showYearPanel">
      </year-month-day>
      <!-- next month-->
      <a v-if="hasNext&&!isTimePicker"
         :class="`${prefixCls}-next-month-btn`"
         role="button"
         @click="nextMonth"
         :title="locale.nextMonth"></a>
      <!-- next year-->
      <a v-if="hasNext&&!isTimePicker"
         :class="`${prefixCls}-next-year-btn`"
         role="button"
         @click="nextYear"
         :title="locale.nextYear"></a>
    </div>
    <header-panel :prefix-cls="prefixCls"
                  :locale="locale"
                  :mode="mode"
                  :value="value"
                  :disabled-month="disabledMonth"
                  @on-show-year-panel="showYearPanel"
                  @on-show-decade-panel="showDescadePanel"
                  @on-select="onPanelSelect">
    </header-panel>
  </div>
</template>

<script>
  import { addMonths, addYears } from 'date-fns';
  import { formatDate } from '../utils';
  import HeaderPanel from './headerPanel.vue';

  export default {
    name: 'CalendarHeader',
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
      disabledMonth: Function,
      isTimePicker: Boolean,
    },
    data() {
      return {
        yearFrom: null,
      };
    },
    computed: {},
    methods: {
      onChange(value) {
        this.$emit('on-change', value);
      },
      onPanelChange(value, next) {
        this.$emit('on-panel-change', value, next);
      },
      onPanelSelect(value, next) {
        this.onPanelChange(value, next);
        this.onChange(value);
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
    },
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
            monthSelect, yearSelect, monthBeforeYear = false, yearFormat, dayFormat
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
            formatDate(value, yearFormat)
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
            formatDate(value, 'MMM')
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
              formatDate(value, dayFormat)
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
  };
</script>