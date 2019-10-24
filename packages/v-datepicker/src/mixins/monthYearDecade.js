export default {
  inject: {
    monthYearDecadeRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.monthYearDecadeRoot;
    },
    monthYearHoverValue() {
      const { monthYearDecadeRoot, isChildren } = this;
      return isChildren ? monthYearDecadeRoot.getHoverValue() : null;
    },
    monthYearSelectedValue() {
      const { monthYearDecadeRoot, isChildren } = this;
      return isChildren ? monthYearDecadeRoot.getInnerValue() : null;
    },
  },

  methods: {
    onMonthYearDecadeRootHover(...args) {
      const { isChildren, monthYearDecadeRoot } = this;
      return isChildren ? monthYearDecadeRoot.onHover(...args) : false;
    },
  },
};
