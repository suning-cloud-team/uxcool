import { mountPickerFactory, waitTime, triggerEvent } from '@cloud-sn/v-test-utils';
import InputNumber from '../index';
import { UxInput } from '../../input';
import { mount } from '../../../../../v-test-utils/src';
/*
keydown事件
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

const mountInputNumber = mountPickerFactory(InputNumber);
describe('input-number', () => {
  it('limit min and max correctly', async () => {
    const wrapper = await mountInputNumber({
      propsData: {
        max: 10,
        min: 0,
      },
    });
    wrapper.setProps({ value: 100 });
    await waitTime();
    expect(wrapper.find('input').element.value).toBe('10');
    wrapper.setProps({ value: -10 });
    await waitTime();
    expect(wrapper.find('input').element.value).toBe('0');
  });

  it('step works correctly', async () => {
    const wrapper = await mountInputNumber({
      propsData: {
        step: 2,
        value: 0,
      },
    });
    const input = wrapper.find('input');
    await triggerEvent(wrapper.find('.ux-input-number-handler-up'), 'mousedown');
    expect(input.element.value).toBe('2');
    await triggerEvent(wrapper.find('.ux-input-number-handler-down'), 'mousedown');
    expect(input.element.value).toBe('0');
  });

  it('precision works correctly', async () => {
    const wrapper = await mountInputNumber({
      propsData: {
        precision: 2,
        value: 0.123456,
      },
    });
    expect(wrapper.find('input').element.value).toBe('0.12');
  });

  it('formatter and parser works correctly', async () => {
    // input(string) -> parser -> inputValue(string)
    // -> innerValue(number/string) -> formatter -> formatterValue(string)
    const wrapper = await mountInputNumber({
      propsData: {
        parser: (val) => val.replace(/[^0-9]/, ''),
        value: '99a',
      },
    });
    expect(wrapper.find('input').element.value).toBe('99');
    wrapper.setProps({
      formatter: (val) => `${val * 100}%`,
    });
    await waitTime();
    expect(wrapper.find('input').element.value).toBe('9900%');
    wrapper.destroy();
  });

  it('event is correctly', async () => {
    const changeFn = jest.fn();
    const inputChangeFn = jest.fn();
    const keydownFn = jest.fn();
    const keyupFn = jest.fn();
    const wrapper = await mountInputNumber({
      propsData: {
        max: 10,
        min: 0,
      },
      listeners: {
        change: changeFn,
        keydown: keydownFn,
        keyup: keyupFn,
      },
    });
    wrapper.vm.$on('input-change', inputChangeFn);
    wrapper.vm.focus();
    const inputWrapper = wrapper.find('input');
    inputWrapper.setValue(4);
    inputWrapper.trigger('keydown.up');
    await waitTime();
    inputWrapper.trigger('keyup.up');
    await waitTime();
    inputWrapper.trigger('keydown.up');
    await waitTime();
    inputWrapper.trigger('keyup.up');
    await waitTime();
    inputWrapper.trigger('keydown.down');
    await waitTime();
    inputWrapper.trigger('keyup.down');
    wrapper.vm.blur();
    await waitTime();
    expect(inputWrapper.element.value).toBe('5');
    expect(changeFn).toHaveBeenCalled();
    expect(inputChangeFn).toHaveBeenCalled();
    expect(keydownFn).toHaveBeenCalled();
    expect(keyupFn).toHaveBeenCalled();
    wrapper.find('.ux-input-number-handler-up').trigger('mousedown');
    await waitTime();
    expect(inputWrapper.element.value).toBe('6');
    inputWrapper.trigger('focus');
    inputWrapper.element.value = '7';
    inputWrapper.trigger('change');
    await waitTime(50);
    expect(inputWrapper.element.value).toBe('7');
  });
});
