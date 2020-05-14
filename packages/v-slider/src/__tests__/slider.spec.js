// eslint-disable-next-line import/no-extraneous-dependencies
import { mountPickerFactory, triggerEvent } from '@suning/v-test-utils';
import { VSlider, VSliderRange } from '../index';

describe('slider', () => {
  jest.setTimeout(100000);
  const mountSlider = mountPickerFactory(VSlider);

  it('render correctly', async () => {
    const wrapper = await mountSlider({
      propsData: {
        value: 50,
      },
    });

    const handle = wrapper.find({ ref: 'sliderHandleRef' });
    expect(handle.attributes('aria-valuenow')).toBe('50');
    expect(handle.attributes('aria-valuemin')).toBe('0');
    expect(handle.attributes('aria-valuemax')).toBe('100');

    expect(wrapper.find('.v-slider-step').exists()).toBe(true);
    expect(wrapper.find('.v-slider-step').isEmpty()).toBe(true);
  });

  it('disabled', async () => {
    const onMouseDown = jest.fn();
    const wrapper = await mountSlider({
      propsData: {
        disabled: true,
      },
      methods: {
        onMouseDown,
      },
    });

    triggerEvent(wrapper, 'mousedown');
    expect(onMouseDown).not.toBeCalled();
  });

  it('focus and blur', async () => {
    const focusFn = jest.fn();
    const blurFn = jest.fn();

    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 1000,
      height: 12,
      x: 6,
      y: 14,
      left: 6,
      top: 14,
      right: 1000,
      bottom: 26,
    }));

    const wrapper = await mountSlider({
      listeners: {
        focus: focusFn,
        blur: blurFn,
      },
    });
    wrapper.vm.focus();
    await wrapper.vm.$nextTick();
    expect(focusFn).toBeCalled();
    wrapper.vm.blur();
    await wrapper.vm.$nextTick();
    expect(blurFn).toBeCalled();
  });

  it('drag', async () => {
    HTMLDivElement.prototype.getBoundingClientRect = jest
      .fn(() => ({
        width: 1000,
        height: 12,
        x: 6,
        y: 14,
        left: 6,
        top: 14,
        right: 1000,
        bottom: 26,
      }))
      .mockImplementationOnce(() => ({
        width: 14,
        height: 14,
        x: -1,
        y: 13,
        left: -1,
        top: 13,
        right: 13,
        bottom: 27,
      }));

    const onChange = jest.fn();
    const wrapper = await mountSlider({
      attachToDocument: true,
      listeners: {
        change: onChange,
      },
    });
    const handler = wrapper.find({ ref: 'sliderHandleRef' });

    await triggerEvent(handler, 'mousedown', {
      clientX: 4,
      clientY: 17,
      button: 2,
    });

    expect(onChange).not.toBeCalled();
    expect(wrapper.vm.innerValue).toBe(0);

    await triggerEvent(handler, 'mousedown', {
      clientX: 4,
      clientY: 17,
      button: 0,
    });

    expect(onChange).not.toBeCalled();

    await triggerEvent(wrapper, 'mousemove', {
      clientX: 1500,
      clientY: 28,
    });

    expect(onChange).toBeCalled();
    expect(wrapper.vm.innerValue).toBe(100);

    wrapper.destroy();
  });

  it('step', async () => {
    const wrapper = await mountSlider({
      propsData: {
        step: 2,
        min: 0,
        max: 10,
        dots: true,
      },
    });

    expect(wrapper.findAll('.v-slider-dot').length).toBe(6);
  });

  it('marks', async () => {
    const wrapper = await mountSlider({
      propsData: {
        step: 2,
        min: 0,
        max: 10,
        marks: {
          0: '0℃',
          2: '2℃',
          10: {
            style: {
              color: 'green',
            },
            label: '10℃',
          },
        },
        attachToDocument: true,
      },
    });
    expect(wrapper.findAll('.v-slider-mark-text').length).toBe(3);

    await triggerEvent(wrapper.findAll('.v-slider-mark-text').at(2), 'mousedown', {
      clientX: 1000,
      clientY: 39,
      button: 0,
    });
    expect(wrapper.vm.innerValue).toBe(10);
    wrapper.destroy();
  });

  it('vertical', async () => {
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 14,
      height: 500,
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 14,
      bottom: 500,
    }));

    const onChange = jest.fn();
    const wrapper = await mountSlider({
      propsData: {
        step: 2,
        min: 0,
        max: 10,
        vertical: true,
      },
      listeners: {
        change: onChange,
      },
    });

    await triggerEvent(wrapper, 'mousedown', {
      clientX: 5,
      clientY: 250,
      button: 0,
    });

    expect(onChange).toBeCalled();
  });

  it('included', async () => {
    const wrapper = await mountSlider({
      propsData: {
        value: 50,
      },
    });

    expect(wrapper.find('.v-slider-track').exists()).toBe(true);

    wrapper.setProps({
      included: false,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-track').exists()).toBe(false);
  });

  it('watch', async () => {
    const onChange = jest.fn();
    const wrapper = await mountSlider({
      propsData: {
        value: 20,
        min: 0,
        max: 100,
      },
      listeners: {
        change: onChange,
      },
    });

    expect(wrapper.vm.innerValue).toBe(20);

    wrapper.setProps({
      min: 40,
    });
    await wrapper.vm.$nextTick();
    expect(onChange).lastCalledWith(40);
    expect(wrapper.vm.innerValue).toBe(40);
  });
});

