import { preventEvent, ensureValueInRange, ensureValuePrecision } from './utils';
import CommonMixin from './mixins/common';

export default {
  name: 'Slider',
  mixins: [CommonMixin],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      innerValue: 0,
    };
  },
  computed: {
    tracksAndHandles() {
      const {
        prefixCls,
        innerValue,
        min,
        max,
        vertical,
        renderTrack,
        handle,
        handleStyle,
        disabled,
        tabindex,
        calcOffset,
        dragging,
        onFocus,
        onBlur,
      } = this;
      const offset = calcOffset(innerValue);
      const handles = handle.call(
        { $createElement: this.$createElement },
        {
          ref: 'sliderHandleRef',
          refInFor: true,
          className: `${prefixCls}-handle`,
          style: handleStyle[0] || handleStyle,
          offset,
          vertical,
          tabindex: disabled ? -1 : tabindex || 0,
          disabled,
          min,
          max,
          value: innerValue,
          dragging,
          index: 0,
          on: disabled
            ? null
            : {
              focus: onFocus,
              blur: onBlur,
            },
        }
      );
      const tracks = renderTrack({ className: `${prefixCls}-track`, offset: 0, length: offset });

      return { tracks, handles };
    },
  },
  created() {
    const { setInnerValue, value } = this;
    setInnerValue(value, true);
    this.$watch(
      () => ({
        value: this.value,
        min: this.min,
        max: this.max,
      }),
      (o) => {
        const { trimAlignValue, onChange, innerValue } = this;
        const val = trimAlignValue(o.value);
        if (val !== innerValue) {
          onChange(val);
        }
      }
    );
  },
  methods: {
    trimAlignValue(val) {
      const {
        step, min, max, marks
      } = this;
      return ensureValuePrecision(ensureValueInRange(val, max, min), { step, marks, min });
    },
    setInnerValue(val, isTrim = false) {
      this.innerValue = isTrim ? this.trimAlignValue(val) : val;
    },
    getLowerBound() {
      return this.min;
    },
    getUpperBound() {
      return this.innerValue;
    },
    onChange(val) {
      const { setInnerValue } = this;
      setInnerValue(val);
      this.$emit('input', val);
      this.$emit('change', val);
    },
    onStart(e, pos) {
      const { calcValueByPos, innerValue, onChange } = this;
      this.dragging = true;
      this.$emit('before-change', innerValue);
      const val = calcValueByPos(pos);
      if (innerValue !== val) {
        onChange(val);
      }
    },
    onMove(e, pos) {
      preventEvent(e);
      const { calcValueByPos, innerValue, onChange } = this;
      const val = calcValueByPos(pos);
      if (innerValue !== val) {
        onChange(val);
      }
    },
    onEnd() {
      const { removeDocumentEvents } = this;
      this.dragging = false;
      removeDocumentEvents();
      this.$emit('after-change', this.innerValue);
    },
  },
};
