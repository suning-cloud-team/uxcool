export default {
  inject: ['uRootVM'],
  computed: {
    prefixCls() {
      return this.uRootVM.prefixCls;
    },
  },
};
