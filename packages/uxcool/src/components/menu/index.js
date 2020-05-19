import Menu from './menu.vue';
import SubMenu from './subMenu.vue';
import MenuItemGroup from './menuItemGroup.vue';
import MenuItem from './menuItem';

const UxMenu = Menu;
UxMenu.SubMenu = SubMenu;
UxMenu.MenuItemGroup = MenuItemGroup;
UxMenu.ItemGroup = MenuItemGroup;
UxMenu.MenuItem = MenuItem;
UxMenu.Item = MenuItem;

export {
  UxMenu, SubMenu as UxSubMenu, MenuItemGroup as UxMenuItemGroup, MenuItem as UxMenuItem
};

export default UxMenu;
