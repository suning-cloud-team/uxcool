<template>
  <div>
    <month-panel v-if="isMonth"
                 :root-prefix-cls="prefixCls"
                 :locale="locale"
                 :disabled-month="disabledMonth"
                 :value="value"
                 @on-show-year-panel="onShowYearPanel"
                 @on-select="onMonthSelect">
    </month-panel>
    <year-panel v-if="isYear"
                :root-prefix-cls="prefixCls"
                :locale="locale"
                :value="value"
                @on-show-decade-panel="onShowDecadePanel"
                @on-select="onYearSelect">
    </year-panel>
    <decade-panel v-if="isDecade"
                  :root-prefix-cls="prefixCls"
                  :locale="locale"
                  :value="value"
                  @on-select="onDecadeSelect">
    </decade-panel>
  </div>
</template>


<script>
  import MonthPanel from '../month/monthPanel.vue';
  import YearPanel from '../year/yearPanel.vue';
  import DecadePanel from '../decade/decadePanel.vue';

  export default {
    name: 'HeaderPanel',
    props: {
      prefixCls: String,
      mode: String,
      value: Date,
      disabledMonth: Function,
      locale: Object,
      yearFrom: String,
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
      goNextPanel(value, next) {
        this.$emit('on-select', value, next);
      },
      onMonthSelect(value) {
        this.goNextPanel(value, 'date');
      },
      onYearSelect(value) {
        const { yearFrom, goNextPanel } = this;
        goNextPanel(value, yearFrom);
      },
      onDecadeSelect(value) {
        this.goNextPanel(value, 'year');
      },
      onShowYearPanel(from) {
        this.$emit('on-show-year-panel', from);
      },
      onShowDecadePanel() {
        this.$emit('on-show-decade-panel');
      },
    },
    components: {
      MonthPanel,
      YearPanel,
      DecadePanel,
    },
  };
</script>