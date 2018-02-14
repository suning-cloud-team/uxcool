<template>
  <div :class="classes">
    <div :class="`${prefixCls}-header`">
      <a :class="`${prefixCls}-prev-year-btn`"
         role="button"
         @click="prevYear"
         :title="locale.previousYear"></a>
      <a :class="`${prefixCls}-year-select`"
         role="button"
         :title="locale.yearSelect"
         @click="showYearPanel">
        <span :class="`${prefixCls}-year-select-content`">
          {{year}}
        </span>
      </a>
      <a :class="`${prefixCls}-next-year-btn`"
         role="button"
         @click="nextYear"
         :title="locale.nextYear"></a>
    </div>
    <div :class="`${prefixCls}-body`">
      <month-table :prefix-cls="prefixCls"
                   :value="innerValue"
                   :disabled-month="disabledMonth"
                   :locale="locale"
                   @on-select="onSelect">
      </month-table>
    </div>
  </div>
</template>

<script>
  import { addYears } from 'date-fns';
  import { formatDate } from '../utils';
  import MonthTable from './monthTable.vue';

  export default {
    name: 'MonthPanel',
    props: {
      rootPrefixCls: String,
      value: Date,
      disabledMonth: Function,
      locale: Object,
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
        const { innerValue } = this;
        return formatDate(innerValue, 'YYYY');
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