import { flatCols, groupRows, groupCols } from '../utils';

export default {
  computed: {
    $$scope() {
      return this.rootVM || this;
    },
    normalizeColumns() {
      return this.$$scope.columns;
    },
    groupColumns() {
      return groupCols(this.normalizeColumns);
    },
    leftColumns() {
      const { groupColumns } = this;
      return groupColumns.filter(v => v.fixed === 'left' || v.fixed === true);
    },
    rightColumns() {
      const { groupColumns } = this;
      return groupColumns.filter(v => v.fixed === 'right');
    },
    isAnyColumnsFixed() {
      const { normalizeColumns } = this;
      return normalizeColumns.some(v => !!v.fixed);
    },
    isAnyColumnsLeftFixed() {
      const { leftColumns } = this;
      return leftColumns.length > 0;
    },
    isAnyColumnsRightFixed() {
      const { rightColumns } = this;
      return rightColumns.length > 0;
    },
    flatColumns() {
      return flatCols(this.normalizeColumns);
    },
    leftFlatColumns() {
      return flatCols(this.leftColumns);
    },
    rightFlatColumns() {
      return flatCols(this.rightColumns);
    },
    headerRows() {
      return groupRows(this.groupColumns);
    },
    leftHeaderRows() {
      return groupRows(this.leftColumns);
    },
    rightHeaderRows() {
      return groupRows(this.rightColumns);
    },
  },
};
