import { buildComponentName } from '../utils';
import { getPosition, getCirclePath } from './utils';
import Props from './props';

export default {
  name: buildComponentName('ProgressCircle'),
  props: {
    ...Props,
    trailWidth: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    radius() {
      const { strokeWidth } = this;
      // prettier-ignore
      return 50 - (strokeWidth / 2);
    },
    circlePath() {
      const { gapPosition, radius } = this;
      // eslint-disable-next-line
      return getCirclePath(getPosition(gapPosition, radius), radius);
    },
    circumference() {
      const { radius } = this;
      return Math.PI * 2 * radius;
    },
    arcLength() {
      const { gapDegree, radius } = this;
      // prettier-ignore
      return (gapDegree * Math.PI * radius) / 180;
    },
    trailStyle() {
      const { circumference, arcLength, trailColor } = this;
      return {
        stroke: trailColor,
        strokeDasharray: `${circumference - arcLength}px ${circumference}px`,
        strokeDashoffset: `-${arcLength / 2}px`,
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
      };
    },
    strokeStyle() {
      const {
        circumference, arcLength, percentage, strokeColor
      } = this;

      return {
        stroke: strokeColor,
        // prettier-ignore
        strokeDasharray: `${(percentage / 100) * (circumference - arcLength)}px ${circumference}px`,
        strokeDashoffset: `-${arcLength / 2}px`,
        transition:
          'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
      };
    },
  },
  render() {
    const {
      $attrs,
      prefixCls,
      percentage,
      circlePath,
      trailWidth,
      strokeWidth,
      trailStyle,
      strokeStyle,
      strokeLinecap,
    } = this;
    const svgAttrs = {
      viewBox: '0 0 100 100',
      ...$attrs,
    };
    return (
      <svg {...{ class: `${prefixCls}-circle`, attrs: svgAttrs }}>
        <path
          class={`${prefixCls}-circle-trail`}
          style={trailStyle}
          fill="none"
          d={circlePath}
          stroke-width={trailWidth || strokeWidth}
        />
        <path
          class={`${prefixCls}-circle-path`}
          style={strokeStyle}
          fill="none"
          d={circlePath}
          stroke-width={percentage === 0 ? 0 : strokeWidth}
          stroke-linecap={strokeLinecap}
        />
      </svg>
    );
  },
};
