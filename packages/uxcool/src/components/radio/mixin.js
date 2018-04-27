export default {
  inject: {
    radioGroupRoot: {
      default() {
        return null;
      },
    },
  },
  computed: {
    isChildren() {
      return !!this.radioGroupRoot;
    },
    rootDisabled() {
      return this.isChildren ? this.radioGroupRoot.disabled : null;
    },
    rootValue() {
      return this.isChildren ? this.radioGroupRoot.innerValue : null;
    },
    rootName() {
      return this.isChildren ? this.radioGroupRoot.name : null;
    },
  },
  methods: {
    onGroupChange(value) {
      this.radioGroupRoot.onGroupChange(value);
    },
  },
};
