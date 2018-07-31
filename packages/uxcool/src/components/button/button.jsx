import { isTextNode } from '@suning/v-utils';
import Icon from '../icon';
import { buildComponentName } from '../utils';

const regTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const sizeMapping = {
  small: 'sm',
  large: 'lg',
};

function insertSpace(vnodes = []) {
  const ret = vnodes;
  if (vnodes.length === 1) {
    const node = vnodes[0];
    if (isTextNode(node)) {
      if (regTwoCNChar.test(node.text)) {
        node.text = node.text.split('').join(' ');
      }
    } else {
      node.children = insertSpace(node.children);
    }
  }
  return ret;
}

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
      validator(val) {
        return ['', 'primary', 'ghost', 'dashed', 'danger'].indexOf(val) > -1;
      },
    },
    shape: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'circle', 'circle-outline'].indexOf(val) > -1;
      },
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
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
      validator(val) {
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
    getListeners() {
      const { innerLoading, $listeners, onClick } = this;
      const listeners = { ...$listeners, click: onClick };
      return Object.keys(listeners).reduce((r, k) => {
        const nr = r;
        const fn = listeners[k];
        nr[k] = () => {
          if (innerLoading) {
            return;
          }
          fn();
        };
        return nr;
      }, {});
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
      iconType,
      htmlType,
      iconNode,
      getSlotNode,
      getListeners,
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

    const on = getListeners();
    let slotDefault = $slots.default;
    slotDefault =
      slotDefault && (!iconType || iconType === 'loading') ? insertSpace(slotDefault) : slotDefault;

    const slotClasses = {
      [`${prefixCls}-icon-only`]: !slotDefault && icon,
    };

    const slotNode = getSlotNode(slotDefault);
    return (
      <Cmp
        class={[classes, slotClasses]}
        {...{
          attrs,
          props: bindProps,
          on,
        }}
      >
        {iconNode}
        {slotNode}
      </Cmp>
    );
  },
};
