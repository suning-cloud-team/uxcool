import { isTextNode } from '@suning/v-utils';
import Icon from '../icon';
import { buildComponentName } from '../utils';

const regTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const sizeMapping = {
  small: 'sm',
  large: 'lg',
};
export default {
  name: buildComponentName('Button'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-btn',
    },
    type: {
      type: String,
      default: '',
      validate(val) {
        return ['primary', 'ghost', 'dashed', 'danger'].indexOf(val) > -1;
      },
    },
    shape: {
      type: String,
      default: '',
      validate(val) {
        return ['circle', 'circle-outline'].indexOf(val) > -1;
      },
    },
    size: {
      type: String,
      default: 'default',
      validate(val) {
        return ['small', 'default', 'large'].indexOf(val) > -1;
      },
    },
    loading: {
      type: [Boolean, Object],
      default: false,
    },
    htmlType: {
      type: String,
      default: 'button',
      validate(val) {
        return ['button', 'submit', 'reset'].indexOf(val) > -1;
      },
    },
    icon: {
      type: String,
      default: '',
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isMounted: false,
      innerLoading: false,
      clicked: false,
      timeout: null,
      delayTimeout: null,
    };
  },
  computed: {
    sizeType() {
      const { size } = this;
      return sizeMapping[size];
    },
    classes() {
      const {
        prefixCls, type, shape, sizeType, innerLoading, clicked, ghost
      } = this;

      return {
        [prefixCls]: true,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-${sizeType}`]: !!sizeType,
        [`${prefixCls}-loading`]: !!innerLoading,
        [`${prefixCls}-clicked`]: !!clicked,
        [`${prefixCls}-background-ghost`]: !!ghost,
      };
    },
    bindProps() {
      const { $props } = this;
      return { ...$props };
    },
    iconType() {
      const { icon, innerLoading } = this;
      return innerLoading ? 'loading' : icon;
    },
    iconNode() {
      const { iconType } = this;
      return iconType ? <Icon type={iconType} /> : null;
    },
  },
  watch: {
    loading() {
      this.initLoading();
    },
  },
  created() {
    this.initLoading();
  },
  mounted() {
    this.isMounted = true;
  },
  beforeDestroy() {
    const { timeout, delayTimeout } = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }
  },
  methods: {
    initLoading() {
      const { loading, delayTimeout } = this;
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
      if (typeof loading !== 'boolean' && loading && loading.delay) {
        this.delayTimeout = setTimeout(() => {
          this.innerLoading = loading;
        }, loading.delay);
      } else {
        this.innerLoading = !!loading;
      }
    },
    onClick(e) {
      this.clicked = true;
      this.timeout = setTimeout(() => {
        this.clicked = false;
      }, 500);
      this.$emit('click', e);
    },
    hasTwoCNChars(slotDefault) {
      const { $el, isMounted, iconType } = this;
      if (!isMounted) {
        return false;
      }

      if (!slotDefault || slotDefault.length !== 1) {
        return false;
      }

      if (iconType && iconType !== 'loading') {
        return false;
      }

      return regTwoCNChar.test($el.innerText);
    },
    getSlotNode(slotNode) {
      if (!slotNode) {
        return null;
      }
      return slotNode.map((v) => {
        if (isTextNode(v)) {
          return <span>{v}</span>;
        }
        return v;
      });
    },
  },
  render() {
    const {
      $slots,
      prefixCls,
      classes,
      bindProps,
      href,
      icon,
      htmlType,
      iconNode,
      hasTwoCNChars,
      getSlotNode,
      onClick,
    } = this;
    const attrs = {
      type: htmlType,
    };
    let Cmp = 'button';
    if (href) {
      Cmp = 'a';
      attrs.href = href;
      delete attrs.type;
    }
    const on = {
      click: onClick,
    };
    const slotDefault = $slots.default;
    const slotClasses = {
      [`${prefixCls}-icon-only`]: !slotDefault && icon,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChars(slotDefault),
    };
    const slotNode = getSlotNode(slotDefault);
    return (
      <Cmp class={[classes, slotClasses]} {...{ attrs, props: bindProps, on }}>
        {iconNode}
        {slotNode}
      </Cmp>
    );
  },
};
