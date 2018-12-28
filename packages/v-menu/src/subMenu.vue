<script>
  import Trigger from '@suning/v-trigger';
  import { isArray, warning } from '@suning/v-utils';
  import commonMixin from './mixins/common';
  import Menu from './menu.vue';
  import { getRootSubMenu, getPopupPlacement, isTopSubMenu, getTitle } from './utils';

  export default {
    name: 'SubMenu',
    isSubMenuType: true,
    mixins: [commonMixin],
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        timerFn: null,
      };
    },
    computed: {
      prefixCls() {
        return `${this.rootPrefixCls}-submenu`;
      },
      rootSubMenu() {
        return getRootSubMenu(this);
      },

      isSelected() {
        const { eventName, ancestorSubMenuNames } = this;
        if (ancestorSubMenuNames.length === 0) {
          return false;
        }

        return ancestorSubMenuNames.indexOf(eventName) > -1;
      },
      isOpen() {
        const { openedSubMenuEventNames, eventName } = this;
        return openedSubMenuEventNames.indexOf(eventName) > -1;
      },
      isActive() {
        const { disabled, activeItemEventName, eventName } = this;
        return !disabled && activeItemEventName === eventName;
      },
      mode() {
        const { rootMode, level } = this;
        if (level <= 1) {
          return rootMode;
        }
        return rootMode === 'horizontal' ? 'vertical' : rootMode;
      },
      subMenuMode() {
        const { rootMode } = this;
        return rootMode === 'horizontal' ? 'vertical' : rootMode;
      },
      classes() {
        const {
          prefixCls, disabled, mode, isActive, isSelected, isOpen
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${mode}`]: true,
          [`${prefixCls}-active`]: isActive,
          [`${prefixCls}-selected`]: isSelected,
          [`${prefixCls}-open`]: isOpen,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
      titleClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-title`]: true,
        };
      },
      subClasses() {
        const { rootPrefixCls } = this;
        return {
          [`${rootPrefixCls}-sub`]: true,
        };
      },
      actions() {
        const { disabled, trigger } = this;
        if (disabled) {
          return [];
        }
        return isArray(trigger) ? trigger : [trigger];
      },
      popupPlacement() {
        return getPopupPlacement(this.mode);
      },
    },
    created() {
      this.rootMenu.addDescendants(this);
    },
    beforeDestroy() {
      this.rootMenu.removeDescendants(this);
    },
    methods: {
      onSubMenuClick(e) {
        this.rootMenu.onSubMenuClick(e);
      },
      tirggerOpenChange(open, type) {
        const { eventName, onSubMenuClick } = this;
        onSubMenuClick({
          open,
          name: eventName,
          item: this,
          trigger: type,
        });
      },
      onClick($event) {
        const {
          isInlineMode, eventName, tirggerOpenChange, isOpen
        } = this;
        this.$emit('click', {
          name: eventName,
          domEvent: $event,
        });
        if (isInlineMode) {
          tirggerOpenChange(!isOpen, 'click');
        }
      },
      onMouseEnter($event) {
        const { eventName } = this;
        this.$emit('mouseenter', { name: eventName, domEvent: $event });
      },
      onMouseLeave($event) {
        const { eventName } = this;
        this.$emit('mouseleave', { name: eventName, domEvent: $event });
      },
      onMenuActive(e) {
        this.rootMenu.onMenuActive(e);
      },
      onTitleMouseEnter() {
        this.onMenuActive({
          item: this,
          hover: true,
        });
      },
      onTitleMouseLeave() {
        this.onMenuActive({
          item: this,
          hover: false,
        });
      },
      onPopupVisible(visible) {
        this.tirggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
      },
      renderTrigger(titleElement, menuElement) {
        const {
          prefixCls,
          isOpen,
          isDropdownMenu,
          actions,
          getPopupContainer,
          popupClass,
          builtinPlacements,
          popupPlacement,
          subMenuCloseDelay,
          subMenuOpenDelay,
          onPopupVisible,
        } = this;
        const getContainer =
          isTopSubMenu(this) && !isDropdownMenu ? getPopupContainer : () => this.$el;
        const props = {
          prefixCls,
          popupClass: [`${prefixCls}-popup`, popupClass],
          visible: isOpen,
          actions,
          getPopupContainer: getContainer,
          builtinPlacements,
          popupPlacement,
          mouseEnterDelay: subMenuOpenDelay,
          mouseLeaveDelay: subMenuCloseDelay,
        };
        const on = {
          'popup-visible-change': onPopupVisible,
        };
        return (
          <Trigger {...{ props, on }}>
            {titleElement}
            {menuElement}
          </Trigger>
        );
      },
    },
    render() {
      const {
        rootPrefixCls,
        $slots: { default: slotDefault, title: slotTitle },
        title,
        theme,
        classes,
        isInlineMode,
        disabled,
        onClick,
        onTitleMouseEnter,
        onTitleMouseLeave,
        onMouseEnter,
        onMouseLeave,
        titleClasses,
        paddingStyle,
        subClasses,
        isOpen,
        subMenuMode,
        renderTrigger,
        hasTitleAttr,
      } = this;
      const attrs = {
        class: classes,
      };

      if (!disabled && !isInlineMode) {
        attrs.on = {
          mouseenter(e) {
            e.stopPropagation();
            onMouseEnter();
          },
          mouseleave(e) {
            e.stopPropagation();
            onMouseLeave();
          },
        };
      }

      if (!slotTitle && !title) {
        if (process.env.NODE_ENV !== 'production') {
          warning(false, 'SubMenu需要一个标题');
        }
      }

      const titleAttrs = {
        class: titleClasses,
        style: [paddingStyle],
        attrs: {
          title: hasTitleAttr ? getTitle(slotTitle, title) : '',
        },
      };
      if (!disabled && isInlineMode) {
        titleAttrs.on = {
          click(e) {
            // e.stopPropagation();
            onClick(e);
          },
          mouseenter: onTitleMouseEnter,
          mouseleave: onTitleMouseLeave,
        };
      }

      const menuAttrs = {
        class: subClasses,
        props: {
          prefixCls: rootPrefixCls,
          isRoot: false,
          visible: isInlineMode ? isOpen : true,
          mode: subMenuMode,
          theme,
        },
      };
      if (!isInlineMode) {
        titleAttrs.slot = 'trigger';
        menuAttrs.slot = 'popup';
      }
      // 标题元素
      const titleElement = <div {...titleAttrs}>{slotTitle || <span>{title}</span>}</div>;
      // 子菜单
      const menuElement = <Menu {...menuAttrs}>{slotDefault}</Menu>;
      return (
        <li {...attrs}>
          {isInlineMode ? [titleElement, menuElement] : renderTrigger(titleElement, menuElement)}
        </li>
      );
    },
  };
</script>
