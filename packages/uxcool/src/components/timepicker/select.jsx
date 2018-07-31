import { buildComponentName } from '../utils';
import { scrollTo, updatePortalElement } from './utils';

export default {
  name: buildComponentName('TimepickerSelect'),
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    triggerRef: {
      type: Object,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    classes() {
      const { prefixCls, active } = this;
      return {
        [`${prefixCls}-select`]: true,
        [`${prefixCls}-select-active`]: active,
      };
    },
    children() {
      return this.renderChildren();
    },
  },
  watch: {
    visible(nVal) {
      if (nVal === false) {
        setTimeout(() => {
          this.scrollToTarget(0);
        }, 100);
      }
    },
    triggerRef() {
      this.mountScrollToTarget();
    },
  },
  created() {
    this.prevSelectedValue = null;
    this.currentSelectedValue = null;
  },
  mounted() {
    this.mountScrollToTarget();
  },
  updated() {
    const { prevSelectedValue, currentSelectedValue, scrollToTarget } = this;
    if (currentSelectedValue && currentSelectedValue !== prevSelectedValue) {
      scrollToTarget(120);
    }
  },
  methods: {
    onSelect(item) {
      const { type } = this;
      this.$emit('select', type, item.value);
    },
    onMouseEnter(e) {
      this.active = true;
      this.$emit('mouseenter', e);
    },
    onMouseLeave() {
      this.active = false;
    },
    mountScrollToTarget() {
      const { $refs: { wrapRef, selectedRef }, triggerRef } = this;
      if (selectedRef) {
        let alignElement;
        if (triggerRef) {
          alignElement = triggerRef.getPortalPopupElement();
        }
        updatePortalElement(alignElement, () => {
          scrollTo(wrapRef, selectedRef.offsetTop, 0);
        });
      }
    },
    scrollToTarget(duration = 120) {
      const { $refs: { wrapRef, selectedRef } } = this;
      if (selectedRef) {
        scrollTo(wrapRef, selectedRef.offsetTop, duration);
      }
    },
    renderChildren() {
      const { prefixCls, options, onSelect } = this;
      const optionNodes = options.map((item) => {
        const cls = {
          [`${prefixCls}-select-option-selected`]: item.isSelected,
          [`${prefixCls}-select-option-disabled`]: item.isDisabled,
        };
        const bindAttrs = {
          class: cls,
          on: {
            click() {
              onSelect(item);
            },
          },
        };

        if (item.isSelected) {
          bindAttrs.ref = 'selectedRef';
        }
        return <li {...bindAttrs}>{item.value}</li>;
      });

      return <ul>{optionNodes}</ul>;
    },
  },
  render() {
    const {
      classes, children, options, onMouseEnter, onMouseLeave
    } = this;
    this.prevSelectedValue = this.currentSelectedValue;
    this.currentSelectedValue = (options.filter(v => v.isSelected)[0] || {}).value || null;
    return (
      <div ref="wrapRef" class={classes} on-mouseenter={onMouseEnter} on-mouseleave={onMouseLeave}>
        {children}
      </div>
    );
  },
};
