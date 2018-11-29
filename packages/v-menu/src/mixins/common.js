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
    openedSubMenuEventNames() {
      const { openedSubMenus } = this;
      return openedSubMenus.map(v => v.eventName);
    },
    selectedItems() {
      return this.rootMenu.selectedItems;
    },
    selectedItemEventNames() {
      const { selectedItems } = this;
      return selectedItems.map(v => v.eventName);
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
    activeItemEventName() {
      const { activeItem } = this;
      return activeItem ? activeItem.eventName : 'NO_EVENT_NAME';
    },
    ancestorSubMenuNames() {
      return this.rootMenu.ancestorSubMenuNames || [];
    },
    isMultiple() {
      return this.rootMenu.multiple;
    },
    trigger() {
      return this.rootMenu.trigger;
    },
    getPopupContainer() {
      return this.rootMenu.getPopupContainer;
    },
    builtinPlacements() {
      return this.rootMenu.builtinPlacements;
    },
    popupClass() {
      return this.rootMenu.popupClass;
    },
    subMenuOpenDelay() {
      return this.rootMenu.subMenuOpenDelay;
    },
    subMenuCloseDelay() {
      return this.rootMenu.subMenuCloseDelay;
    },
    hasTitleAttr() {
      return this.rootMenu.hasTitleAttr;
    },
  },
};
