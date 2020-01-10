import { mountPickerFactory, waitTime } from '@suning/v-test-utils';
import Slider from '..';

describe('Slider', () => {
  const mountSlider = mountPickerFactory(Slider);
  it('min', async () => {
    const wrapper = await mountSlider({
      propsData: {
        min: 30,
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
});
