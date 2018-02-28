export default {
  inject: ['uRootVM'],
  computed: {
    prefixCls() {
      return this.uRootVM.prefixCls;
    },
    selectedRowKeys() {
      return this.uRootVM.selectedRowKeys;
    },
  },
};
