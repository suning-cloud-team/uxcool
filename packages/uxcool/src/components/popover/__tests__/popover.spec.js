import { triggerEvent, mountPickerFactory, getPortal } from '@cloud-sn/v-test-utils';
import Popover from '../popover.vue';

const mountPopover = mountPickerFactory(Popover);
describe('popover', () => {
  describe('trigger', () => {
    it.each([
      ['click', 'click', 'click', 20, 20],
      ['hover', 'mouseenter', 'mouseleave', 20, 20],
      ['focus', 'focusin', 'focusout', 150, 150],
    ])('trigger %s event', async (trigger, enter, leave, enterDelay, leaveDelay) => {
      const wrapper = await mountPopover({
        propsData: {
          trigger,
          transitionName: '',
          animation: '',
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
        },
        slots: {
          default: '<span id="trigger">test</span>',
        },
      });
      await triggerEvent(wrapper, enter, enterDelay);
      const portal = await getPortal(wrapper);
      expect(portal.find('.ux-popover').exists()).toBeTruthy();

      await triggerEvent(wrapper, leave, leaveDelay);
      expect(portal.find('.ux-popover').element.style.display).toBe('none');
    });
  });

  it('render correctly', async () => {
    const wrapper = await mountPopover({
      propsData: {
        tirgger: 'hover',
        transitionName: '',
        animation: '',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0,
      },
      slots: {
        default: '<span>test</span>',
        title: 'this is title',
        content: 'this is content',
      },
    });
    await triggerEvent(wrapper, 'mouseenter');
    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-popover-title').text()).toBe('this is title');
    expect(portal.find('.ux-popover-inner-content').text()).toBe('this is content');
  });

  describe('render placement correctly', () => {
    it.each([
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ])('render %s correctly', async (placement) => {
      const wrapper = await mountPopover({
        propsData: {
          placement,
          trigger: 'hover',
          transitionName: '',
          animation: '',
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
        },
        slots: {
          default: '<span>test</span>',
        },
      });
      await triggerEvent(wrapper, 'mouseenter');
      const portal = await getPortal(wrapper);
      expect(portal.find(`.ux-popover-placement-${placement}`).exists()).toBeTruthy();
    });
  });
});
