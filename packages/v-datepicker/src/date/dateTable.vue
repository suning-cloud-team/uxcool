<template>
  <table :class="`${prefixCls}-table`"
         cellSpacing="0"
         role="grid">
    <date-thead :prefix-cls="prefixCls"
                :value="value"
                :selected-value="selectedValue"
                :locale="normlizeLocale"
                :show-week-number="showWeekNumber" />

    <date-tbody :prefix-cls="prefixCls"
                :value="value"
                :selected-value="selectedValue"
                :locale="normlizeLocale"
                :format="format"
                :range-values="rangeValues"
                :hover-values="hoverValues"
                :disabled-date="disabledDate"
                :date-render="dateRender"
                :content-render="contentRender"
                :show-week-number="showWeekNumber"
                @on-day-hover="onDayHover"
                @on-select="onSelect" />
  </table>
</template>

<script>
  import DateThead from './dateTHead.vue';
  import DateTbody from './dateTBody';

  export default {
    name: 'DateTable',
    components: {
      DateThead,
      DateTbody,
    },
    props: {
      prefixCls: {
        type: String,
        default: undefined,
      },
      value: {
        type: Date,
        default: undefined,
      },
      selectedValue: {
        type: [Date, Array],
        default: undefined,
      },
      locale: {
        type: Object,
        default: undefined,
      },
      format: {
        type: String,
        default: undefined,
      },
      showWeekNumber: {
        type: Boolean,
        default: false,
      },
      rangeValues: {
        type: Array,
        default() {
          return [];
        },
      },
      hoverValues: {
        type: Array,
        default() {
          return [];
        },
      },
      disabledDate: {
        type: Function,
        default() {
          return false;
        },
      },
      dateRender: {
        type: Function,
        default: null,
      },
      contentRender: {
        type: Function,
        default: null,
      },
    },
    computed: {
      normlizeLocale() {
        const { locale = {} } = this;

        return {
          WeekLocale: {
            // default zh_CN
            weekStartsOn: 1,
            /* Monday */
            firstWeekContainsDate: 4,
          },
          ...locale,
        };
      },
    },
    methods: {
      onSelect(value) {
        this.$emit('on-select', value);
        this.$emit('select', value);
      },
      onDayHover(value) {
        this.$emit('on-day-hover', value);
        this.$emit('day-hover', value);
      },
    },
  };
</script>
