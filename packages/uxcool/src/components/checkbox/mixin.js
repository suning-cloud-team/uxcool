export default {
  inject: {
    checkboxGroupRoot: {
      default() {
        return null;
      },
    },
  },
  computed: {
    isChildren() {
      return !!this.checkboxGroupRoot;
    },
    rootDisabled() {
      return this.isChildren ? this.checkboxGroupRoot.disabled : null;
    },
    rootValue() {
      return this.isChildren ? this.checkboxGroupRoot.innerValue : null;
    },
  },
  methods: {
    toggleCheckbox(value) {
      this.checkboxGroupRoot.toggleCheckbox(value);
    },
  },
};
