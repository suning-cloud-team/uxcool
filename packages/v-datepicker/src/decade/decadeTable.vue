<template>
  <table role="grid"
         cellSpacing="0"
         :class="`${prefixCls}-table`">
    <tbody :class="`${prefixCls}-tbody`">
      <tr role="row"
          v-for="(row, i) in century"
          :key="i">
        <td role="gridcell"
            v-for="(col, j) in row"
            :key="j"
            :class="cellClasses(col)"
            @click="onSelect(col)">
          <a :class="`${prefixCls}-decade`">
            {{col.name}}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { CENTURY_STYLE } from '../constant';

  export default {
    name: 'DecadeTable',
    props: {
      prefixCls: String,
      locale: Object,
      value: Number,
      start: Number,
      end: Number,
    },
    computed: {
      century() {
        const { start } = this;
        const century = [];
        const tStart = start - 10;
        let idx = 0;
        for (let i = 0; i < CENTURY_STYLE.row; i += 1) {
          century[i] = [];
          for (let j = 0; j < CENTURY_STYLE.col; j += 1) {
            const sYear = tStart + idx * 10;
            const eYear = sYear + 9;
            const name = `${sYear}-${eYear}`;
            century[i].push({
              id: idx,
              title: name,
              name,
              start: sYear,
              end: eYear,
            });
            idx += 1;
          }
        }
        return century;
      },
    },
    methods: {
      cellClasses(col) {
        const {
          prefixCls, value, start, end
        } = this;
        return {
          [`${prefixCls}-cell`]: true,
          [`${prefixCls}-selected-cell`]: value >= col.start && value <= col.end,
          [`${prefixCls}-last-century-cell`]: col.start < start,
          [`${prefixCls}-next-century-cell`]: col.start > end,
        };
      },
      onSelect(col) {
        this.$emit('on-select', col.start);
      },
    },
  };
</script>