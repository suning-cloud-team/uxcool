<template>
  <div role="align">
    <slot></slot>
  </div>
</template>

<script>
  import alignFn from 'dom-align';
  import { addEventListener } from './utils';

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
      disabled: Boolean,
      monitorBufferTime: {
        type: Number,
        default: 50,
      },
      monitorWinResize: Boolean,
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
            return {
              align,
              target,
              disabled,
              monitorBufferTime,
              monitorWinResize,
            };
          },
          (nVal, oVal) => {
            if (nVal !== oVal) {
              const { forceAlign, startMonitorWinResize, stopMonitorWinResize } = this;
              const {
                align, target, disabled, monitorBufferTime, monitorWinResize
              } = nVal;
              const {
                align: oAlign,
                disabled: oDisabled,
                target: oTarget,
                monitorBufferTime: oBufferTime,
              } = oVal;
              if (!disabled) {
                const ot = oTarget();
                const nt = target();
                if (oDisabled || align !== oAlign || ot !== nt) {
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
          $el, disabled, target, align
        } = this;
        if ($el.childElementCount !== 1) {
          throw new Error('仅支持有且必须有一个子元素');
        }
        const child = $el.firstElementChild;
        if (!disabled) {
          this.$nextTick().then(() => {
            this.$emit('on-align', child, alignFn(child, target(), align));
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
  };
</script>
