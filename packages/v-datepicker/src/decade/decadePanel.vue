<template>
  <div :class="`${prefixCls}`">
    <div :class="`${prefixCls}-header`">
      <a role="button"
         :class="`${prefixCls}-prev-century-btn`"
         :title="locale.previousCentury"
         @click="prevCentury"></a>
      <span :class="`${prefixCls}-century`">
        {{startYear}}-{{endYear}}
      </span>
      <a role="button"
         :class="`${prefixCls}-next-century-btn`"
         :title="locale.nextCentury"
         @click="nextCentury"></a>
    </div>
    <div :class="`${prefixCls}-body`">
      <decade-table :prefix-cls="prefixCls"
                    :locale="locale"
                    :value="currentYear"
                    :start="startYear"
                    :end="endYear"
                    @on-select="onSelect">
      </decade-table>
    </div>
  </div>
</template>

<script>
  import { getYear, addYears, setYear } from 'date-fns';
  import DecadeTable from './decadeTable.vue';

  export default {
    name: 'DecadePanel',
    props: {
      rootPrefixCls: String,
      locale: Object,
      value: Date,
    },
    data() {
      return {
        innerValue: this.value,
      };
    },
    computed: {
      prefixCls() {
        const { rootPrefixCls } = this;
        return `${rootPrefixCls}-decade-panel`;
      },
      currentYear() {
        const { innerValue } = this;
        return getYear(innerValue);
      },
      startYear() {
        const { currentYear } = this;
        return Math.floor(currentYear / 100) * 100;
      },
      endYear() {
        const { startYear } = this;
        return startYear + 99;
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
    methods: {
      goYear(direction) {
        const nYear = addYears(this.innerValue, direction);
        this.innerValue = nYear;
        return nYear;
      },
      prevCentury() {
        this.goYear(-100);
      },
      nextCentury() {
        this.goYear(100);
      },
      onSelect(value) {
        const { value: originVal, startYear, endYear } = this;
        if (value < startYear) {
          this.prevCentury();
        } else if (value > endYear) {
          this.nextCentury();
        } else {
          this.$emit('on-select', setYear(originVal, value));
        }
      },
    },
    components: {
      DecadeTable,
    },
  };
</script>
