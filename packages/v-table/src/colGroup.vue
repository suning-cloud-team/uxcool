<template>
  <colgroup>
    <col v-for="(col, i) in expandCellCols"
         :key="getKey(col, i)"
         :class="col.className"
         :style="colStyle(col)">
  </colgroup>
</template>


<script>
  import { getKey, isPxOrPercentage } from './utils';
  import SubMixin from './mixins/sub';

  export default {
    name: 'ColGroup',
    mixins: [SubMixin],
    computed: {
      cols() {
        const {
          fixed, flatColumns, leftFlatColumns, rightFlatColumns
        } = this;
        let cols = flatColumns;
        if (fixed === 'left') {
          cols = leftFlatColumns;
        } else if (fixed === 'right') {
          cols = rightFlatColumns;
        }
        return cols;
      },
      expandCellCols() {
        const {
          prefixCls, expandIconAsCell, fixed, cols
        } = this;
        const nCols = cols;
        if (fixed !== 'right' && expandIconAsCell) {
          nCols.unshift({
            className: `${prefixCls}-expand-icon-col`,
          });
        }
        return nCols;
      },
    },
    methods: {
      getKey,
      colStyle(col) {
        const { width } = col;
        let style = null;
        if (width) {
          const w = isPxOrPercentage(width) ? width : `${width}px`;
          style = {
            width: w,
            minWidth: w,
          };
        }

        return style;
      },
    },
  };
</script>
