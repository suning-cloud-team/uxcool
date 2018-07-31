import { CollapseTransition } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import Mixin from './mixin';

export default {
  name: buildComponentName('CollapsePanel'),
  mixins: [Mixin],
  props: {
    name: {
      type: [String, Number],
      default: '',
    },
    header: {
      type: [String, Number],
      default: '',
    },
    headerClass: {
      type: [String, Object, Array],
      default: '',
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    forceRender: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    prefixCls() {
      const { rootPrefixCls } = this;
      return rootPrefixCls;
    },
    uid() {
      const { name, _uid } = this;
      return name || `$$id_${_uid}`;
    },
    isActive() {
      const { rootActiveKeys, uid } = this;
      return rootActiveKeys.indexOf(uid) > -1;
    },
    isDestroyInactive() {
      const { forceRender, rootDestroyInactivePanel } = this;
      return !forceRender && rootDestroyInactivePanel;
    },
    classes() {
      const {
        prefixCls, isActive, disabled, showArrow
      } = this;
      const itemCls = `${prefixCls}-item`;
      return {
        [itemCls]: true,
        [`${itemCls}-active`]: isActive,
        [`${itemCls}-disabled`]: disabled,
        [`${prefixCls}-no-arrow`]: !showArrow,
      };
    },
  },
  methods: {
    onHeaderClick(e) {
      const { disabled, onRootHeaderClick } = this;
      e.stopPropagation();
      e.preventDefault();
      if (disabled) {
        return;
      }
      onRootHeaderClick(this.uid, e);
    },
    onHeaderKeyPress(e) {
      const { keyCode } = e;
      if (keyCode === 13) {
        this.onHeaderClick(e);
      }
    },
    renderHeader() {
      const {
        $slots,
        prefixCls,
        rootAccordion,
        header,
        headerClass,
        showArrow,
        disabled,
        isActive,
        onHeaderClick,
        onHeaderKeyPress,
      } = this;
      const attrs = {
        role: rootAccordion ? 'tab' : 'button',
        tabindex: disabled ? -1 : 0,
        'aria-expanded': isActive,
      };
      const on = {
        click: onHeaderClick,
        keypress: onHeaderKeyPress,
      };
      return (
        <div {...{ class: [`${prefixCls}-header`, headerClass], attrs, on }}>
          {showArrow ? <i class="arrow" /> : null}
          {$slots.header || header}
        </div>
      );
    },
    renderChildren() {
      const {
        prefixCls, $slots, rootAccordion, isDestroyInactive, isActive
      } = this;
      const cls = {
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content-active`]: isActive,
        [`${prefixCls}-content-inactive`]: !isActive,
      };
      const role = rootAccordion ? 'tabpanel' : null;
      let children = null;
      if (isDestroyInactive) {
        children = isActive ? (
          <div role={role} class={cls}>
            <div class={`${prefixCls}-content-box`}>{$slots.default}</div>
          </div>
        ) : null;
      } else {
        children = (
          <div role={role} class={cls} v-show={isActive}>
            <div class={`${prefixCls}-content-box`}>{$slots.default}</div>
          </div>
        );
      }

      return <CollapseTransition>{children}</CollapseTransition>;
    },
  },
  render() {
    const { classes, renderHeader, renderChildren } = this;

    return (
      <div class={classes}>
        {renderHeader()}
        {renderChildren()}
      </div>
    );
  },
};
