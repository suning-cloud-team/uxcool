export default {
  computed: {
    validateFlags() {
      const { flags } = this.$validator;

      return Object.keys(flags).map((k) => flags[k]) || [];
    },
    /*
    untouched: true,
    touched: false,
    dirty: false,
    pristine: true,
    valid: null,
    invalid: null,
    validated: false,
    pending: false,
    required: false,
    changed: false
  */
    untouched() {
      return this.validateFlags.every((v) => !!v.untouched);
    },
    touched() {
      return !this.untouched;
    },
    pristine() {
      return this.validateFlags.every((v) => !!v.pristine);
    },
    dirty() {
      return !this.pristine;
    },
    valid() {
      return this.validateFlags.every((v) => !!v.valid);
    },
    invalid() {
      return !this.valid;
    },
    validated() {
      return this.validateFlags.some((v) => !!v.validated);
    },
    pending() {
      return this.validateFlags.some((v) => !!v.pending);
    },
    changed() {
      return this.validateFlags.some((v) => !!v.changed);
    },
  },
  created() {
    this.$watch(
      () => ({
        untouched: this.untouched,
        touched: this.touched,
        pristine: this.pristine,
        dirty: this.dirty,
        valid: this.valid,
        invalid: this.invalid,
        validated: this.validated,
        pending: this.pending,
        changed: this.changed,
      }),
      (obj) => {
        this.$emit('form-flags', obj);
      }
    );
  },
};
