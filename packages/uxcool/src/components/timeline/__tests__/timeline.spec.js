import { mount, waitTime } from '@suning/v-test-utils';
import { UxTimeline, UxTimelineItem } from '..';
import { UxIcon } from '../../components';

describe('timeline', () => {
  it('render correctly', async () => {
    const wrapper = mount({
      template: `
       <ux-timeline>
        <ux-timeline-item color="green">A</ux-timeline-item>
        <ux-timeline-item>B</ux-timeline-item>
        <ux-timeline-item>C</ux-timeline-item>
      </ux-timeline>
      `,
      components: {
        UxTimeline,
        UxTimelineItem,
      }
    });
    await waitTime();
    expect(wrapper.findAll('.ux-timeline-item').length).toBe(3);
    expect(wrapper.findAll('.ux-timeline-item-content').at(0).text()).toBe('A');
    expect(wrapper.findAll('.ux-timeline-item-content').at(1).text()).toBe('B');
    expect(wrapper.findAll('.ux-timeline-item-content').at(2).text()).toBe('C');
    expect(wrapper.find('.ux-timeline-item-head-green').exists()).toBeTruthy();
  });

  it('render slot and revert correctly', async () => {
    const wrapper = mount({
      template: `
        <ux-timeline :reverse="true">
          <span slot="pending">slotpending</span>
          <ux-icon slot="pendingDot" type="horn_o" />               
          <ux-timeline-item>A</ux-timeline-item>
          <ux-timeline-item>B</ux-timeline-item>
          <ux-timeline-item>C</ux-timeline-item>
        </ux-timeline>
      `,
      components: {
        UxTimeline,
        UxTimelineItem,
        UxIcon
      }
    });
    const itemWrappers = wrapper.findAll('.ux-timeline-item');
    expect(itemWrappers.at(0).classes('ux-timeline-item-pending')).toBeTruthy();
    expect(itemWrappers.at(0).find('.ux-timeline-item-content')).toBe('slotpending');
    expect(itemWrappers.at(1).find('.ux-timeline-item-content')).toBe('C');
    expect(itemWrappers.at(2).find('.ux-timeline-item-content')).toBe('B');
    expect(itemWrappers.at(3).find('.ux-timeline-item-content')).toBe('A');
  });
});
