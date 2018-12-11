export default {
  computed: {
    placeholderNode() {
      return this.renderPlaceholderNode();
    },
  },
  methods: {
    renderPlaceholderNode() {
      const { prefixCls, placeholder, searchInputValue } = this;
      return !searchInputValue && placeholder ? (
        <span key="placeholder" class={`${prefixCls}-selection__placeholder`}>
          {placeholder}
        </span>
      ) : null;
    },
  },
};
