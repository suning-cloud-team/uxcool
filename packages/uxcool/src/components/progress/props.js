export default {
  prefixCls: {
    type: String,
    default: 'ux-progress',
  },
  percentage: {
    type: [Number, String],
    default: 0,
  },
  strokeWidth: {
    type: [Number, String],
    default: null,
  },
  strokeLinecap: {
    type: String,
    default: 'round',
    validator(val) {
      return ['round', 'square'].indexOf(val) > -1;
    },
  },
  strokeColor: {
    type: String,
    default: '',
  },
  trailColor: {
    type: String,
    default: '#f3f3f3',
  },
  width: {
    type: [Number, String],
    default: 120,
  },
  gapDegree: {
    type: [Number, String],
    default: 0,
  },
  gapPosition: {
    type: String,
    default: null,
    validator(val) {
      return ['top', 'left', 'right', 'bottom'].indexOf(val) > -1;
    },
  },
};
