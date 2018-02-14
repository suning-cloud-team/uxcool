import { getRefName } from './utils';
import SubMixin from './mixins/sub';
import BaseTable from './baseTable.vue';

export default {
  name: 'BodyTable',
  components: {
    BaseTable,
  },
  mixins: [SubMixin],
  props: {
    hasHead: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    refName() {
      return getRefName(this.fixed, 'bodyTableRef');
    },
    style() {
      const {
        isFixedHeader, fixed, bodyStyle, scroll, scrollBarW
      } = this;
      let style = {};
      if (scroll.x && !fixed) {
        style.overflowX = 'auto';
      }

      if (scroll.y && !fixed) {
        // if (scroll.y) {
        style.maxHeight = typeof scroll.y === 'boolean' ? scroll.y : `${scroll.y}px`;
        style.overflowY = 'scroll';
      }

      if (scroll.x || scroll.y) {
        // bug retina ,chrome overflow auto
        // https://bibwild.wordpress.com/2015/07/04/long-standing-bug-in-chrome-webkit-on-page-not-being-drawn-scrollauto-retina/
        style.webkitTransform = 'translate3d(0,0,0)';
      }

      style = { ...style, ...bodyStyle };

      // header fixed
      if (isFixedHeader && fixed && scrollBarW > 0) {
        style.marginBottom = `-${scrollBarW}px`;
        style.paddingBottom = 0;
      }
      return style;
    },
    fixedInnerStyle() {
      const { scroll } = this;
      const style = {};
      if (scroll.y) {
        style.maxHeight = typeof scroll.y === 'boolean' ? scroll.y : `${scroll.y}px`;
        style.overflowY = 'scroll';
      }
      return style;
    },
    hasFixedElement() {
      const { fixed, isAnyColumnsLeftFixed, isAnyColumnsRightFixed } = this;
      if (fixed === 'left') {
        return isAnyColumnsLeftFixed;
      } else if (fixed === 'right') {
        return isAnyColumnsRightFixed;
      }
      return false;
    },
  },
  mounted() {
    const { $refs, refName } = this;
    this.saveRef(refName, $refs[refName]);
  },
  methods: {
    onScroll(e) {
      e.stopPropagation();
      this.$emit('body-scroll', e);
    },
  },
  render() {
    const {
      prefixCls,
      hasHead,
      fixed,
      refName,
      style,
      fixedInnerStyle,
      hasFixedElement,
      onScroll,
    } = this;
    const table = <base-table has-body has-head={hasHead} fixed={fixed} />;

    // left and right fixed时渲染列表
    if (fixed) {
      return hasFixedElement ? (
        <div class={`${prefixCls}-body-outer`} style={style}>
          <div
            ref={refName}
            class={`${prefixCls}-body-inner`}
            style={fixedInnerStyle}
            on-scroll={onScroll}
          >
            {table}
          </div>
        </div>
        ) : null;
    }
    return (
      <div ref={refName} class={`${prefixCls}-body`} style={style} on-scroll={onScroll}>
        {table}
      </div>
    );
  },
};
