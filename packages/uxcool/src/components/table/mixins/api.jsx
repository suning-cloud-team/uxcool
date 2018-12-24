/**
 * Table Public API
 */
export default {
  methods: {
    alignRowHeight() {
      const { $refs: { tableRef } } = this;
      if (tableRef) {
        this.$nextTick(() => {
          tableRef.handleWinResize();
        });
      }
    },
  },
};
