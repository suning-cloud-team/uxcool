// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, mountPickerFactory, waitTime } from '@suning/v-test-utils';
import { VSlider, VSliderRange } from '../index';
import {
  getMousePosition,
  getTouchPosition,
  getPrecision,
  isTargetEvent,
  getPositionAndDragOffset,
} from '../utils';

describe('VSlider', () => {
  it('range text click', async () => {
    const wrapper = mount({
      render() {
        return (
          <VSliderRange
            ref="test"
            style={{ height: '300px' }}
            vertical
            value={[20, 30, 50, 60]}
            allowCross={false}
            pushable={false}
            marks={{ 10: '10', 40: '40' }}
          />
        );
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.$refs.test.$children[5].onClick();
    // wrapper
    //   .findAll('.v-slider-mark-text')
    //   .at(1)
    //   .trigger('click');
    // await waitTime();
    // expect(wrapper.find('.v-slider-handle-3').attributes('aria-valuenow')).toBe('40');

    wrapper.destroy();
    await waitTime();
  });

  it('focus, blur', async () => {
    const wrapper = mount({
      render() {
        return (
          <VSlider
            id="testUt"
            ref="handleRef"
            value={100}
            class="fb"
            step={false}
            autofocus={true}
          />
        );
      },
    });
    await wrapper.vm.$nextTick();
    getPositionAndDragOffset(
      {
        ...wrapper.vm.$refs.handleRef.$el.children[3],
        target: wrapper.vm.$refs.handleRef.$el.children[3],
      },
      false,
      false,
      'mouse'
    );
    getPositionAndDragOffset(
      {
        ...wrapper.vm.$refs.handleRef.$el.children[3],
        target: wrapper.vm.$refs.handleRef.$el.children[3],
      },
      false,
      true,
      'mouse'
    );
    getPositionAndDragOffset(
      {
        ...wrapper.vm.$refs.handleRef.$el.children[3],
        target: wrapper.vm.$refs.handleRef.$el.children[3],
      },
      true,
      false,
      'mouse'
    );
    getPositionAndDragOffset(
      {
        ...wrapper.vm.$refs.handleRef.$el.children[3],
        target: wrapper.vm.$refs.handleRef.$el.children[3],
      },
      true,
      true,
      'mouse'
    );
    getPositionAndDragOffset(
      { ...new TouchEvent(100), touches: [{ clientY: 1, clientX: 2 }] },
      false,
      false,
      'touch'
    );
    getPositionAndDragOffset(
      { ...new TouchEvent(100), touches: [{ clientY: 1, clientX: 2 }] },
      true,
      false,
      'touch'
    );
    isTargetEvent(new MouseEvent(100), wrapper.vm.$refs.handleRef);
    isTargetEvent(new MouseEvent(100), null);
    wrapper.find('.v-slider-handle').trigger('focus');
    await waitTime();
    expect(wrapper.find('.v-slider-handle').attributes('dragging')).toBeTruthy();
    wrapper.find('.v-slider-handle').trigger('blur');
    await waitTime();
    wrapper.vm.$refs.handleRef.focus();
    wrapper.vm.$refs.handleRef.blur();
    wrapper.destroy();
    await waitTime();
  });

  const mountVSlider = mountPickerFactory(VSlider);
  it('min', async () => {
    const wrapper = await mountVSlider({
      propsData: {
        min: 30,
        value: 0,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-handle').attributes('aria-valuenow')).toBe('30');
    wrapper.destroy();
    await waitTime();
  });
  it('max', async () => {
    const wrapper = await mountVSlider({
      propsData: {
        max: 80,
      },
    });

    wrapper.setProps({ value: 90 });
    await waitTime();
    expect(wrapper.find('.v-slider-handle').attributes('aria-valuenow')).toBe('80');
    wrapper.destroy();
    await waitTime();
  });

  it('disabled', async () => {
    await mountVSlider({
      propsData: {
        disabled: true,
      },
    });
  });

  it('setSlide is func', async () => {
    const wrapper = await mountVSlider({
      propsData: {
        value: 0,
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.onStart(wrapper.vm.$event, 10);
    wrapper.vm.onMove(new MouseEvent(100), 100);
    wrapper.vm.onEnd(wrapper.vm.$event, 100);
    await wrapper.vm.$nextTick();
    // expect(wrapper.find('.v-slider-handle').attributes('aria-valuenow')).toBe('0');
    wrapper.destroy();
    await waitTime();
  });

  const mountVSliderRange = mountPickerFactory(VSliderRange);

  it('range and value is array correctly', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        value: [0, 80],
        range: true,
        tabindex: [1, 2],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-handle-1').attributes('aria-valuenow')).toBe('0');
    expect(wrapper.find('.v-slider-handle-1').attributes('tabindex')).toBe('1');
    expect(wrapper.find('.v-slider-handle-2').attributes('aria-valuenow')).toBe('80');
    expect(wrapper.find('.v-slider-handle-2').attributes('tabindex')).toBe('2');
    wrapper.destroy();
    await waitTime();
  });

  it('range and value is not defined  is correctly', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        range: true,
        disabled: true,
      },
    });
    await waitTime();
    expect(wrapper.find('.v-slider-handle-1').attributes('aria-valuenow')).toBe('0');
    expect(wrapper.find('.v-slider-handle-2').attributes('aria-valuenow')).toBe('0');
    wrapper.destroy();
    await waitTime();
  });

  it('setSlideRange is func', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        value: [0, 100],
        allowCross: false,
        marks: { 10: '10', 40: '40' },
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.onStart(wrapper.vm.$event, 100);
    wrapper.vm.onMove(new MouseEvent(100), 100);
    wrapper.vm.onEnd(wrapper.vm.$event, 100);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-handle-2').attributes('aria-valuenow')).toBe('100');
    wrapper.destroy();
    await waitTime();
  });

  it('setSlideRange is addPointTracks', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        value: [0, 100],
        marks: { 10: '10', 40: '40' },
        step: 2,
        min: 0,
        max: 100,
        dots: true,
        vertical: true,
      },
    });
    await wrapper.vm.$nextTick();
    getPrecision(2.6);
    wrapper.vm.onChange(100);
    expect(wrapper.find('.v-slider-handle-2').attributes('aria-valuenow')).toBe('100');
    wrapper.destroy();
    await waitTime();
  });

  it('setSlideRange is moveTo', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        value: [0, 100],
        // marks: { 10: '10', 40: '40' },
      },
    });
    wrapper.vm.ensureMovePoint(90);
    wrapper.vm.addPointTracks();
    wrapper.vm.moveTo(90);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-handle-1').attributes('aria-valuenow')).toBe('90');
    wrapper.destroy();
    await waitTime();
  });

  it('setSlideRange is ensureValueNotConflict', async () => {
    const wrapper = await mountVSliderRange({
      propsData: {
        value: [0, 100],
        allowCross: false,
        min: 0,
        max: 100,
      },
    });
    getMousePosition(new MouseEvent(100), false);
    getMousePosition(new MouseEvent(100), true);
    wrapper.vm.ensureValueNotConflict(0, 0);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-slider-handle-1').attributes('aria-valuenow')).toBe('0');
    getTouchPosition({ ...new TouchEvent(100), touches: [{ clientY: 1, clientX: 2 }] }, true);
    getTouchPosition({ ...new TouchEvent(100), touches: [{ clientY: 1, clientX: 2 }] }, false);
    wrapper.destroy();
    await waitTime();
  });
});
