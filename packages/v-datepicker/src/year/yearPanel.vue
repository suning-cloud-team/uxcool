<template>
  <div :class="classes">
    <div :class="`${prefixCls}-header`">
      <a :class="`${prefixCls}-prev-decade-btn`"
         role="button"
         :title="locale.previousDecade"
         @click="prevDecade"></a>
      <a :class="`${prefixCls}-decade-select`"
         @click="showDecadePanel">
        <span :class="`${prefixCls}-decade-select-content`">
          {{startYear}}-{{endYear}}
        </span>
      </a>
      <a :class="`${prefixCls}-next-decade-btn`"
         role="button"
         :title="locale.nextDecade"
         @click="nextDecade"></a>
    </div>
    <div :class="`${prefixCls}-body`">
      <year-table :prefix-cls="prefixCls"
                  :value="currentYear"
                  :start="startYear"
                  :end="endYear"
                  :locale="locale"
                  @on-select="onSelect">
      </year-table>
    </div>
  </div>
</template>


<script>
  import { getYear, addYears, setYear } from 'date-fns';
  import YearTable from './yearTable.vue';

  export default {
    name: 'YearPanel',
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
        return `${rootPrefixCls}-year-panel`;
      },
      classes() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
        };
      },
      currentYear() {
        const { innerValue } = this;
        return getYear(innerValue);
      },
      startYear() {
        const { currentYear } = this;
        return Math.floor(currentYear / 10) * 10;
      },
      endYear() {
        const { startYear } = this;
        return startYear + 9;
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
        this.$emit('on-change', nYear);
      },
      prevDecade() {
        this.goYear(-10);
      },
      nextDecade() {
        this.goYear(10);
      },
      showDecadePanel() {
        this.$emit('on-show-decade-panel');
      },
      onSelect(value) {
        const { value: originVal, startYear, endYear } = this;
        if (value < startYear) {
          this.prevDecade();
        } else if (value > endYear) {
          this.nextDecade();
        } else {
          this.$emit('on-select', setYear(originVal, value));
        }
      },
    },
    components: {
      YearTable,
    },
  };
</script>