describe('sliderRange', () => {
  const mountSliderRange = mountPickerFactory(VSliderRange);

  it('render correctly', async () => {
    const onChange = jest.fn();
    const wrapper = await mountSliderRange({
      propsData: {
        value: [],
      },
      listeners: {
        change: onChange,
      },
    });

    expect(wrapper.findAll({ ref: 'sliderHandleRef' }).length).toBe(2);
    expect(wrapper.findAll('.v-slider-track').length).toBe(1);
    expect(wrapper.find('.v-slider-dot').exists()).toBe(false);
    expect(wrapper.find('.v-slider-mark-text').exists()).toBe(false);
    expect(wrapper.vm.innerValue).toEqual([0, 0]);

    wrapper.setProps({
      value: [20, 30],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.innerValue).toEqual([20, 30]);
    expect(onChange).lastCalledWith([20, 30]);
  });

  it('drag', async () => {
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 1000,
      height: 14,
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 1000,
      bottom: 14,
    }));

    const onChange = jest.fn();
    const wrapper = await mountSliderRange({
      propsData: {
        value: [20, 30],
      },
      listeners: {
        change: onChange,
      },
      attachToDocument: true,
    });

    await triggerEvent(wrapper, 'mousedown', {
      clientX: 240,
      clientY: 14,
      button: 0,
    });

    expect(onChange).toBeCalled();

    await triggerEvent(wrapper, 'mousemove', {
      clientX: 1000,
      clientY: 14,
    });

    expect(wrapper.vm.innerValue).toEqual([30, 100]);
    await triggerEvent(wrapper, 'mouseup');
    expect(wrapper.emitted()['after-change']).toBeTruthy();

    wrapper.destroy();
  });

  it('not allowCross', async () => {
    HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 1000,
      height: 14,
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 1000,
      bottom: 14,
    }));

    const wrapper = await mountSliderRange({
      propsData: {
        value: [20, 30],
        allowCross: false,
      },
      attachToDocument: true,
    });

    await triggerEvent(wrapper, 'mousedown', {
      clientX: 740,
      clientY: 14,
      button: 0,
    });

    await triggerEvent(wrapper, 'mousemove', {
      clientX: 0,
      clientY: 14,
    });

    expect(wrapper.vm.innerValue).toEqual([20, 20]);

    wrapper.destroy();
  });
});
