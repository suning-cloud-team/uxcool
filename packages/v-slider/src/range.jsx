import { isDef } from '@cloud-sn/v-utils';
import { getNeedMovePoint, preventEvent, ensureValueInRange, ensureValuePrecision } from './utils';
import CommonMixin from './mixins/common';

export default {
  name: 'SliderRange',
  mixins: [CommonMixin],
  props: {
    value: {
      type: Array,
      default() {
        return null;
      },
    },
    count: {
      type: Number,
      default: 1,
    },
    allowCross: {
      type: Boolean,
      default: true,
    },
    pushable: {
      type: [Boolean, Number],
      default: false,
    },
    tabindex: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      pointTracks: [],
      innerValue: [],
      movePoint: null,
    };
  },
  computed: {
    tracksAndHandles() {
      const {
        $createElement,
        prefixCls,
        innerValue,
        movePoint,
        min,
        max,
        vertical,
        handleStyle,
        disabled,
        tabindex,
        handle,
        calcOffset,
        renderTrack,
        onFocus,
        onBlur,
      } = this;
      const offsets = innerValue.map(v => calcOffset(v));
      const handleClass = `${prefixCls}-handle`;
      const handles = offsets.map((offset, i) =>
        handle.call(
          {
            $createElement,
          },
          {
            ref: 'sliderHandleRef',
            refInFor: true,
            className: {
              [handleClass]: true,
              [`${handleClass}-${i + 1}`]: true,
            },
            style: handleStyle[i],
            vertical,
            offset,
            tabindex: disabled ? -1 : tabindex[i] || 0,
            disabled,
            min,
            max,
            value: innerValue[i],
            dragging: movePoint === i,
            index: i,
            on: disabled
              ? null
              : {
                focus: onFocus,
                blur: onBlur,
              },
          }
      ));
      const trackClass = `${prefixCls}-track`;
      const tracks = offsets.slice(0, -1).map((offset, i) =>
        renderTrack({
          className: { [trackClass]: true, [`${trackClass}-${i + 1}`]: true },
          offset,
          length: offsets[i + 1] - offset,
      }));
      return { tracks, handles };
    },
  },
  created() {
    const {
      count, min, setInnerValue, value
    } = this;
    setInnerValue(
      Array.isArray(value) && value.length > 0 ? value : [...Array(count + 1)].map(() => min),
      true,
      true
    );
    this.$watch(
      () => ({
        value: this.value,
        min: this.min,
        max: this.max,
      }),
      (o) => {
        const { innerValue, trimAlignValue, onChange } = this;
        const nVal = (o.value || []).map((v, i) => trimAlignValue(v, i)).sort((a, b) => a - b);
        if (nVal.length !== innerValue.length || !nVal.every((v, i) => v === innerValue[i])) {
          onChange(nVal);
        }
      }
    );
  },
  methods: {
    ensureValueNotConflict(movePoint, val) {
      const {
        allowCross, pushable, innerValue, max, min
      } = this;
      let r = val;
      const offset = Number(pushable);
      const len = innerValue.length;
      const mvPoint = !isDef(movePoint) ? this.movePoint : movePoint;
      // 当 allowCross = false ,则判定是否在pushable值的区间内
      if (!allowCross && isDef(mvPoint) && len > 0) {
        let lower = min;
        let upper = max;
        const prevValue = innerValue[mvPoint - 1];
        const nextValue = innerValue[mvPoint + 1];
        if (isDef(prevValue)) {
          lower = prevValue + offset;
        }
        if (isDef(nextValue)) {
          upper = nextValue - offset;
        }

        if (val < lower) {
          r = lower;
        } else if (val > upper) {
          r = upper;
        }
      }
      // console.log('confilct', val, r);
      return r;
    },
    trimAlignValue(val, movePoint) {
      const {
        step, marks, max, min, ensureValueNotConflict
      } = this;
      const nVal = ensureValueInRange(val, max, min);
      return ensureValuePrecision(ensureValueNotConflict(movePoint, nVal), { step, marks, min });
    },
    setInnerValue(val, isTrim = false, isSort = false) {
      const { trimAlignValue } = this;
      const nVal = isSort ? val.sort((a, b) => a - b) : val;
      this.innerValue = isTrim ? nVal.map((v, i) => trimAlignValue(v, i)) : nVal;
    },

    getLowerBound() {
      return this.innerValue[0];
    },
    getUpperBound() {
      const { innerValue } = this;
      return innerValue[innerValue.length - 1];
    },
    onChange(val) {
      const { setInnerValue } = this;
      setInnerValue(val);
      this.$emit('input', val);
      this.$emit('change', val);
    },
    ensureMovePoint(point) {
      const { pointTracks, innerValue } = this;
      let np = point;
      const pVal = innerValue[point];
      const heapIdxs = innerValue.reduce((r, v, i) => {
        const nr = r;
        if (v === pVal) {
          nr.push(i);
        }
        return nr;
      }, []);
      if (heapIdxs.length > 1) {
        for (let i = pointTracks.length - 1; i >= 0; i -= 1) {
          const pTrack = pointTracks[i];
          if (heapIdxs.indexOf(pTrack) > -1) {
            np = pTrack;
            break;
          }
        }
      }
      return np;
    },
    onStart(e, pos) {
      const {
        allowCross, innerValue, calcValueByPos, ensureMovePoint, onChange
      } = this;
      const points = [...innerValue];
      this.$emit('before-change', points);
      const val = calcValueByPos(pos);
      let point = getNeedMovePoint(val, innerValue);
      if (!allowCross) {
        point = ensureMovePoint(point);
      }
      this.movePoint = point;
      if (points[point] !== val) {
        points.splice(point, 1, val);
        onChange(points);
      }
    },
    moveTo(val) {
      const {
        innerValue, allowCross, movePoint, onChange
      } = this;
      let points = [...innerValue];
      // console.log('movePoint', movePoint);
      points.splice(movePoint, 1, val);
      if (allowCross) {
        points = points.sort((a, b) => a - b);
        this.movePoint = points.indexOf(val);
      }
      onChange(points);
    },
    onMove(e, pos) {
      preventEvent(e);
      const {
        innerValue, movePoint, calcValueByPos, moveTo
      } = this;
      const val = calcValueByPos(pos);
      // console.log('move', val);
      if (innerValue[movePoint] !== val) {
        moveTo(val);
      }
    },
    addPointTracks() {
      const { pointTracks, movePoint } = this;
      const idx = pointTracks.indexOf(movePoint);
      if (idx > -1) {
        pointTracks.splice(idx, 1);
      }
      pointTracks.push(movePoint);
    },
    onEnd() {
      const { addPointTracks, removeDocumentEvents } = this;
      addPointTracks();
      // console.log('pointTracks', this.pointTracks);
      this.movePoint = null;
      removeDocumentEvents();
      this.$emit('after-change', this.innerValue);
    },
  },
};
