import { buildComponentName } from '../utils';
import Mixin from './mixin';
import { getAnchorRelateElement } from './utils';

export default {
  name: buildComponentName('AnchorLink'),
  mixins: [Mixin],
  props: {
    title: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '#',
    },
  },
  data() {
    return {
      // parent use
      relativeElement: null,
    };
  },
  computed: {
    prefixCls() {
      return `${this.rootPrefixCls}-link`;
    },
    isActive() {
      return this.activeLink === this;
    },
    classes() {
      const { prefixCls, isActive } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive,
      };
    },
    titleClasses() {
      const { prefixCls, isActive } = this;
      return {
        [`${prefixCls}-title`]: true,
        [`${prefixCls}-title-active`]: isActive,
      };
    },
  },
  watch: {
    href() {
      this.relativeElement = getAnchorRelateElement(this.href);
    },
  },
  mounted() {
    this.relativeElement = getAnchorRelateElement(this.href);
    this.addChildren(this);
  },
  beforeDestroy() {
    this.removeChildren(this);
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      this.scrollTo(this);
    },
  },
  render() {
    const {
      $slots, classes, titleClasses, href, title, handleClick
    } = this;
    return (
      <div class={classes}>
        <a class={titleClasses} href={href} on-click={handleClick}>
          {$slots.title || title}
        </a>
        {$slots.default}
      </div>
    );
  },
};
