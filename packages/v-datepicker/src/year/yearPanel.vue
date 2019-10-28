<template>
  <div :class="classes">
    <div :class="`${prefixCls}-header`">
      <a :class="`${prefixCls}-prev-decade-btn`"
         :title="locale.previousDecade"
         role="button"
         @click="prevDecade" />
      <a :class="`${prefixCls}-decade-select`"
         @click="showDecadePanel">
        <span :class="`${prefixCls}-decade-select-content`">
          {{ startYear }}-{{ endYear }}
        </span>
      </a>
      <a :class="`${prefixCls}-next-decade-btn`"
         :title="locale.nextDecade"
         role="button"
         @click="nextDecade" />
    </div>
    <div :class="`${prefixCls}-body`">
      <year-table :prefix-cls="prefixCls"
                  :value="currentYear"
                  :start="startYear"
                  :end="endYear"
                  :locale="locale"
                  :disabled-year="disabledYear"
                  @on-select="onSelect" />
    </div>
  </div>
</template>


<script>
  import { getYear, addYears, setYear } from 'date-fns';
  import YearTable from './yearTable.vue';

  export default {
    name: 'YearPanel',
    components: {
      YearTable,
    },
    props: {
      rootPrefixCls: String,
      locale: Object,
      value: Date,
      disabledYear: {
        type: Function,
        default: undefined,
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
      value(nVal) {
        this.setInnerValue(nVal, false);
      },
    },
    methods: {
      setInnerValue(value, trigger = true) {
        this.innerValue = value;
        if (trigger) {
          this.$emit('on-change', value);
        }
      },
      goYear(direction) {
        const nYear = addYears(this.innerValue, direction);
        this.setInnerValue(nYear);
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
        const { value: originVal, startYear, endYear, setInnerValue } = this;
        if (value < startYear) {
          this.prevDecade();
        } else if (value > endYear) {
          this.nextDecade();
        } else {
          const year = setYear(originVal, value);
          setInnerValue(year);
          this.$emit('on-select', year);
        }
      },
    },
  };
</script>
