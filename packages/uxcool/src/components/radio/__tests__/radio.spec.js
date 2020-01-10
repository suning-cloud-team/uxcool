import {
  mountPickerFactory, waitTime, triggerEvent, destroyWrapper
} from '@suning/v-test-utils';
import Radio from '../index';

describe('radio', () => {
  const mountRadio = mountPickerFactory(Radio);
  const mountRadioButton = mountPickerFactory(Radio.Button);
  const mountRadioGroup = mountPickerFactory(Radio.Group);
  it('render correctly', async () => {
    const wrapper = await mountRadio({
      propsData: {
        value: 'test value',
        label: 'test label',
      },
    });
    expect(wrapper.find('input').element.getAttribute('value')).toBe('test value');
    expect(wrapper.find('.ux-radio-wrapper').element.children[1].innerHTML).toBe('test label');
  });

  it('render control mode correctly', async () => {
    const wrapper = await mountRadio({
      propsData: {
        control: true,
        checked: true,
      },
    });
    await triggerEvent(wrapper, 'click');
    expect(wrapper.contains('.ux-radio-checked')).toBeTruthy();

    wrapper.setProps({
      checked: false,
    });
    await waitTime();
    expect(wrapper.contains('.ux-radio-checked')).toBeFalsy();

    wrapper.setProps({ control: false });
    await waitTime();
    await triggerEvent(wrapper, 'click');
    expect(wrapper.contains('.ux-radio-checked')).toBeTruthy();
  });

  it('render default status correctly', async () => {
    const wrapper = await mountRadio({
      propsData: {
        checked: false,
      },
    });
    expect(wrapper.contains('.ux-radio-checked')).not.toBeTruthy();
    wrapper.setProps({ checked: true });
    await waitTime();
    expect(wrapper.contains('.ux-radio-checked')).toBeTruthy();
  });

  it('event emitted correctly', async () => {
    const changeFn = jest.fn();
    const wrapper = await mountRadio({
      listeners: {
        change: changeFn,
      },
    });
    await triggerEvent(wrapper, 'click');
    expect(changeFn).toHaveBeenCalledTimes(1);
  });

  it('methods works correctly', async () => {
    const wrapper = await mountRadio({
      attachToDocument: true,
    });
    const radioEle = wrapper.find('input').element;
    wrapper.vm.focus();
    const { ownerDocument } = wrapper.element;
    expect(ownerDocument.activeElement).toBe(radioEle);
    wrapper.vm.blur();
    expect(ownerDocument.activeElement).toBe(ownerDocument.body);
    destroyWrapper(wrapper);
  });

  describe('radio-button test', () => {
    it('render button correctly', async () => {
      const wrapper = await mountRadioButton({
        propsData: {
          value: 'opt1',
        },
        slots: {
          default: 'test button',
        },
      });
      expect(wrapper.find('input').attributes('type')).toBe('radio');
      expect(wrapper.find('.ux-radio-button-wrapper').element.children[1].innerHTML).toBe(
        'test button'
      );
    });
  });

  describe('radio-group test', () => {
    it('render radio type correctly', async () => {
      const wrapper = await mountRadioGroup({
        propsData: {
          type: 'default',
          options: ['a'],
        },
      });
      expect(wrapper.contains('.ux-radio')).toBeTruthy();
      wrapper.setProps({ type: 'button' });
      await waitTime();
      expect(wrapper.contains('.ux-radio-button')).toBeTruthy();
    });

    it('render radio name correctly', async () => {
      const wrapper = await mountRadioGroup({
        propsData: {
          name: 'test name',
          options: ['a'],
        },
      });
      expect(wrapper.find('input').attributes('name')).toBe('test name');
    });

    it('render options correctly', async () => {
      const wrapper = await mountRadioGroup({
        propsData: {
          options: ['a', 'b', 'c'],
        },
      });
      expect(wrapper.findAll('input').length).toBe(3);
      wrapper.setProps({ options: ['a', 'b', 'c', 'd', 'e'] });
      await waitTime();
      expect(wrapper.findAll('input').length).toBe(5);
    });

    it('render selected value and emit event correctly', async () => {
      const changeFn = jest.fn();
      const wrapper = await mountRadioGroup({
        propsData: {
          value: 'b',
          options: ['a', 'b', 'c'],
        },
        listeners: {
          change: changeFn,
        },
      });
      expect(
        wrapper
          .find('.ux-radio-checked')
          .find('input')
          .attributes('value')
      ).toBe('b');

      await triggerEvent(wrapper.findAll('input').at(2), 'click');
      expect(
        wrapper
          .find('.ux-radio-checked')
          .find('input')
          .attributes('value')
      ).toBe('c');
      expect(changeFn).toHaveBeenCalledTimes(1);
    });
  });
});
