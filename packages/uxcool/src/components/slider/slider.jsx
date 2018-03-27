import { isFunction } from '@suning/v-utils';
import { VSlider, VSliderRange } from '@suning/v-slider';
import { buildComponentName } from '../utils';
import Tooltip from '../tooltip';

const DELAY_TIME = 60 * 60 * 1000;
export default {
  name: buildComponentName('Slider'),
  props: {
    ...VSlider.props,
    ...VSliderRange.props,
    prefixCls: {
      type: String,
      default: 'ux-slider',
    },
    value: {
      type: [Number, Array],
      default: 0,
    },
    tooltipPrefixCls: {
      type: String,
      default: 'ux-tooltip',
    },
    range: {
      type: Boolean,
      default: false,
    },
    tipFormatter: {
      type: [Function, Boolean],
      default(val) {
        return val.toString();
      },
    },
    tabindex: {
      type: [Number, Array],
      default: 0,
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
      visibles: {},
    };
  },
  computed: {
    bindProps() {
      const {
        $props,
        handleWithTooltip,
        range,
        value,
        tabindex,
        count,
        allowCross,
        pushable,
      } = this;
      let r = null;
      if (range) {
        r = {
          value: Array.isArray(value) ? value : [value, value],
          tabindex: Array.isArray(tabindex) ? tabindex : [tabindex, tabindex],
          count,
          allowCross,
          pushable,
        };
      } else {
        r = {
          value: Array.isArray(value) ? value[0] : value,
          tabindex: Array.isArray(tabindex) ? tabindex[0] : tabindex,
        };
      }
      return {
        ...$props,
        handle: handleWithTooltip,
        ...r,
      };
    },
  },
  methods: {
    toggleTooltipVisible(index, visible) {
      const { visibles } = this;

      this.visibles = { ...visibles, [index]: visible };
    },
    handleWithTooltip({
      className, style, ref, refInFor, index, dragging, value, on, ...params
    }) {
      const {
        tipFormatter,
        tooltipPrefixCls,
        $refs: { tooltipRef },
        visibles,
        toggleTooltipVisible,
      } = this;
      const nativeOn = {
        mouseenter() {
          toggleTooltipVisible(index, true);
        },
        mouseleave() {
          toggleTooltipVisible(index, false);
        },
      };

      let visible = false;
      let tooltipProps = {
        // hack!!下面两个设置的作用等于不使用tooltip内部控制显示和隐藏的逻辑,完全手工控制显示和隐藏
        mouseEnterDelay: DELAY_TIME,
        mouseLeaveDelay: DELAY_TIME,
      };
      if (isFunction(tipFormatter)) {
        visible = visibles[index] || dragging;
        tooltipProps = {
          ...tooltipProps,
          prefixCls: tooltipPrefixCls,
          placement: 'top',
          content: tipFormatter(value, index),
          transitionName: 'zoom-down',
        };
        if (tooltipRef && tooltipRef[index]) {
          tooltipRef[index].setOpen(visible);
          tooltipRef[index].updateTooltipAlign();
        }
      }
      tooltipProps.visible = visible;

      const attrs = {
        ...params,
        value,
      };
      return (
        <Tooltip {...{ props: tooltipProps, ref: 'tooltipRef', refInFor: true }}>
          <VSlider.Handle
            {...{
              class: className,
              style,
              attrs,
              ref,
              refInFor,
              nativeOn,
              on,
            }}
          />
        </Tooltip>
      );
    },
  },
  render() {
    const {
      range, $listeners, bindProps, $attrs
    } = this;
    const sliderAttrs = { props: bindProps, attrs: $attrs, on: $listeners };
    return range ? <VSliderRange {...sliderAttrs} /> : <VSlider {...sliderAttrs} />;
  },
};
