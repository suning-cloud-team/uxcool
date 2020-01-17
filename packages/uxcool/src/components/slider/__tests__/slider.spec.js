import { mountPickerFactory, waitTime, $ } from '@suning/v-test-utils';
import Slider from '..';

describe('Slider', () => {
  const mountSlider = mountPickerFactory(Slider);
  it('min', async () => {
    const wrapper = await mountSlider({
      propsData: {
        min: 30,
        value: [10, 40]
      },
    });

    expect(wrapper.find('.ux-slider-handle').attributes('aria-valuenow')).toBe('30');
  });
  it('max', async () => {
    const wrapper = await mountSlider({
      propsData: {
        max: 80,
      },
    });

    wrapper.setProps({ value: 90 });
    await waitTime();
    expect(wrapper.find('.ux-slider-handle').attributes('aria-valuenow')).toBe('80');
  });

  it('mouse event is correctly', async () => {
    const wrapper = await mountSlider({
      propsData: {
        value: 80,
      },
    });
    wrapper.find('.ux-slider-handle').trigger('mouseenter');
    await waitTime();
    expect($('.ux-tooltip-inner').text()).toContain('80');
    expect(wrapper.find('.ux-slider-handle').attributes('aria-valuenow')).toBe('80');
    wrapper.find('.ux-slider-handle').trigger('mouseleave');
  });

  it('range and value is array correctly', async () => {
    const wrapper = await mountSlider({
      propsData: {
        value: [20, 80],
        range: true,
        tabindex: [1, 2],
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-slider-handle-1').attributes('aria-valuenow')).toBe('20');
    expect(wrapper.find('.ux-slider-handle-1').attributes('tabindex')).toBe('1');
    expect(wrapper.find('.ux-slider-handle-2').attributes('aria-valuenow')).toBe('80');
    expect(wrapper.find('.ux-slider-handle-2').attributes('tabindex')).toBe('2');
  });
  it('range and value is number correctly', async () => {
    const wrapper = await mountSlider({
      propsData: {
        value: 20,
        range: true,
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-slider-handle-1').attributes('aria-valuenow')).toBe('20');
    expect(wrapper.find('.ux-slider-handle-2').attributes('aria-valuenow')).toBe('20');
  });

  it('range and value is not defined  is correctly', async () => {
    const wrapper = await mountSlider({
      propsData: {
        range: true
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-slider-handle-1').attributes('aria-valuenow')).toBe('0');
    expect(wrapper.find('.ux-slider-handle-2').attributes('aria-valuenow')).toBe('0');
  });

  it('tipFormat correct', async () => {
    const tipFormat = jest.fn((v) => `${v}%`);
    const wrapper = await mountSlider({
      propsData: {
        value: 20,
        tabindex: [1, 2],
        tipFormatter: tipFormat
      },
    });
    wrapper.find('.ux-slider-handle').trigger('mouseenter');
    await waitTime();
    expect(tipFormat).toHaveBeenCalled();
    expect($('.ux-tooltip-inner').text()).toContain('20%');
    expect(wrapper.find('.ux-slider-handle').attributes('tabindex')).toBe('1');
  });
});
