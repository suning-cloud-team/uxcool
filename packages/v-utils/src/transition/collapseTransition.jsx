import browser from '../browser';

export default {
  name: 'CollapseTransition',
  methods: {
    onEnter(el) {
      const nEl = el;
      const { width } = getComputedStyle(nEl);
      nEl.style.width = width;
      nEl.style.position = 'absolute';
      nEl.style.visibility = 'hidden';
      nEl.style.height = 'auto';

      const { height } = getComputedStyle(nEl);
      nEl.style.width = null;
      nEl.style.position = null;
      nEl.style.visibility = null;
      nEl.style.height = 0;
      setTimeout(() => {
        nEl.style.height = height;
        setTimeout(() => {
          nEl.style.opacity = 1;
        }, 0);
      }, 0);
    },
    onAfterEnter(el) {
      const nEl = el;
      nEl.style.height = null;
      nEl.style.opacity = null;
    },
    onLeave(el) {
      const nEl = el;
      const { height } = getComputedStyle(nEl);
      nEl.style.height = height;
      setTimeout(() => {
        nEl.style.height = 0;
        nEl.style.opacity = 0;
      });
    },
    onAfterLeave(el) {
      const nEl = el;
      nEl.style.height = null;
      nEl.style.opacity = null;
    },
  },
  render() {
    const {
      $slots, onEnter, onAfterEnter, onLeave, onAfterLeave
    } = this;

    const on = {
      enter: onEnter,
      afterEnter: onAfterEnter,
      leave: onLeave,
      afterLeave: onAfterLeave,
    };
    return browser.isIE9 ? (
      $slots.default
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
