import { isPlainObject } from '@suning/v-utils';
import { isValueOutOfRange, isMarkActive } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: 'SliderMarks',
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
    markPrefixCls() {
      const { prefixCls } = this;
      return `${prefixCls}-mark`;
    },
    points() {
      const { marks, min, max } = this;
      return Object.keys(marks)
        .map(parseFloat)
        .filter(v => !isValueOutOfRange(v, min, max))
        .sort((a, b) => a - b);
    },
    markElements() {
      const {
        markPrefixCls,
        points,
        marks,
        vertical,
        calcOffset,
        included,
        upperBound,
        lowerBound,
        onClick,
      } = this;
      const unit = points.length > 1 ? 100 / (points.length - 1) : 100;
      const markWidth = unit * 0.9;
      const elements = [];
      for (let i = 0, l = points.length; i < l; i += 1) {
        const point = points[i];

        let mark = marks[points[i]];
        mark = isPlainObject(mark)
          ? mark
          : {
            label: mark,
          };
        const isActive = isMarkActive(point, included, lowerBound, upperBound);
        const className = {
          [`${markPrefixCls}-text`]: true,
          [`${markPrefixCls}-text-active`]: isActive,
        };
        const style = vertical
          ? {
            marginBottom: '-50%',
            bottom: `${calcOffset(point)}%`,
          }
          : {
            width: `${markWidth}%`,
            marginLeft: `${-markWidth / 2}%`,
            left: `${calcOffset(point)}%`,
          };

        const on = {
          mousedown(e) {
            onClick(e, point);
          },
          touchstart(e) {
            onClick(e, point);
          },
        };

        const element = (
          <span class={className} style={[mark.style, style]} {...{ on }}>
            {mark.label}
          </span>
        );
        elements.push(element);
      }
      return elements;
    },
  },
  methods: {
    onClick(e, point) {
      this.$emit('click', e, point);
    },
  },
  render() {
    const { markPrefixCls, markElements } = this;
    return <div class={markPrefixCls}>{markElements}</div>;
  },
};
