import alignFn from 'dom-align';
import { warning, isEqual, addEventListener, isAsyncPlaceholder } from '@cloud-sn/v-utils';

function timerFn(fn, ms) {
  let timer;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function inner() {
    clear();
    timer = setTimeout(fn, ms);
  }

  inner.clear = clear;
  return inner;
}
export default {
  // 无影响 ? hw 07-25
  // abstract: true,
  props: {
    align: {
      type: Object,
      default() {
        return {};
      },
    },
    target: {
      type: Function,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    monitorBufferTime: {
      type: Number,
      default: 50,
    },
    monitorWinResize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      monitorFn: null,
      resizeFn: null,
      unWatch: () => {},
    };
  },
  created() {
    this.watchProps();
  },
  mounted() {
    const { forceAlign, disabled, monitorWinResize } = this;
    forceAlign();
    if (!disabled && monitorWinResize) {
      this.startMonitorWinResize();
    }
  },
  beforeDestroy() {
    this.stopMonitorWinResize();
    if (this.unWatch) {
      this.unWatch();
    }
  },
  methods: {
    watchProps() {
      this.unWatch = this.$watch(
        () => {
          const {
            align, target, monitorBufferTime, disabled, monitorWinResize
          } = this;
          const targetNode = target();
          return {
            align,
            targetNode,
            disabled,
            monitorBufferTime,
            monitorWinResize,
          };
        },
        (nVal, oVal) => {
          if (!isEqual(nVal, oVal)) {
            const { forceAlign, startMonitorWinResize, stopMonitorWinResize } = this;
            const {
              align, targetNode, disabled, monitorBufferTime, monitorWinResize
            } = nVal;
            const {
              align: oAlign,
              disabled: oDisabled,
              targetNode: oTargetNode,
              monitorBufferTime: oBufferTime,
            } = oVal;
            if (!disabled) {
              if (oDisabled || align !== oAlign || oTargetNode !== targetNode) {
                forceAlign();
              }
              if (monitorWinResize) {
                if (monitorBufferTime !== oBufferTime) {
                  stopMonitorWinResize();
                }
                startMonitorWinResize();
              } else {
                stopMonitorWinResize();
              }
            } else {
              stopMonitorWinResize();
            }
          }
        }
      );
    },
    forceAlign() {
      const {
        $el: child, disabled, target, align
      } = this;
      if (child.nodeType !== 1) {
        warning(false, 'Only one child element is supported and must be present');
        return;
      }
      if (!disabled) {
        this.$nextTick().then(() => {
          const originDp = child.style.display;
          child.style.display = '';
          this.$emit('on-align', child, alignFn(child, target(), align));
          child.style.display = originDp;
        });
      }
    },
    startMonitorWinResize() {
      const { resizeFn, forceAlign, monitorBufferTime } = this;
      if (!resizeFn) {
        this.monitorFn = timerFn(forceAlign, monitorBufferTime);
        this.resizeFn = addEventListener(window, 'resize', this.monitorFn);
      }
    },
    stopMonitorWinResize() {
      const { resizeFn, monitorFn } = this;
      if (resizeFn) {
        monitorFn.clear();
        resizeFn.remove();
        this.resizeFn = null;
      }
    },
  },
  render() {
    const { $slots } = this;
    const slotDefault = $slots.default;
    if (!slotDefault) {
      return null;
    }

    const children = slotDefault.filter(v => v.tag || isAsyncPlaceholder(v));

    if (!children.length) {
      return null;
    }

    return children[0];
  },
};
