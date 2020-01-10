<template>
  <thead>
    <tr role="row">
      <th v-for="(w,i) in weekDays"
          :key="i"
          :title="w.title"
          :class="cellClasses(w)"
          role="columnheader"
      >
        <span :class="`${prefixCls}-column-header-inner`">
          {{ w.name }}
        </span>
      </th>
    </tr>
  </thead>
</template>

<script>
  import { setDay } from 'date-fns';
  import { DATE_STYLE } from '../constant';
  import { formatDate } from '../utils';

  export default {
    name: 'DateTHead',
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
      showWeekNumber: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      weekDays() {
        const {
          value,
          locale: {
            DateFnsLocale,
            WeekLocale: { weekStartsOn },
          },
          showWeekNumber,
        } = this;
        const cols = DATE_STYLE.col;
        const weekDays = [];

        if (showWeekNumber) {
          weekDays.push({
            id: -1,
            title: '周',
            name: '',
            isWeek: true,
          });
        }

        for (let i = 0; i < cols; i += 1) {
          const idx = (i + weekStartsOn) % cols;
          const weekDay = setDay(value, idx);
          weekDays.push({
            id: i,
            title: formatDate(weekDay, 'dddd', { locale: DateFnsLocale }),
            name: formatDate(weekDay, 'dd', { locale: DateFnsLocale }),
          });
        }
        return weekDays;
      },
    },
    methods: {
      cellClasses(cell) {
        const { prefixCls } = this;
        const { isWeek } = cell;
        return {
          [`${prefixCls}-column-header`]: true,
          [`${prefixCls}-week-number-header`]: isWeek,
        };
      },
    },
  };
</script>
