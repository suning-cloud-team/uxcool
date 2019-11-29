import createDetectElementResize from './detectElementResize';

export default {
  name: 'AutoSizer',
  props: {
    unitKey: {
      type: String,
      required: true,
    },
    onResize: {
      type: Function,
      default: null,
    },
    nonce: {
      type: String,
      default: ''
    },
    disableHeight: {
      type: Boolean,
      default: false
    },
    disableWidth: {
      type: Boolean,
      default: false
    },

  },
  data() {
    return {
      detectElementResize: null,
      state: {
        height: 0,
        width: 0
      }
    };
  },
  computed: {
  },
  mounted() {
    const { nonce, onResizeCB, $el } = this;
    this.detectElementResize = createDetectElementResize(
      nonce,
      window,
    );
    this.detectElementResize.addResizeListener(
      $el,
      onResizeCB,
    );
    onResizeCB();
  },
  beforedestory() {
    const { detectElementResize, $el, onResizeCB } = this;
    if (detectElementResize && $el) {
      detectElementResize.removeResizeListener(
        $el,
        onResizeCB,
      );
    }
  },
  methods: {
    onResizeCB() {
      const {
        disableHeight, disableWidth, onResize, unitKey, state
      } = this;
      const parentNode = this.$el;
      if (parentNode) {
        const height = parentNode.offsetHeight || 0;
        const width = parentNode.offsetWidth || 0;

        const style = window.getComputedStyle(parentNode) || {};
        const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
        const paddingRight = parseInt(style.paddingRight, 10) || 0;
        const paddingTop = parseInt(style.paddingTop, 10) || 0;
        const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

        const newHeight = height - paddingTop - paddingBottom;
        const newWidth = width - paddingLeft - paddingRight;
        if (
          (!disableHeight && state.height !== newHeight) ||
          (!disableWidth && state.width !== newWidth)
        ) {
          state.height = newHeight;
          state.width = newWidth;
          if (onResize) {
            onResize(unitKey, state);
          }
        }
      }
    },
  },
  render() {
    const slots = this.$slots.default || [];
    const { state: { height } } = this;
    return (<div
      {...{
        attrs: {
          'data-auto-height': `${height}`,
        },
        class: {
          'ux-auto-sizer': true,
        }
      }}>
      {slots}
    </div>);
  },
};
