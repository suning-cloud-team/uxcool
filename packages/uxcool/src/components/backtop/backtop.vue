<template>
  <transition name="fade">
    <div v-show="visible"
         :class="classes"
         @click="onClick">
      <slot>
        <div :class="`${prefixCls}-content`">
          <div :class="`${prefixCls}-icon`" />
        </div>
      </slot>
    </div>
  </transition>
</template>


<script>
  import debounce from 'lodash/debounce';
  import { raf, easeInOutCubic, addEventListener, getScroll } from '@suning/v-utils';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('BackTop'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-back-top',
      },
      visibilityHeight: {
        type: Number,
        default: 400,
      },
      getTarget: {
        type: Function,
        default() {
          return window;
        },
      },
    },
    data() {
      return {
        visible: false,
        scrollEvent: null,
      };
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
        };
      },
    },
    mounted() {
      const { getTarget, handleScroll } = this;
      const target = getTarget();
      this.scrollEvent = addEventListener(target, 'scroll', debounce(handleScroll, 50));
      this.handleScroll();
    },
    beforeDestroy() {
      const { scrollEvent } = this;
      if (scrollEvent) {
        scrollEvent.remove();
      }
    },
    methods: {
      handleScroll() {
        const { getTarget, visibilityHeight } = this;
        const target = getTarget();
        const scrollTop = getScroll(target, true);
        this.visible = scrollTop > visibilityHeight;
      },
      scroll(scrollTop, startTime, target) {
        const { scroll, setScrollTop } = this;
        const time = Date.now() - startTime;
        setScrollTop(easeInOutCubic(time, scrollTop, 0 - scrollTop, 450), target);
        if (time < 450) {
          raf(scroll.bind(this, scrollTop, startTime, target));
        }
      },
      setScrollTop(value, target) {
        const nTarget = target;
        if (nTarget === window) {
          document.body.scrollTop = value;
          document.documentElement.scrollTop = value;
        } else {
          nTarget.scrollTop = value;
        }
      },
      scrollToTop() {
        const { getTarget } = this;
        const target = getTarget();
        const scrollTop = getScroll(target, true);
        const now = Date.now();
        if (scrollTop > 0) {
          this.scroll(scrollTop, now, target);
        }
      },
      onClick(e) {
        this.scrollToTop();
        this.$emit('click', e);
      },
    },
  };
</script>
