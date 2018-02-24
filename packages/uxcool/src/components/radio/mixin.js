export default {
  inject: {
    root: {
      default() {
        return null;
      },
    },
  },
  computed: {
    isChildren() {
      return !!this.root;
    },
    rootDisabled() {
      return this.isChildren ? this.root.disabled : null;
    },
    rootValue() {
      return this.isChildren ? this.root.innerValue : null;
    },
    rootName() {
      return this.isChildren ? this.root.name : null;
    },
  },
  methods: {
    onGroupChange(value) {
      this.root.onGroupChange(value);
    },
  },
};
