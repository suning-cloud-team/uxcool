<template>
  <table :class="`${prefixCls}-table`"
         cellSpacing="0"
         role="grid">
    <tbody :class="`${prefixCls}-tbody`">
      <tr role="row"
          v-for="(row,i) in years"
          :key="i">
        <td role="gridcell"
            v-for="(col, j) in row"
            :key="j"
            :title="col.title"
            :class="cellClasses(col)"
            @click="onSelect(col)">
          <a :class="`${prefixCls}-year`">
            {{col.name}}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { YEAR_STYLE } from '../constant';

  export default {
    name: 'YearTable',
    props: {
      prefixCls: String,
      value: Number,
      start: Number,
      end: Number,
      locale: Object,
      disabledYear: {
        type: Function,
        default() {
          return false;
        },
      },
    },
    computed: {
      years() {
        const { start, disabledYear } = this;
        const years = [];
        const tStart = start - 1;
        let idx = 0;
        for (let i = 0; i < YEAR_STYLE.row; i += 1) {
          years[i] = [];
          for (let j = 0; j < YEAR_STYLE.col; j += 1) {
            const name = tStart + idx;
            const disabled = disabledYear(new Date(name, 0, 1));
            years[i].push({
              id: idx,
              title: name,
              name,
              value: name,
              disabled,
            });
            idx += 1;
          }
        }
        return years;
      },
    },
    methods: {
      cellClasses(year) {
        const {
          prefixCls, value, start, end
        } = this;
        const yVal = year.value;
        return {
          [`${prefixCls}-cell`]: true,
          [`${prefixCls}-cell-disabled`]: year.disabled,
          [`${prefixCls}-selected-cell`]: yVal === value,
          [`${prefixCls}-last-decade-cell`]: yVal < start,
          [`${prefixCls}-next-decade-cell`]: yVal > end,
        };
      },
      onSelect(year) {
        if (year.disabled) {
          return;
        }
        this.$emit('on-select', year.value);
      },
    },
  };
</script>
