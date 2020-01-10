import { mount } from '@suning/v-test-utils';
import UxIcon from '..';

it('render icon correctly', () => {
  const clickFn = jest.fn();
  const wrapper = mount(UxIcon, {
    propsData: {
      type: 'testType',
      title: 'testTitle',
      spin: true,
    },
    listeners: {
      click: clickFn,
    },
  });
  wrapper.trigger('click');
  expect(wrapper.attributes('title')).toBe('testTitle');
  expect(wrapper.classes('fu-testType')).toBeTruthy();
  expect(wrapper.classes('fu-spin')).toBeTruthy();
  expect(clickFn).toHaveBeenCalledTimes(1);
});
