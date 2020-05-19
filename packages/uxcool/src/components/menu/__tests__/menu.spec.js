import { mount, waitTime } from '@cloud-sn/v-test-utils';
import {
  UxMenu, UxMenuItem, UxSubMenu, UxMenuItemGroup
} from '..';
import { UxButton } from '../../button';
import { UxIcon } from '../../components';

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

  it('collapse is correctly', async () => {
    const wrapper = mount({
      template: `
        <div>
          <ux-button icon="menu_fold" @click="onClick" ref="collapseBtn" />
          <ux-menu :inline-collapsed="collapsed"
                   :open-keys="openKeys"
                   theme="dark">
            <ux-menu-item name="item-1">
              <ux-icon type="account" />
              <span>item-1 <strong>item-1</strong></span>
            </ux-menu-item>
            <ux-sub-menu name="sub-menu-1"
                         title="sub-menu-1">
              <template slot="title">
                <ux-icon type="box" />
                <span>this is slot title</span>
              </template>
              <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
              <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
            </ux-sub-menu>
            <ux-sub-menu name="sub-menu-2"
                         title="sub-menu-2">
              <template slot="title">
                <ux-icon type="safty" />
                <span>sub-menu-2</span>
              </template>
              <ux-menu-item disabled name="sub-menu-2-1">sub-menu-1-1</ux-menu-item>
              <ux-menu-item name="sub-menu-2-2">sub-menu-2-2</ux-menu-item>
              <ux-menu-item name="sub-menu-2-3">sub-menu-2-1</ux-menu-item>
            </ux-sub-menu>            
          </ux-menu>
        </div>      
      `,
      components: {
        UxMenu,
        UxMenuItem,
        UxSubMenu,
        UxMenuItemGroup,
        UxButton,
        UxIcon,
      },
      data() {
        return {
          collapsed: false,
          openKeys: ['sub-menu-1'],
        };
      },
      created() {
        setTimeout(() => {
          this.openKeys = ['sub-menu-2'];
        }, 100);
      },
      methods: {
        onClick() {
          this.collapsed = !this.collapsed;
        },
      },
    });
    await waitTime(110);
    expect(wrapper.find('.ux-menu-submenu-open')).toBeDefined();
    wrapper.find('.ux-menu-submenu-open .ux-menu-submenu-title').trigger('click');
    await waitTime();
    expect(wrapper.find('.ux-menu-submenu-open')).toBeDefined();
    const btn = wrapper.find({ ref: 'collapseBtn' });
    btn.trigger('click');
    await waitTime();
    expect(wrapper.find('.ux-menu-root').classes('ux-menu-inline-collapsed')).toBeTruthy();
  });
});
