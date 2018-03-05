<script>
  import commonMixin from './mixins/common';
  import vMenu from './menu.vue';
  import { getAllDescendants, getRootSubMenu } from './utils';

  export default {
    name: 'SubMenu',
    components: {
      vMenu,
    },
    mixins: [commonMixin],
    props: {
      name: {
        type: String,
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
        descendants: null,
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
        const { selectedItems, descendants } = this;
        return selectedItems.some(v => descendants.has(v));
      },
      isOpen() {
        const { openedSubMenus } = this;
        return openedSubMenus.indexOf(this) > -1;
      },
      isActive() {
        const { disabled, activeItem } = this;
        return !disabled && activeItem === this;
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
    },
    created() {
      this.rootMenu.addDescendants(this);
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.rootMenu.removeDescendants(this);
    },
    methods: {
      init() {
        this.descendants = getAllDescendants(this);
      },
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
      // onClick($event) {
      //   const {
      //     isInlineMode, eventName, tirggerOpenChange, isOpen, disabled
      //   } = this;
      //   if (disabled) {
      //     return;
      //   }
      //   this.$emit('click', {
      //     name: eventName,
      //     domEvent: $event,
      //   });
      //   if (isInlineMode) {
      //     tirggerOpenChange(!isOpen, 'click');
      //   }
      // },
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
      mouseEvent(open, triggerName) {
        const {
          timerFn, isInlineMode, tirggerOpenChange, disabled
        } = this;
        if (isInlineMode || disabled) {
          return;
        }
        if (timerFn) {
          clearTimeout(timerFn);
        }

        this.timerFn = setTimeout(() => {
          tirggerOpenChange(open, triggerName);
        }, 250);
      },
      onMouseEnter() {
        this.mouseEvent(true, 'mouseEnter');
      },
      onMouseLeave() {
        this.mouseEvent(false, 'mouseLeave');
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
    },

    render(h) {
      const {
        rootPrefixCls,
        $slots,
        title,
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
      } = this;

      const slotTitle = $slots.title;
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

      const titleAttrs = {
        class: titleClasses,
        style: [paddingStyle],
      };
      if (!disabled && isInlineMode) {
        titleAttrs.on = {
          click(e) {
            e.stopPropagation();
            onClick(e);
          },
          mouseenter: onTitleMouseEnter,
          mouseleave: onTitleMouseLeave,
        };
      }
      if (!slotTitle && !title) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('submenu需要一个标题');
        }
      }
      // 标题元素
      const titleElement = h('div', titleAttrs, [slotTitle || title]);

      // 子菜单
      const menuElement = h(
        'v-menu',
        {
          class: subClasses,
          props: {
            prefixCls: rootPrefixCls,
            isRoot: false,
            visible: isOpen,
            mode: subMenuMode,
          },
        },
        $slots.default
      );
      return h('li', attrs, [titleElement, menuElement]);
    },
  };
</script>
