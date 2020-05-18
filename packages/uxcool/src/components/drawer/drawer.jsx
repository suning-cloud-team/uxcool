import omit from 'object.omit';
import { isDef, browser } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import Icon from '../icon';
import InnerDrawer from './innerDrawer';
import Mixin from './mixin';

export default {
  name: buildComponentName('Drawer'),
  provide() {
    return {
      drawerRoot: this,
    };
  },
  inject: {
    drawerRoot: {
      default: false,
    },
  },
  mixins: [Mixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-drawer',
    },
    width: {
      type: [String, Number],
      default: 256,
    },
    height: {
      type: [String, Number],
      default: 256,
    },
    bodyClass: {
      type: [String, Object, Array],
      default: '',
    },
    bodyStyle: {
      type: Object,
      default: null,
    },
    placement: {
      type: String,
      default: 'right',
      validator(val) {
        return ['top', 'left', 'right', 'bottom'].indexOf(val) > -1;
      },
    },
    zIndex: {
      type: [Number, String],
      default: '',
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chidrenIsVisible: false,
      destroyDrawer: false,
    };
  },
  computed: {
    classes() {
      const { showMask } = this;
      return {
        'no-mask': !showMask,
      };
    },
    isChildren() {
      return !!this.drawerRoot;
    },
    wrapperStyle() {
      const { zIndex, placement, chidrenIsVisible } = this;
      const style = isDef(zIndex) && zIndex !== ''
        ? {
          zIndex,
        }
        : {};
      if (chidrenIsVisible) {
        let transform = 'translateX(-180px)';
        switch (placement) {
          case 'top':
            transform = 'translateY(180px)';
            break;
          case 'left':
            transform = 'translateX(-180px)';
            break;
          case 'bottom':
            transform = 'translateY(-180px)';
            break;
          default:
            break;
        }
        style.transform = transform;
      }

      return style;
    },
    wrapperBodyStyle() {
      const { placement, innerVisible, destroyOnClose } = this;
      let style = !innerVisible && destroyOnClose ? {
        opacity: 0,
        transition: 'opacity 300ms'
      } : null;
      switch (placement) {
        case 'left':
        case 'right':
          style = {
            ...style,
            overflow: 'auto',
            height: '100%',
          };
          break;
        default:
          break;
      }
      return style;
    },
    bindProps() {
      const {
        $props, classes, wrapperClass, wrapperStyle, placement, width, height
      } = this;
      const props = { ...omit($props, ['width', 'height']) };
      if (placement === 'left' || placement === 'right') {
        props.width = width;
      } else {
        props.height = height;
      }
      return {
        ...props,
        wrapperClass: [classes, wrapperClass],
        wrapperStyle,
      };
    },
    bindListeners() {
      const { $listeners, onMaskClick, onContentTransitionEnd } = this;
      return {
        ...$listeners,
        'mask-click': onMaskClick,
        'content-transitionend': onContentTransitionEnd,
      };
    },
  },
  watch: {
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  mounted() {
    const { setInnerVisible, visible } = this;
    setInnerVisible(visible, false);
  },
  methods: {
    setChildrenIsVisible(flag) {
      this.chidrenIsVisible = flag;
    },
    updateParentDrawer(flag = false) {
      const { isChildren, drawerRoot } = this;
      if (isChildren) {
        drawerRoot.setChildrenIsVisible(flag);
      }
    },
    setInnerVisible(visible, trigger = true) {
      const { innerVisible, updateParentDrawer } = this;
      this.innerVisible = visible;
      if (innerVisible !== visible) {
        updateParentDrawer(visible);
        if (trigger) {
          this.$emit('input', visible);
        }
      }
    },
    close(e) {
      this.$emit('close', e);
      this.setInnerVisible(false);
    },
    onMaskClick(e) {
      this.close(e);
    },
    onContentTransitionEnd(op, e) {
      const { destroyOnClose } = this;
      if (op === 'close' && destroyOnClose) {
        this.destroyDrawer = true;
      }
      // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/305
      this.$emit('transitionend', op, e);
    },
    onClose(e) {
      this.close(e);
    },
    renderChildren() {
      const {
        $slots: { default: slotDefault, title: slotTitle },
        prefixCls,
        wrapperBodyStyle,
        bodyClass,
        bodyStyle,
        innerVisible,
        destroyDrawer,
        title,
        closable,
        onClose,
      } = this;
      if (destroyDrawer && !innerVisible) {
        return null;
      }
      this.destroyDrawer = false;

      const titleNode = slotTitle || title;

      return (
        <div class={`${prefixCls}-wrapper-body`} style={wrapperBodyStyle}>
          {titleNode ? (
            <div class={`${prefixCls}-header`}>
              <div class={`${prefixCls}-title`}>{titleNode}</div>
            </div>
          ) : null}
          {closable ? (
            <button class={`${prefixCls}-close`} aria-label="Close" on-click={onClose}>
              <span class={`${prefixCls}-close-x`}>
                <Icon type="close" />
              </span>
            </button>
          ) : null}
          <div class={[`${prefixCls}-body`, bodyClass]} style={bodyStyle}>
            {slotDefault}
          </div>
        </div>
      );
    },
  },
  render() {
    const { bindProps, bindListeners, renderChildren } = this;
    return (
      <InnerDrawer {...{ props: bindProps, on: bindListeners }}>{renderChildren()}</InnerDrawer>
    );
  },
};
