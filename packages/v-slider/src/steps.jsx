import { isNumber } from '@cloud-sn/v-utils';
import { isValueOutOfRange, isMarkActive } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: 'SliderSteps',
  mixins: [SubMixin],
  props: {
    lowerBound: {
      type: Number,
      default: 0,
    },
    upperBound: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    points() {
      const {
        marks, dots, step, min, max
      } = this;
      const r = Object.keys(marks).map(parseFloat);
      if (dots && isNumber(step)) {
        for (let i = min; i <= max; i += step) {
          if (r.indexOf(i) === -1) {
            r.push(i);
          }
        }
      }
      return r.filter(v => !isValueOutOfRange(v, min, max)).sort((a, b) => a - b);
    },
    stepElements() {
      const {
        prefixCls,
        vertical,
        marks,
        points,
        included,
        lowerBound,
        upperBound,
        dotStyle,
        activeDotStyle,
        calcOffset,
      } = this;
      const elements = [];
      for (let i = 0, l = points.length; i < l; i += 1) {
        const point = points[i];
        const mark = marks[point] || {};
        const isActive = isMarkActive(point, included, lowerBound, upperBound);
        const className = {
          [`${prefixCls}-dot`]: mark.isDot !== false,
          [`${prefixCls}-dot-active`]: isActive,
        };

        const style = vertical
          ? {
            bottom: `${calcOffset(point)}%`,
          }
          : {
            left: `${calcOffset(point)}%`,
          };

        const element = (
          <span class={className} style={[style, dotStyle, isActive ? activeDotStyle : null]} />
        );
        elements.push(element);
      }
      return elements;
    },
  },
  render() {
    const { prefixCls, stepElements } = this;
    return <div class={`${prefixCls}-step`}>{stepElements}</div>;
  },
};
