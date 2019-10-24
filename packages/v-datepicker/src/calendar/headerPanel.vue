<template>
  <div>
    <month-panel v-if="isMonth"
                 :root-prefix-cls="prefixCls"
                 :locale="locale"
                 :disabled-month="disabledMonth"
                 :value="value"
                 :month-nav="monthNav"
                 @on-show-year-panel="onShowYearPanel"
                 @on-change="onMonthValueChange"
                 @on-select="onMonthSelect" />
    <year-panel v-if="isYear"
                :root-prefix-cls="prefixCls"
                :locale="locale"
                :value="value"
                :year-nav="yearNav"
                :disabled-year="disabledYear"
                @on-show-decade-panel="onShowDecadePanel"
                @on-change="onYearValueChange"
                @on-select="onYearSelect" />
    <decade-panel v-if="isDecade"
                  :root-prefix-cls="prefixCls"
                  :locale="locale"
                  :value="value"
                  @on-select="onDecadeSelect" />
  </div>
</template>


<script>
  import MonthPanel from '../month/monthPanel.vue';
  import YearPanel from '../year/yearPanel.vue';
  import DecadePanel from '../decade/decadePanel.vue';

  export default {
    name: 'HeaderPanel',
    components: {
      MonthPanel,
      YearPanel,
      DecadePanel,
    },
    props: {
      prefixCls: String,
      mode: String,
      value: Date,

      locale: Object,
      yearFrom: String,
      disabledMonth: {
        type: Function,
        default: undefined,
      },
      disabledYear: {
        type: Function,
        default: undefined,
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
    computed: {
      isMonth() {
        return this.mode === 'month';
      },
      isYear() {
        return this.mode === 'year';
      },
      isDecade() {
        return this.mode === 'decade';
      },
    },
    methods: {
      goNextPanel(value, next, originMode) {
        this.$emit('on-select', value, next, originMode);
      },
      onMonthSelect(value) {
        this.goNextPanel(value, 'date', 'month');
      },
      onYearSelect(value) {
        const { yearFrom, goNextPanel } = this;
        goNextPanel(value, yearFrom, 'year');
      },
      onDecadeSelect(value) {
        this.goNextPanel(value, 'year', 'descade');
      },
      onShowYearPanel(from) {
        this.$emit('on-show-year-panel', from);
      },
      onShowDecadePanel() {
        this.$emit('on-show-decade-panel');
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
