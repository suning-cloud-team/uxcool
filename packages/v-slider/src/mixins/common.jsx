import { addEventListener, warning } from '@suning/v-utils';
import {
  preventEvent,
  isTargetEvent,
  getPositionAndDragOffset,
  getMousePosition,
  getHandleCenterPosition,
} from '../utils';
import SliderHandle from '../handle';
import CalcMixin from './calc';
import Marks from '../marks';
import Steps from '../steps';

export default {
  provide() {
    return {
      root: this,
    };
  },
  mixins: [CalcMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'v-slider',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: [Number, Boolean],
      default: 1,
    },
    marks: {
      type: Object,
      default() {
        return {};
      },
    },
    included: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    handle: {
      type: Function,
      default({
        className, style, ref, refInFor, on, ...attrs
      }) {
        return (
          <SliderHandle
            {...{
              class: className,
              style,
              attrs,
              ref,
              refInFor,
              on,
            }}
          />
        );
      },
    },
    dots: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    handleStyle: {
      type: [Array, Object],
      default() {
        return {};
      },
    },
    trackStyle: {
      type: [Array, Object],
      default() {
        return {};
      },
    },
    railStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    dotStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    activeDotStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sliderRef: null,
      sliderDocument: null,
      dragging: false,
      dragOffset: 0,
      cancelEvents: {
        touchmove: null,
        touchend: null,
        mousemove: null,
        mouseend: null,
      },
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, disabled, vertical, marks
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-with-marks`]: Object.keys(marks).length,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical,
      };
    },
  },
  mounted() {
    const { $refs: { sliderRef }, validateMinMaxStep } = this;
    if (sliderRef) {
      this.sliderRef = sliderRef;
      this.sliderDocument = sliderRef.ownerDocument;
    }
    validateMinMaxStep();
  },
  beforeDestroy() {
    const { removeDocumentEvents } = this;
    removeDocumentEvents();
  },
  methods: {
    validateMinMaxStep() {
      if (process.env.NODE_ENV !== 'production') {
        const { step, max, min } = this;
        warning(
          step && Math.floor(step) === step ? (max - min) % step === 0 : true,
          'Slider[max] - Slider[min] = (%s) should be a multiple of Slider[step] = (%s)',
          max - min,
          step
        );
      }
    },
    renderTrack({ className, offset = 0, length = 0 }) {
      const { included, vertical, trackStyle } = this;
      const style = vertical
        ? {
          bottom: `${offset}%`,
          height: `${length}%`,
        }
        : {
          left: `${offset}%`,
          width: `${length}%`,
        };
      return included ? (
        <div class={className} style={[trackStyle[0] || trackStyle, style]} />
        ) : null;
    },
    addTouchEvents() {
      // const { cancelEvents } = this;
      // TODO:
    },
    addDocumentMouseEvents() {
      const {
        sliderDocument, onMouseMove, onEnd, cancelEvents
      } = this;
      cancelEvents.mousemove = addEventListener(sliderDocument, 'mousemove', onMouseMove);
      cancelEvents.mouseup = addEventListener(sliderDocument, 'mouseup', onEnd);
    },
    removeDocumentEvents() {
      const { cancelEvents } = this;
      Object.keys(cancelEvents).forEach((k) => {
        const listener = cancelEvents[k];
        if (listener) {
          listener.remove();
        }
      });
    },
    onTouchStart(e) {
      preventEvent(e);
    },
    onMouseDown(e) {
      const {
        vertical,
        onStart,
        $refs: { sliderHandleRef },
        removeDocumentEvents,
        addDocumentMouseEvents,
      } = this;
      // only left mouse  click
      if (e.button !== 0) {
        return;
      }
      preventEvent(e);
      const { position, dragOffset } = getPositionAndDragOffset(
        e,
        vertical,
        isTargetEvent(e, sliderHandleRef)
      );
      this.dragOffset = dragOffset;
      removeDocumentEvents();
      onStart(e, position);
      addDocumentMouseEvents();
    },
    onMouseMove(e) {
      const { onMove, dragOffset, vertical } = this;
      const position = getMousePosition(e, vertical);
      onMove(e, position - dragOffset);
    },
    onMouseUp() {},
    onFocus(e) {
      const { onStart, vertical } = this;
      this.dragOffset = 0;
      onStart(e, getHandleCenterPosition(vertical, e.target));
      this.$emit('focus', e);
    },
    onBlur(e) {
      const { onEnd } = this;
      onEnd(e);
      this.$emit('blur', e);
    },
    focus() {
      const { disabled, $refs: { sliderHandleRef } } = this;
      if (!disabled && sliderHandleRef && sliderHandleRef.length > 0) {
        sliderHandleRef[0].focus();
      }
    },
    blur() {
      const { disabled, $refs: { sliderHandleRef } } = this;
      if (!disabled && sliderHandleRef && sliderHandleRef.length > 0) {
        sliderHandleRef[0].blur();
      }
    },
  },
  render() {
    const {
      prefixCls,
      classes,
      railStyle,
      disabled,
      onTouchStart,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      tracksAndHandles: { tracks, handles },
      getLowerBound,
      getUpperBound,
    } = this;
    const on = disabled
      ? null
      : {
        touchstart: onTouchStart,
        mousedown: onMouseDown,
        mouseup: onMouseUp,
        focus: onFocus,
        blur: onBlur,
      };

    const upperBound = getUpperBound();
    const lowerBound = getLowerBound();
    return (
      <div ref="sliderRef" class={classes} {...{ on }}>
        <div class={`${prefixCls}-rail`} style={[railStyle]} />
        {tracks}
        <Steps lower-bound={lowerBound} upper-bound={upperBound} />
        {handles}
        <Marks lower-bound={lowerBound} upper-bound={upperBound} />
      </div>
    );
  },
};
