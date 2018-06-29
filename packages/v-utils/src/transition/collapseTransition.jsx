import { raf } from '../utils';
import browser from '../browser';

export default {
  name: 'CollapseTransition',
  methods: {
    onEnter(el) {
      const nEl = el;
      const height = el.offsetHeight;
      nEl.style.height = 0;
      nEl.style.opacity = 0;
      raf(() => {
        raf(() => {
          nEl.style.height = `${height}px`;
          nEl.style.opacity = 1;
        });
      });
    },
    onAfterEnter(el) {
      const nEl = el;
      nEl.style.height = '';
      nEl.style.opacity = '';
    },
    onLeave(el) {
      const nEl = el;
      nEl.style.height = `${el.offsetHeight}px`;
      raf(() => {
        raf(() => {
          nEl.style.height = 0;
          nEl.style.opacity = 0;
        });
      });
    },
    onAfterLeave(el) {
      const nEl = el;
      nEl.style.height = '';
      nEl.style.opacity = '';
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
