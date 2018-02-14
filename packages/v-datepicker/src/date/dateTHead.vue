<template>
  <thead>
    <tr role="row">
      <th role="columnheader"
          v-for="(w,i) in weekDays"
          :key="i"
          :title="w.title"
          :class="`${prefixCls}-column-header`">
        <span :class="`${prefixCls}-column-header-inner`">
          {{w.name}}
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
      prefixCls: String,
      value: Date,
      locale: Object,
    },
    computed: {
      weekDays() {
        const { value } = this;
        const weekDays = [];
        for (let i = 0; i < DATE_STYLE.col; i += 1) {
          const weekDay = setDay(value, i);
          weekDays.push({
            id: i,
            title: formatDate(weekDay, 'dddd'),
            name: formatDate(weekDay, 'dd'),
          });
        }
        return weekDays;
      },
    },
  };
</script>