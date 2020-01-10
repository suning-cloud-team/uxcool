import { mount, waitTime, triggerEvent } from '@suning/v-test-utils';
import { UxCollapse, UxCollapsePanel } from '../index';

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
});
