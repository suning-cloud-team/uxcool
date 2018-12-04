import browser from '../browser';

export default {
  name: 'CollapseTransition',
  methods: {
    onEnter(el) {
      const nEl = el;
      const { width } = getComputedStyle(nEl);
      nEl.style.width = width;
      nEl.style.position = 'absolute';
      // firefox 有bug,貌似会渲染两次...,先注释掉
      // nEl.style.visibility = 'hidden';
      nEl.style.height = 'auto';

      const { height } = getComputedStyle(nEl);
      nEl.style.width = '';
      nEl.style.position = '';
      nEl.style.visibility = '';
      nEl.style.height = 0;
      setTimeout(() => {
        nEl.style.height = height;
        setTimeout(() => {
          nEl.style.opacity = 1;
        }, 10);
      }, 10);
    },
    onAfterEnter(el) {
      const nEl = el;
      nEl.style.height = '';
      nEl.style.opacity = '';
    },
    onBeforeLeave(el) {
      const nEl = el;
      nEl.style.opacity = 0;
    },
    onLeave(el) {
      const nEl = el;
      const { height } = getComputedStyle(nEl);
      nEl.style.height = height;
      nEl.style.opacity = 0;
      setTimeout(() => {
        nEl.style.height = 0;
      }, 10);
    },
    onAfterLeave(el) {
      const nEl = el;
      nEl.style.height = '';
      nEl.style.opacity = '';
    },
  },
  render() {
    const {
      $slots, onEnter, onAfterEnter, onLeave, onAfterLeave, onBeforeLeave
    } = this;

    const on = {
      enter: onEnter,
      afterEnter: onAfterEnter,
      beforeLeave: onBeforeLeave,
      leave: onLeave,
      afterLeave: onAfterLeave,
    };
    return browser.isIE9 ? (
      <div>{$slots.default}</div>
      ) : (
      <transition
        {...{
          props: {
            name: 'ux-motion-collapse',
          },
          on,
        }}
      >
        {$slots.default}
      </transition>
    );
  },
};
