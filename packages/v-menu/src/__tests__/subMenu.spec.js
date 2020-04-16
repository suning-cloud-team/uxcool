import {
  mount,
  waitTime,
  getPortal,
  triggerEvent,
  createWrapper,
  mountPickerFactory,
  shallowMount,
} from '@suning/v-test-utils';
import { VMenu, VMenuItem, VSubMenu } from '../index';
import {
  getRootSubMenu, getPopupPlacement, isTopSubMenu, getTitle
} from '../utils';

describe('subMenu', () => {
  it('mouseenter , mouseleave', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu mode="horizontal">
            <VSubMenu name="vsubmenu4" title="vsubmenu4" class="vsubmenu4">
              <template slot="title">测试4</template>
            </VSubMenu>
          </VMenu>
        );
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.v-menu-submenu-horizontal').trigger('mouseenter');
    await waitTime();
    await waitTime();
    wrapper.find('.v-menu-submenu-horizontal').trigger('mouseleave');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('mouseenter , mouseleave, and destory Actions', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu>
            <VSubMenu name="vsubmenu" title="vsubmenu" class="vsubmenu"></VSubMenu>
          </VMenu>
        );
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.find('.v-menu-submenu-title').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.vsubmenu').classes('v-menu-submenu-active')).toBeTruthy();
    wrapper.find('.v-menu-submenu-title').trigger('mouseleave');
    await waitTime();
    expect(wrapper.find('.vsubmenu').classes('v-menu-submenu-active')).toBeFalsy();
    wrapper.destroy();
    await waitTime();
    expect(wrapper.exists()).toBe(false);
  });

  it('destroy', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu>
            <VSubMenu name="item-1" title="vsubmenu" class="notitle"></VSubMenu>
          </VMenu>
        );
      },
    });
    await waitTime(20);
    wrapper.destroy();
    expect(wrapper.exists()).toBe(false);
  });

  it('test horizontal', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu mode="horizontal">
            <VSubMenu name="VSubMenu" title="VSubMenu"></VSubMenu>
          </VMenu>
        );
      },
    });
    // await waitTime(20);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-menu-submenu').classes('v-menu-submenu-horizontal')).toBeTruthy();
    await waitTime(20);
    wrapper.destroy();
  });

  it('open', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu>
            <VSubMenu name="open" title="open" class="open">
              <VMenuItem name="sub-menu-1-1" class="sub-menu-1-1">
                VMenuItem-1
              </VMenuItem>
            </VSubMenu>
          </VMenu>
        );
      },
    });
    await waitTime(20);
    wrapper.find('.v-menu-submenu-title').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.open').classes('v-menu-submenu-open')).toBeTruthy();
    await waitTime(20);
    wrapper.find('.sub-menu-1-1').trigger('click');
    await wrapper.vm.$nextTick();
    // expect(wrapper.vm.$refs.ccc1.isSelected).toBe(true);
    await waitTime(20);
    wrapper.destroy();
  });

  it('no title', async () => {
    const wrapper = mount({
      render() {
        return (
          <VMenu>
            <VSubMenu name="item-1"></VSubMenu>
          </VMenu>
        );
      },
    });
    await waitTime(20);
    wrapper.destroy();
  });

  it('onPopupVisible', async () => {
    const wrapper = mount({
      data() {
        return {
          level: 2,
          rootMode: 'horizontal',
          isInlineMode: false,
        };
      },
      render() {
        const { isInlineMode } = this;
        return (
          <VMenu isInlineMode={isInlineMode}>
            <VSubMenu name="vsubmenu1" title="vsubmenu1" class="vsubmenu1" ref="testPop"></VSubMenu>
          </VMenu>
        );
      },
    });
    await waitTime();
    // console.log(wrapper.vm.$refs.testPop);
    wrapper.vm.$refs.testPop.onPopupVisible(true);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.vsubmenu1').classes('v-menu-submenu-open')).toBeTruthy();
    });
    await waitTime();
    wrapper.vm.$refs.testPop.onPopupVisible(false);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.vsubmenu1').classes('v-menu-submenu-open')).toBeFalsy();
    });
    // expect(wrapper.find('.vsubmenu').classes('v-menu-submenu-active')).toBeTruthy();
    // expect().toBe('vsubmenu');
  });

  it('compute', async () => {
    const wrapper = mount({
      data() {
        return {
          rootMode: 'horizontal',
          isInlineMode: false,
          disabled: false,
          ancestorSubMenuNames: [],
          eventName: '',
          hasTitleAttr: false,
          trigger: ['hover'],
        };
      },
      render() {
        const {
          isInlineMode, disabled, hasTitleAttr, trigger
        } = this;
        return (
          <VMenu disabled={disabled} isInlineMode={isInlineMode}>
            <VSubMenu
              ref="testCompute"
              hasTitleAttr={hasTitleAttr}
              disabled={disabled}
              trigger={trigger}
              name="vsubmenu1"
              title="vsubmenu1"
              class="vsubmenu1"
            >
              <template slot="title">测试4</template>
              <VSubMenu ref="dddd" name="vsubmenu2" title="vsubmenu2" class="vsubmenu2">
                <template slot="title">测试5</template>
              </VSubMenu>
            </VSubMenu>
          </VMenu>
        );
      },
    });
    // wrapper.vm.rootMode = 'vertical';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.testCompute.rootSubMenu.name).toBe('vsubmenu1');
    await waitTime();
    wrapper.vm.disabled = true;
    wrapper.vm.$nextTick(() => {
      // console.log(wrapper.vm.$refs.testCompute.actions);
      expect(wrapper.vm.$refs.testCompute.actions.length).toBe(0);
    });

    // expect(wrapper.find('.vsubmenu').classes('v-menu-submenu-active')).toBeTruthy();
    // expect().toBe('vsubmenu');
  });

  it('mode', async () => {
    const wrapper = mount({
      data() {
        return {
          mode: 'inline',
        };
      },
      render() {
        const { mode } = this;
        return (
          <VMenu mode={mode}>
            <VSubMenu name="vsubmenu1" title="vsubmenu1" class="vsubmenu1">
              <template slot="title">测试4</template>
              <VSubMenu ref="testMode" name="vsubmenu2" title="vsubmenu2" class="vsubmenu2">
                <template slot="title">测试5</template>
              </VSubMenu>
            </VSubMenu>
          </VMenu>
        );
      },
    });
    // wrapper.vm.rootMode = 'vertical';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$refs.testMode.mode).toBe('inline');
    wrapper.vm.mode = 'horizontal';
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$refs.testMode.mode).toBe('vertical');
    });

    // expect(wrapper.find('.vsubmenu').classes('v-menu-submenu-active')).toBeTruthy();
    // expect().toBe('vsubmenu');
  });
});
