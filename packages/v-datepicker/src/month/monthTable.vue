<template>
  <table :class="`${prefixCls}-table`"
         cellSpacing="0"
         role="grid">
    <tbody :class="`${prefixCls}-tbody`">
      <tr role="row"
          v-for="(row,i) in months"
          :key="i">
        <td role="cell"
            v-for="(col, j) in row"
            :key="j"
            :title="col.title"
            :class="cellClasses(col)"
            @click="onSelect(col)">
          <a :class="`${prefixCls}-month`">
            {{col.name}}
          </a>
        </td>
      </tr>
    </tbody>

  </table>
</template>


<script>
  import { setMonth, isSameMonth } from 'date-fns';
  import { MONTH_STYLE } from '../constant';
  import { formatDate } from '../utils';

  export default {
    name: 'MonthTable',
    props: {
      prefixCls: String,
      locale: Object,
      value: Date,
      disabledMonth: {
        type: Function,
        default() {
          return false;
        },
      },
    },
    computed: {
      months() {
        const { value, disabledMonth } = this;
        const months = [];
        let idx = 0;
        for (let i = 0; i < MONTH_STYLE.row; i += 1) {
          months[i] = [];
          for (let j = 0; j < MONTH_STYLE.col; j += 1) {
            const curMonth = setMonth(value, idx);
            const name = formatDate(curMonth, 'MMM');
            const disabled = disabledMonth(curMonth);
            months[i].push({
              id: idx,
              title: name,
              name,
              value: curMonth,
              disabled,
            });
            idx += 1;
          }
        }
        return months;
      },
    },
    methods: {
      onSelect(month) {
        if (month.disabled) {
          return;
        }
        this.$emit('on-select', month.value);
      },
      cellClasses(month) {
        const { prefixCls, value } = this;
        return {
          [`${prefixCls}-cell`]: true,
          [`${prefixCls}-cell-disabled`]: month.disabled,
          [`${prefixCls}-selected-cell`]: isSameMonth(value, month.value),
        };
      },
    },
  };
</script>
