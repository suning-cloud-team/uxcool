export default {
  inject: {
    multiCalendarRoot: {
      default: false,
    },
  },
  computed: {
    isMultiCalendarChildren() {
      return !!this.multiCalendarRoot;
    },
    mutliFormatSeparator() {
      const { isMultiCalendarChildren, multiCalendarRoot } = this;
      return isMultiCalendarChildren ? multiCalendarRoot.formatSeparator : '';
    },
  },
  methods: {
    onMultiCalendarSelect(value) {
      const { isMultiCalendarChildren, multiCalendarRoot } = this;
      return isMultiCalendarChildren ? multiCalendarRoot.onSelect(value) : false;
    },
    onMultiCalendarUnSelect(value) {
      const { isMultiCalendarChildren, multiCalendarRoot } = this;

      return isMultiCalendarChildren ? multiCalendarRoot.onUnSelect(value) : false;
    },
  },
};
