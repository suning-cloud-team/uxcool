<template>
  <div :class="classes">
    <div :class="`${prefixCls}-header`">
      <a v-if="monthNav.prev"
         :title="locale.previousYear"
         :class="`${prefixCls}-prev-year-btn`"
         role="button"
         @click="prevYear" />
      <a :title="locale.yearSelect"
         :class="`${prefixCls}-year-select`"
         role="button"
         @click="showYearPanel">
        <span :class="`${prefixCls}-year-select-content`">
          {{ year }}
        </span>
      </a>
      <a v-if="monthNav.next"
         :title="locale.nextYear"
         :class="`${prefixCls}-next-year-btn`"
         role="button"
         @click="nextYear" />
    </div>
    <div :class="`${prefixCls}-body`">
      <month-table :prefix-cls="prefixCls"
                   :value="innerValue"
                   :disabled-month="disabledMonth"
                   :locale="locale"
                   @on-select="onSelect" />
    </div>
  </div>
</template>

<script>
  import { addYears } from 'date-fns';
  import { formatDate } from '../utils';
  import MonthTable from './monthTable';

  export default {
    name: 'MonthPanel',
    props: {
      rootPrefixCls: String,
      value: Date,
      disabledMonth: Function,
      locale: Object,
      monthNav: {
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
        innerValue: this.value,
      };
    },
    computed: {
      prefixCls() {
        return `${this.rootPrefixCls}-month-panel`;
      },
      classes() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
        };
      },
      year() {
        const { innerValue, locale } = this;
        return formatDate(innerValue, 'YYYY', { locale: locale.DateFnsLocale });
      },
    },
    methods: {
      goYear(direction) {
        const nYear = addYears(this.innerValue, direction);
        this.innerValue = nYear;
        this.$emit('on-change', nYear);
      },
      prevYear() {
        this.goYear(-1);
      },
      nextYear() {
        this.goYear(1);
      },
      showYearPanel() {
        this.$emit('on-show-year-panel', 'month');
      },
      onSelect(month) {
        this.$emit('on-select', month);
      },
    },
    components: {
      MonthTable,
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
