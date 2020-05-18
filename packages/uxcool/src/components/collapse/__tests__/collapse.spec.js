import {
  mount, waitTime, triggerEvent
} from '@cloud-sn/v-test-utils';
import { UxCollapse, UxCollapsePanel } from '../index';

/* keycode 类型
var modifiers = {
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
};
*/
describe('collapse', () => {
  it('render collapse correctly', async () => {
    const changeFn = jest.fn();
    const wrapper = mount({
      render() {
        return (
          <UxCollapse active-keys="a" on-change={changeFn}>
            <UxCollapsePanel name="a">a</UxCollapsePanel>
            <UxCollapsePanel name="b">b</UxCollapsePanel>
            <UxCollapsePanel name="c">c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-collapse-content').at(0).element.style.display).toBe('');
    // wait transition time
    await triggerEvent(wrapper.findAll('.ux-collapse-header').at(1), 'click', 200);
    expect(wrapper.findAll('.ux-collapse-content').at(0).element.style.display).toBe('');
    expect(wrapper.findAll('.ux-collapse-content').at(1).element.style.display).toBe('');
    expect(changeFn).toHaveBeenCalledTimes(1);
  });

  it('render accordion collapse correctly', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxCollapse active-keys="a" accordion={true}>
            <UxCollapsePanel name="a">a</UxCollapsePanel>
            <UxCollapsePanel name="b">b</UxCollapsePanel>
            <UxCollapsePanel name="c">c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-collapse-content').at(0).element.style.display).toBe('');
    // wait transition time
    await triggerEvent(wrapper.findAll('.ux-collapse-header').at(1), 'click', 200);
    expect(wrapper.findAll('.ux-collapse-content').at(0).element.style.display).toBe('none');
    expect(wrapper.findAll('.ux-collapse-content').at(1).element.style.display).toBe('');
  });

  it('render header correctly with slots', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxCollapse active-keys="a">
            <UxCollapsePanel name="a" show-arrow={false}>
              <span slot="header">this is slot header</span>a
            </UxCollapsePanel>
            <UxCollapsePanel name="b">b</UxCollapsePanel>
            <UxCollapsePanel name="c">c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-collapse-header').at(0).element.children[0].tagName).toBe('SPAN');
    expect(wrapper.findAll('.ux-collapse-header').at(0).element.children[0].innerHTML).toBe(
      'this is slot header'
    );
  });

  it('active-keys changed correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          activeKeys: ['b']
        };
      },
      render() {
        const { activeKeys } = this;
        return (
          <UxCollapse { ...{ props: { activeKeys } }}>
          <UxCollapsePanel name="a">a</UxCollapsePanel>
          <UxCollapsePanel name="b">b</UxCollapsePanel>
          <UxCollapsePanel name="c">c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    wrapper.vm.activeKeys = 'c';
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.ux-collapse-item').at(2).classes('ux-collapse-item-active')).toBe(true);
    });
  });

  it('disabled panel correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          activeKeys: ['b']
        };
      },
      render() {
        const { activeKeys } = this;
        return (
          <UxCollapse { ...{ props: { activeKeys } }}>
            <UxCollapsePanel name="a">a</UxCollapsePanel>
            <UxCollapsePanel name="b">b</UxCollapsePanel>
            <UxCollapsePanel name="c" disabled>c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    await triggerEvent(wrapper.findAll('.ux-collapse-header').at(2), 'click', 200);
    expect(wrapper.findAll('.ux-collapse-item').at(2).classes('ux-collapse-item-disabled')).toBe(true);
  });

  it('panel with keyPress correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          num: 0
        };
      },
      render() {
        const { num } = this;
        return (
          <UxCollapse accordion={true} ref='collapseRef'>
          <UxCollapsePanel name="a">a</UxCollapsePanel>
          <UxCollapsePanel name="b">b</UxCollapsePanel>
          <UxCollapsePanel { ...{ props: { name: num } }}>name is number</UxCollapsePanel>
          <UxCollapsePanel >name is empty</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    wrapper.find('.ux-collapse-header').trigger('keypress.enter');
    await waitTime();
    expect(wrapper.findAll('.ux-collapse-item').at(0).classes('ux-collapse-item-active')).toBe(true);
  });

  it('onHeaderClick correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          activeKeys: ['b']
        };
      },
      render() {
        const { activeKeys } = this;
        return (
          <UxCollapse { ...{ props: { activeKeys } }} ref='collapseRef'>
          <UxCollapsePanel name="a">a</UxCollapsePanel>
          <UxCollapsePanel name="b">b</UxCollapsePanel>
          <UxCollapsePanel name="c">c</UxCollapsePanel>
          </UxCollapse>
        );
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-collapse-item-active')).toBeDefined();
    wrapper.vm.$refs.collapseRef.onHeaderClick('b');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.ux-collapse-item').at(1).classes('ux-collapse-item-active')).toBe(false);
    });
  });

  it('destroyInactivePanel correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          activeKeys: ['b']
        };
      },
      render() {
        const { activeKeys } = this;
        return (
          <UxCollapse {...{ props: { destroyInactivePanel: true, activeKeys } }} ref='collapseRef'>
          <UxCollapsePanel name="a">a</UxCollapsePanel>
          <UxCollapsePanel name="b">b</UxCollapsePanel>
          <UxCollapsePanel name="c">c</UxCollapsePanel>
        </UxCollapse>
        );
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-collapse-content').length).toBe(1);
  });
});
