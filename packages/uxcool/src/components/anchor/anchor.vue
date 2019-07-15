<template>
  <div :class="`${prefixCls}-wrapper`">
    <div :class="prefixCls">
      <div :class="`${prefixCls}-ink`">
        <span :class="inkBallClasses" :style="`top: ${inkTop}px;`"></span>
      </div>
      <div :class="prefixCls">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import scrollTop from './utils';
  import { buildComponentName } from '../utils';

  const anchorRegex = /^\S+[^/](#\S+)$/;
  export default {
    name: buildComponentName('Anchor'),
    provide() {
      return {
        anchor: this,
      };
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-anchor',
      },
      offsetTop: {
        type: Number,
        default: 0,
      },
      showInk: {
        type: Boolean,
        default: true,
      },
      getContainer: {
        type: Function,
        default: () => null,
      },
      bounds: {
        type: Number,
        default: 5,
      },
      beforeHashChange: {
        type: Function,
        default: () => true,
      },
      beforeScroll: {
        type: Function,
        default: () => true,
      },
    },
    data() {
      return {
        currentLink: '', // #title1
        oldScrollTop: 0,
        newScrollTop: 0,
        titles: [],
      };
    },
    computed: {
      inkBallClasses() {
        const { prefixCls, showInk } = this;
        return {
          [`${prefixCls}-ink-ball`]: true,
          ["visible"]: showInk,
        };
      },
      currentId() {
        if (this.currentLink !== '') {
          return this.currentLink.substring(1);
        }
        return '';
      },
      inkTop() {
        const initTop = 11;
        const stepHeight = 28;
        const { titles, currentLink } = this;
        if (currentLink === '') {
          return initTop;
        }
        for (let i = 0; i < titles.length; i++) {
          if (titles[i] === currentLink) {
            return initTop + (i * stepHeight);
          }
        }
      },
      scrollContainer() {
        const { getContainer } = this;
        return getContainer() || window;
      },
      scrollElement() {
        const { getContainer, scrollContainer } = this;
        return getContainer() ? scrollContainer : (document.documentElement || document.body);
      },
      wrapperTop() {
        const { scrollContainer, scrollElement } = this;
        return scrollContainer === window ? 0 : scrollElement.offsetTop;
      },
    },
    watch: {
      getContainer() {
        this.init();
      }
    },
    created() {
      this.$nextTick(() => {
        this.init();
      });
    },
    beforeDestroy() {
      this.removeListener();
    },
    methods: {
      handleHashChange(href) {
        if (!href) {
          const url = decodeURI(window.location.href);
          const sharpLinkMatch = anchorRegex.exec(url);
          if (!sharpLinkMatch) return;
          [, this.currentLink] = sharpLinkMatch;
        } else {
          this.currentLink = href;
        }
      },
      handleScrollTo() {
        const anchor = document.getElementById(this.currentId);
        if (!anchor) return;
        let top = anchor.offsetTop;
        let cur = anchor.offsetParent;
        while (cur) {
          top += cur.offsetTop;
          cur = cur.offsetParent;
        }
        const offsetTop = top - this.wrapperTop - this.offsetTop;
        this.animating = true;
        scrollTop(this.scrollContainer, this.scrollElement.scrollTop, offsetTop, 600, () => {
          this.animating = false;
        });
      },
      addListener() {
        this.scrollContainer.addEventListener('scroll', this.scrollListener);
      },
      removeListener() {
        this.scrollContainer.removeEventListener('scroll', this.scrollListener);
      },
      updateTitlesOffset() {
        const { scrollElement, titles } = this;
        const offsets = [];
        titles.map(title => {
          const elm = document.getElementById(title.substring(1));
          if(elm) {
            let top = elm.offsetTop;
            let cur = elm.offsetParent;
            while (cur) {
              top += cur.offsetTop;
              cur = cur.offsetParent;
            }
            offsets.push({
              link: title,
              offset: top - scrollElement.offsetTop
            })
          }
        })
        return offsets;
      },
      scrollListener() {
        const { updateTitlesOffset, bounds, scrollElement, offsetTop } =  this;
        const elmOffsets = updateTitlesOffset();
        let scrollTop = scrollElement.scrollTop + offsetTop;
        scrollTop += bounds;
        let i = -1;
        while (++i < elmOffsets.length) {
          let currentEle = elmOffsets[i];
          let nextEle = elmOffsets[i + 1];
          if (scrollTop >= currentEle.offset && scrollTop < ((nextEle && nextEle.offset) || Infinity)) {
            this.currentLink = elmOffsets[i].link;
            break;
          }
        }
      },
      init() {
        this.handleHashChange();
        this.$nextTick(() => {
          this.removeListener();
          this.addListener();
          if (this.beforeScroll(this.currentLink)) {
            this.handleScrollTo();
          }
        });
      }
    },
  };
</script>
