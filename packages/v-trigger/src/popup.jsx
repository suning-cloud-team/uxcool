import { HTMLElementType, emitter } from '@cloud-sn/v-utils';
import Align from '@cloud-sn/v-align';

export default {
  components: {
    Align,
  },
  mixins: [emitter],
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    className: {
      type: [String, Array, Object],
      default: '',
    },
    styles: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    getClassNameFromAlign: {
      type: Function,
      default() {
        return '';
      },
    },
    rootDomNode: {
      type: HTMLElementType(),
      default: null,
    },
    align: {
      type: Object,
      default() {
        return {};
      },
    },
    destroyPopupOnHide: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerAlign: {},
      xVisible: false,
      dVisible: false,
    };
  },
  computed: {
    transitionName() {
      const { prefixCls, transition, animation } = this;
      let transitionName = transition;
      if (!transition && animation) {
        transitionName = `${prefixCls}-${animation}`;
      }
      return transitionName;
    },
    target() {
      return this.rootDomNode;
    },
    alignClass() {
      const { innerAlign, getClassNameFromAlign } = this;
      return getClassNameFromAlign(innerAlign);
    },
    classes() {
      const { prefixCls, alignClass } = this;
      return [prefixCls, alignClass];
    },
  },
  watch: {
    align(nVal) {
      if (nVal) {
        this.setInnerAlign(nVal);
      }
    },
    visible(nVal) {
      if (nVal === false) {
        this.xVisible = nVal;
      } else {
        this.dVisible = false;
      }
    },
  },
  created() {
    this.setInnerAlign(this.align);
  },
  methods: {
    setInnerAlign(align) {
      this.innerAlign = align;
    },
    getTarget() {
      return this.rootDomNode;
    },
    onAlign(element, align) {
      this.setInnerAlign(align);
      this.xVisible = this.visible;
      this.$emit('on-align', element, align);
    },
    onAfterEnter() {
      this.$emit('afterenter');
    },
    onAfterLeave() {
      this.dVisible = true;
    },
    renderTransitionAlign(element, options = {}) {
      const { transitionName } = this;
      const transitionAttrs = {
        props: {
          name: transitionName,
          appear: true,
          ...options.props,
        },
        on: { ...options.on },
      };

      return transitionName ? <transition {...transitionAttrs}>{element}</transition> : element;
    },
    renderPopup() {
      const {
        prefixCls,
        destroyPopupOnHide,
        visible,
        xVisible,
        dVisible,
        $slots,
        classes,
        className,
        styles,
        getTarget,
        align,
        onAlign,
        onAfterLeave,
        onAfterEnter,
        transitionName,
        renderTransitionAlign,
      } = this;
      const self = this;
      const popupInnerAttrs = {
        class: [classes, className],
        style: styles,
        attrs: {
          role: 'align-popup',
        },
        on: {
          mousedown(e) {
            self.broadcast('UxTrigger', 'onNestedPopupClick', e);
            e.stopPropagation();
          },
        },
      };
      const popupInner = (
        <div v-show={xVisible} {...popupInnerAttrs}>
          <div class={`${prefixCls}-content`}>{$slots.default}</div>
        </div>
      );

      const alignAttrs = {
        props: {
          target: getTarget,
          align,
          disabled: !visible,
          monitorWinResize: true,
        },

        on: {
          'on-align': onAlign,
        },
        ref: 'alignRef',
      };

      if (xVisible && !transitionName) {
        this.$nextTick(() => {
          this.$nextTick(() => {
            onAfterEnter();
          });
        });
      }
      if (destroyPopupOnHide) {
        // animate || no anomiate
        return (transitionName && !dVisible) || (!transitionName && visible) ? (
          <Align {...alignAttrs}>
            {renderTransitionAlign(popupInner, {
              on: {
                afterEnter: onAfterEnter,
                afterLeave: onAfterLeave,
              },
            })}
          </Align>
        ) : null;
      }

      return (
        <Align {...alignAttrs}>
          {renderTransitionAlign(popupInner, {
            on: {
              afterEnter: onAfterEnter,
            },
          })}
        </Align>
      );
    },
  },
  render() {
    const { renderPopup } = this;
    return <div role="popup">{renderPopup()}</div>;
  },
};
