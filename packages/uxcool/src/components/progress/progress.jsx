import { isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { defaultInfoFormat } from './utils';
import Icon from '../icon';
import Props from './props';
import Circle from './circle';

export default {
  name: buildComponentName('Progress'),
  props: {
    ...Props,
    prefixCls: {
      type: String,
      default: 'ux-progress',
    },
    type: {
      type: String,
      default: 'line',
      validator(val) {
        return ['line', 'circle', 'dashboard'].indexOf(val) > -1;
      },
    },
    format: {
      type: Function,
      default: null,
    },
    status: {
      type: String,
      default: null,
      validator(val) {
        return ['default', 'success', 'error', 'active'].indexOf(val) > -1;
      },
    },
    hideInfo: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'small'].indexOf(val) > -1;
      },
    },
  },
  computed: {
    validPercent() {
      const { percentage } = this;
      let percent = percentage;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      return percent;
    },
    progressStatus() {
      const { validPercent, status } = this;
      let nStatus = status;
      if (nStatus === 'error') {
        nStatus = 'exception';
      } else if (nStatus === 'default') {
        nStatus = 'normal';
      }
      return Number(validPercent) >= 100 && nStatus === null ? 'success' : nStatus || 'normal';
    },
    classes() {
      const {
        prefixCls, type, hideInfo, size, progressStatus
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${type === 'dashboard' ? 'circle' : type}`]: true,
        [`${prefixCls}-show-info`]: !hideInfo,
        [`${prefixCls}-status-${progressStatus}`]: true,
        [`${prefixCls}-${size}`]: size,
      };
    },
    lineStyle() {
      const {
        validPercent, strokeWidth, size, strokeColor, strokeLinecap
      } = this;

      return {
        width: `${validPercent}%`,
        height: `${strokeWidth || (size === 'small' ? 6 : 8)}px`,
        background: strokeColor,
        borderRadius: strokeLinecap === 'square' ? 0 : '50px',
      };
    },
    circleStyle() {
      const { width } = this;
      const w = width || 120;
      return {
        width: `${w}px`,
        height: `${w}px`,
        fontSize: `${w * 0.15 + 6}px`, //eslint-disable-line
      };
    },
    progressInfo() {
      const {
        prefixCls, hideInfo, type, progressStatus, format, validPercent
      } = this;
      if (hideInfo) {
        return null;
      }

      const formatFn = isFunction(format) ? format : defaultInfoFormat;
      let info = '';
      if (isFunction(format) || (progressStatus !== 'success' && progressStatus !== 'exception')) {
        info = formatFn(validPercent);
      } else {
        let iconType = progressStatus === 'success' ? 'ok' : 'close';
        iconType = type === 'line' ? `${iconType}_circle` : iconType;
        info = <Icon type={iconType} />;
      }
      return <span class={`${prefixCls}-text`}>{info}</span>;
    },
  },
  methods: {
    renderLine() {
      const { prefixCls, progressInfo, lineStyle } = this;
      return (
        <div>
          <div class={`${prefixCls}-outer`}>
            <div class={`${prefixCls}-inner`}>
              <div class={`${prefixCls}-bg`} style={lineStyle} />
            </div>
          </div>
          {progressInfo}
        </div>
      );
    },
    renderCircle() {
      const {
        $props,
        prefixCls,
        circleStyle,
        type,
        gapPosition,
        gapDegree,
        strokeWidth,
        validPercent,
        progressInfo,
      } = this;
      let gapPos = gapPosition;
      let gapDeg = Number(gapDegree);
      gapDeg = !gapDeg || gapDeg < 0 ? 0 : gapDeg;

      if (type === 'dashboard') {
        if (!gapPos) {
          gapPos = 'bottom';
        }
        if (!gapDeg) {
          gapDeg = 75;
        }
      }

      const circleW = strokeWidth || 6;
      const props = {
        ...$props,
        gapDegree: gapDeg,
        gapPosition: gapPos || 'top',
        strokeWidth: circleW,
        trailWidth: circleW,
        percentage: validPercent,
      };
      return (
        <div class={`${prefixCls}-inner`} style={circleStyle}>
          <Circle {...{ props }} />
          {progressInfo}
        </div>
      );
    },
  },
  render() {
    const {
      classes, type, renderLine, renderCircle
    } = this;
    return <div class={classes}>{type === 'line' ? renderLine() : renderCircle()}</div>;
  },
};
