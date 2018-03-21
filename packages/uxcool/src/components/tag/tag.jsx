import { buildComponentName } from '../utils';

const regColor = /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/;
export default {
  name: buildComponentName('Tag'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-tag',
    },
    color: {
      type: String,
      default: '',
    },
    colsable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPresetColor() {
      const { color } = this;
      return regColor.test(color);
    },
    classes() {
      const { prefixCls, color, isPresetColor } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
        // [`${prefixCls}-close`]: this.state.closing,
      };
    },
    style() {
      const { color, isPresetColor } = this;
      return {
        backgroundColor: color && !isPresetColor ? color : null,
      };
    },
    closeIcon() {
      const { colsable, onClose } = this;
      return colsable ? <Icon type="close" on-click={onClose} /> : null;
    },
  },
  methods: {
    onClose(e) {
      this.$emit('close', e);
    },
  },
  render() {
    const { classes, style, closeIcon } = this;
    return (
      <transition>
        <div class={classes} style={style}>
          {this.$slots.default}
          {closeIcon}
        </div>
      </transition>
    );
  },
};
