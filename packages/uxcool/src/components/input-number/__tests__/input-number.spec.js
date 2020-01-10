import { mountPickerFactory, waitTime, triggerEvent } from '@suning/v-test-utils';
import InputNumber from '../index';

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
  });
});
