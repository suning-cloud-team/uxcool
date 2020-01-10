import { mount, waitTime } from '@suning/v-test-utils';
import { UxMenu, UxMenuItem, UxSubMenu } from '..';

describe('menu', () => {
  it('render inline-indent correctly', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxMenu inline-indent={48} style="width: 250px">
            <UxSubMenu name="sub-menu-1" title="sub-menu-1">
              <UxMenuItem name="sub-menu-1-1">sub-menu-1-1</UxMenuItem>
              <UxMenuItem name="sub-menu-1-2">sub-menu-1-2</UxMenuItem>
            </UxSubMenu>
          </UxMenu>
        );
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-menu-item').element.style.paddingLeft).toBe('96px');
  });

  it('render open-keys correctly', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxMenu style="width: 250px" open-keys={['sub-menu-1']} ref="uxMenuRef">
            <UxSubMenu name="sub-menu-1" title="sub-menu-1" class="testClass1">
              <UxMenuItem name="sub-menu-1-1">sub-menu-1-1</UxMenuItem>
              <UxMenuItem name="sub-menu-1-2">sub-menu-1-2</UxMenuItem>
            </UxSubMenu>
            <UxSubMenu name="sub-menu-2" title="sub-menu-2" class="testClass2">
              <UxMenuItem name="sub-menu-2-1">sub-menu-2-1</UxMenuItem>
              <UxMenuItem name="sub-menu-2-2">sub-menu-2-2</UxMenuItem>
            </UxSubMenu>
          </UxMenu>
        );
      },
    });
    await waitTime(200);
    const uxMenuWrapper = wrapper.find({ ref: 'uxMenuRef' });
    expect(wrapper.find('.testClass1').classes('ux-menu-submenu-open')).toBeTruthy();
    uxMenuWrapper.setProps({ uniqueOpened: true });
    uxMenuWrapper.setProps({ openKeys: ['sub-menu-2'] });
    await waitTime(200);
    expect(wrapper.find('.testClass1').classes('ux-menu-submenu-open')).not.toBeTruthy();
    expect(wrapper.find('.testClass2').classes('ux-menu-submenu-open')).toBeTruthy();
  });

  it('render selected-keys correctly', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxMenu style="width: 250px" selected-keys={['menu-item-1']}>
            <UxMenuItem name="menu-item-1" class="testClass">
              menu-item-1
            </UxMenuItem>
            <UxMenuItem name="menu-item-2">menu-item-2</UxMenuItem>
          </UxMenu>
        );
      },
    });
    await waitTime(500);
    expect(wrapper.findAll('.ux-menu-item-selected').length).toBe(1);
    expect(wrapper.find('.testClass').classes('ux-menu-item-selected')).toBeTruthy();
  });
});
