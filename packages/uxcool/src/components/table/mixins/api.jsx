/**
 * Table Public API
 */
export default {
  methods: {
    alignRowHeight() {
      const {
        $refs: { tableRef },
        virtualScroll,
      } = this;
      if (tableRef) {
        if (!virtualScroll) {
          this.$nextTick(() => {
            tableRef.handleWinResize();
          });
        } else {
          tableRef.forceUpdate();
        }
      }
    },
  },
};
