import { genUUID, getComponentLevel, getRootMenu, getEventName } from '../utils';

export default {
  computed: {
    uuid() {
      return genUUID();
    },
    level() {
      return getComponentLevel(this);
    },
    rootMenu() {
      return getRootMenu(this);
    },
    eventName() {
      return getEventName(this);
    },
    rootPrefixCls() {
      return this.rootMenu.prefixCls;
    },
    theme() {
      return this.rootMenu.theme;
    },
    rootMode() {
      return this.rootMenu.mode;
    },
    openedSubMenus() {
      return this.rootMenu.openedSubMenus;
    },
    selectedItems() {
      return this.rootMenu.selectedItems;
    },
    isInlineMode() {
      return this.rootMode === 'inline';
    },
    inlineIndent() {
      return this.rootMenu.inlineIndent;
    },
    paddingStyle() {
      const { level, isInlineMode, inlineIndent } = this;
      if (!isInlineMode) {
        return {};
      }
      return { paddingLeft: `${inlineIndent * level}px` };
    },
    activeItem() {
      return this.rootMenu.activeItem;
    },
    isMultiple() {
      return this.rootMenu.multiple;
    },
  },
};
