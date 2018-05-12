export default {
  inject: ['anchorRoot'],
  computed: {
    isChildren() {
      return !!this.anchorRoot;
    },
    rootPrefixCls() {
      return this.anchorRoot.prefixCls;
    },
    activeLink() {
      return this.anchorRoot.activeLink;
    },
  },
  methods: {
    addChildren(link) {
      this.anchorRoot.addChildren(link);
    },
    removeChildren(link) {
      this.anchorRoot.removeChildren(link);
    },
    scrollTo(link) {
      this.anchorRoot.handleScrollTo(link);
    },
  },
};
