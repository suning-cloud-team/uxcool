import { addEventListener, debounce, getScroll, raf, easeInOutCubic } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { getAnchorRelateElement, getElementOffsetTop } from './utils';

export default {
  name: buildComponentName('Anchor'),
  provide() {
    return {
      anchorRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-anchor',
    },
    affix: {
      type: Boolean,
      default: false,
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    bounds: {
      type: Number,
      default: 5,
    },
    showInkInFixed: {
      type: Boolean,
      default: false,
    },
    getContainer: {
      type: Function,
      default() {
        return window;
      },
    },
  },
  data() {
    return {
      childrens: [],
      activeLink: null,
      scrollEvent: null,
      animating: false,
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
      };
    },
    container() {
      return this.getContainer();
    },
    inkBarStyle() {
      const { prefixCls, activeLink } = this;
      const style = {};
      if (activeLink) {
        const { $el } = activeLink;
        const elem = $el.querySelector(`.${prefixCls}-link-title`);
        // eslint-disable-next-line
        style.top = `${elem.offsetTop + elem.clientHeight / 2 - 4}px`;
      }
      return style;
    },
  },
  mounted() {
    const { container, scrollEvent, handleScroll } = this;
    handleScroll();
    if (!scrollEvent) {
      this.scrollEvent = addEventListener(container, 'scroll', debounce(handleScroll, 50));
    }
  },
  beforeDestroy() {
    const { scrollEvent } = this;
    if (scrollEvent) {
      scrollEvent.remove();
    }
  },
  methods: {
    setActiveLink(link) {
      const { activeLink } = this;
      if (activeLink !== link) {
        this.activeLink = link;
        let hash = '';
        if (link) {
          hash = link.href.indexOf('#') === 0 ? link.href : `#${link.href || ''}`;
        }
        if (this.$router) {
          this.$router.push(hash);
        } else {
          window.location.hash = hash;
        }
      }
    },
    setScrollTop(top, target) {
      const nTarget = target;
      if (nTarget === window) {
        document.body.scrollTop = top;
        document.documentElement.scrollTop = top;
      } else {
        nTarget.scrollTop = top;
      }
    },
    scroll(startTime, scrollTop, targetTop) {
      const { scroll, container, setScrollTop } = this;
      const time = Date.now() - startTime;
      setScrollTop(easeInOutCubic(time, scrollTop, targetTop - scrollTop, 450), container);
      if (time < 450) {
        raf(scroll.bind(this, startTime, scrollTop, targetTop));
      } else {
        this.animating = false;
      }
    },
    scrollTo(link) {
      const { scroll, container } = this;
      const scrollTop = getScroll(container);
      const element = link.relateElement || getAnchorRelateElement(link.href);
      if (element) {
        const top = getElementOffsetTop(element, container);
        const targetTop = scrollTop + top;
        const startTime = Date.now();
        scroll(startTime, scrollTop, targetTop);
      }
    },
    getActiveLink() {
      const {
        childrens, container, offsetTop, bounds
      } = this;
      let r = null;
      let maxTop = -Infinity;
      for (let i = 0, l = childrens.length; i < l; i += 1) {
        const link = childrens[i];
        const element = link.relateElement || getAnchorRelateElement(link.href);

        if (element) {
          const top = getElementOffsetTop(element, container);
          if (top <= offsetTop + bounds && top > maxTop) {
            maxTop = top;
            r = link;
          }
        }
      }
      return r;
    },
    handleScroll() {
      const { setActiveLink, animating, getActiveLink } = this;
      if (animating) {
        return;
      }
      setActiveLink(getActiveLink());
    },
    handleScrollTo(link) {
      const { scrollTo, setActiveLink } = this;
      this.animating = true;
      scrollTo(link);
      setActiveLink(link);
    },
    addChildren(link) {
      const { childrens } = this;
      if (childrens.indexOf(link) === -1) {
        childrens.push(link);
      }
    },
    removeChildren(link) {
      const { childrens } = this;
      this.childrens = childrens.filter(v => v !== link);
    },
  },
  render() {
    const {
      $slots, prefixCls, classes, activeLink, inkBarStyle
    } = this;
    const inkClasses = {
      [`${prefixCls}-ink-ball`]: true,
      visible: activeLink,
    };
    const anchorElement = (
      <div class={[`${prefixCls}-wrapper`]}>
        <div class={classes}>
          <div class={`${prefixCls}-ink`}>
            <span class={inkClasses} style={inkBarStyle} />
          </div>
          {$slots.default}
        </div>
      </div>
    );
    return anchorElement;
  },
};
