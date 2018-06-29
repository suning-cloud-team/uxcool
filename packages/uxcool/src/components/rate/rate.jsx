import { isNumber, isDef } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import Icon from '../icon';
import Star from './star';

export default {
  name: buildComponentName('Rate'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-rate',
    },
    value: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 5,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowHalf: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    character: {
      type: String,
      default: '',
    },
    tabindex: {
      type: String,
      default: '0',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: 0,
      hoverValue: undefined,
      focused: false,
      cleanValue: null,
    };
  },
  computed: {
    classes() {
      const { prefixCls, disabled } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: disabled,
      };
    },
  },
  watch: {
    value(nVal) {
      if (isDef(nVal)) {
        this.innerValue = nVal;
      }
    },
  },
  created() {
    const { value } = this;
    this.innerValue = value;
  },
  mounted() {
    const { autofocus, disabled, focus } = this;
    if (autofocus && !disabled) {
      focus();
    }
  },
  methods: {
    onBlur() {
      if (this.disabled) {
        return;
      }
      this.focused = false;
      this.$emit('blur');
    },
    onFocus() {
      if (this.disabled) {
        return;
      }
      this.focused = true;
      this.$emit('focus');
    },
    focus() {
      const { $refs: { rateRef } } = this;
      if (rateRef) {
        rateRef.focus();
      }
    },
    blur() {
      const { $refs: { rateRef } } = this;
      if (rateRef) {
        rateRef.blur();
      }
    },
    onMouseLeave() {
      const { disabled } = this;
      if (disabled) {
        return;
      }
      this.hoverValue = undefined;
      this.cleanValue = null;
      this.$emit('hover-change');
    },
    onHover(e, { value }) {
      const { cleanValue } = this;
      if (cleanValue !== value) {
        this.hoverValue = value;
        this.cleanValue = null;
      }
      this.$emit('hover-change', value);
    },
    onClick(e, { value }) {
      const { innerValue, allowClear, onMouseLeave } = this;
      onMouseLeave();
      let relVal = value;
      if (allowClear) {
        if (value === innerValue) {
          this.cleanValue = innerValue;
          relVal = 0;
        }
      }
      this.innerValue = relVal;
      this.$emit('input', relVal);
      this.$emit('change', relVal);
    },

    renderStars() {
      const {
        $scopedSlots,
        character,
        count,
        innerValue,
        hoverValue,
        allowHalf,
        disabled,
        focused,
        onHover,
        onClick,
      } = this;

      const characterFn =
        $scopedSlots.character || (character && (() => character)) || (() => <Icon type="star" />);

      const stars = [];

      const on = {
        hover: onHover,
        click: onClick,
      };

      for (let i = 0; i < count; i += 1) {
        const props = {
          index: i,
          character: characterFn,
          value: isNumber(hoverValue) ? hoverValue : innerValue,
          allowHalf,
          disabled,
          focused,
        };

        stars.push(<Star {...{ props, on }} />);
      }

      return stars;
    },
  },
  render() {
    const {
      classes, disabled, tabindex, onMouseLeave, onFocus, onBlur, renderStars
    } = this;

    const on = {
      focus: onFocus,
      blur: onBlur,
      mouseleave: onMouseLeave,
    };
    const attrs = {
      tabindex: disabled ? -1 : tabindex,
    };

    return (
      <ul
        {...{
          class: classes,
          attrs,
          on,
          ref: 'rateRef',
        }}
      >
        {renderStars()}
      </ul>
    );
  },
};
