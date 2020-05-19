import {
  mount, triggerEvent, waitTime, shallowMount
} from '@cloud-sn/v-test-utils';
import { VTabs } from '@cloud-sn/v-tabs';
import TabBar from '@cloud-sn/v-tabs/src';
import { UxTabs, UxTabPane } from '..';
import { UxIcon } from '../../icon';

describe('UxTabs', () => {
  it('render UxTabs correctly', async () => {
    const wrapper = mount({
      template: `
          <ux-tabs>
            <ux-tab-pane tab="Tab 1" name="1">
              Tab 1 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 2" name="2">
              Tab 2 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 3" name="3">
              Tab 3 Content
            </ux-tab-pane>
          </ux-tabs>
        `,
      components: {
        UxTabPane,
        UxTabs,
      },
    });
    await waitTime();
    const taps = wrapper.findAll('.ux-tabs-tab');

    expect(wrapper.is('.ux-tabs')).toBe(true);
    expect(taps.length).toBe(3);
    expect(taps.at(0).is('.ux-tabs-tab-active')).toBe(true);
    expect(taps.at(0).text()).toBe('Tab 1');
  });

  it('render UxTabs disabled', async () => {
    const wrapper = mount({
      template: `
          <ux-tabs>
            <ux-tab-pane tab="Tab 1" name="1">
              Tab 1 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 2" name="2" disabled>
              Tab 2 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 3" name="3">
              Tab 3 Content
            </ux-tab-pane>
          </ux-tabs>
        `,
      components: {
        UxTabPane,
        UxTabs,
      },
    });
    await waitTime();
    const taps = wrapper.findAll('.ux-tabs-tab');
    expect(taps.at(1).is('.ux-tabs-tab-disabled')).toBe(true);
  });

  it('render UxTabs click', async () => {
    const wrapper = mount({
      template: `
          <ux-tabs>
            <ux-tab-pane tab="Tab 1" name="1">
              Tab 1 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 2" name="2">
              Tab 2 Content
            </ux-tab-pane>
            <ux-tab-pane tab="Tab 3" name="3">
              Tab 3 Content
            </ux-tab-pane>
          </ux-tabs>
        `,
      components: {
        UxTabPane,
        UxTabs,
      },
    });
    await waitTime();
    const taps = wrapper.findAll('.ux-tabs-tab');
    await triggerEvent(taps.at(1), 'click');
    expect(taps.at(1).is('.ux-tabs-tab-active')).toBe(true);
  });

  it('emit event correctly', async () => {
    const tabClickFn = jest.fn();
    const wrapper = mount({
      render() {
        return (
          <UxTabs on-tab-click={tabClickFn} control>
            <UxTabPane tab="Tab 1" name="1">
              Tab 1 Content
            </UxTabPane>
            <UxTabPane tab="Tab 2" name="2">
              Tab 2 Content
            </UxTabPane>
            <UxTabPane tab="Tab 3" name="3">
              Tab 3 Content
            </UxTabPane>
          </UxTabs>
        );
      }
    });
    await waitTime();
    const taps = wrapper.findAll('.ux-tabs-tab');
    await triggerEvent(taps.at(1), 'click');
    await waitTime(100);
    expect(tabClickFn).toBeCalled();
  });

  it('change mode correctly', async () => {
    const wrapper = mount({
      data() {
        return {
          mode: 'left'
        };
      },
      render() {
        const { mode } = this;
        return (
          <UxTabs { ...{ props: { 'tab-position': mode } }}>
            <UxTabPane tab="Tab 1" name="1">
              Tab 1 Content
            </UxTabPane>
            <UxTabPane tab="Tab 2" name="2">
              Tab 2 Content
            </UxTabPane>
            <UxTabPane tab="Tab 3" name="3">
              Tab 3 Content
            </UxTabPane>
          </UxTabs>
        );
      }
    });
    await waitTime();
    expect(wrapper.find('.ux-tabs-left')).toBeTruthy();
    wrapper.setProps({ mode: 'top' });
    await waitTime();
    expect(wrapper.find('.ux-tabs-top')).toBeTruthy();
  });

  it('tabs icon correctly', async () => {
    const wrapper = mount({
      data() {
        return {

        };
      },
      render() {
        return (
          <UxTabs>
            <UxTabPane name="1">
              <span slot="tab"><UxIcon type="account-d" /> Tab 1 </span>
              Tab 1 Content
            </UxTabPane>
            <UxTabPane name="2">
              <span slot="tab"><UxIcon type="star-d" />Tab 2 </span>
              Tab 2 Content
            </UxTabPane>
            <UxTabPane tab="Tab 3" name="3">
              Tab 3 Content
            </UxTabPane>
          </UxTabs>
        );
      }
    });
    await waitTime();
    expect(wrapper.find('.fu .fu-account-d')).toBeTruthy();
  });

  it('render header correctly with slots', async () => {
    const wrapper = mount({
      render() {
        return (
          <UxTabs>
            <UxTabPane name="1">
              <span slot="tab">this is slot header</span>
              Tab 1 Content
            </UxTabPane>
            <UxTabPane name="2">
              <span slot="tab"><UxIcon type="star-d" />Tab 2 </span>
              Tab 2 Content
            </UxTabPane>
            <UxTabPane tab="Tab 3" name="3">
              Tab 3 Content
            </UxTabPane>
          </UxTabs>
        );
      },
    });
    await waitTime();
    expect(wrapper.findAll('.ux-tabs-tab').at(0).element.children[0].tagName).toBe('SPAN');
    expect(wrapper.findAll('.ux-tabs-tab').at(0).element.children[0].innerHTML).toBe(
      'this is slot header'
    );
  });
});
