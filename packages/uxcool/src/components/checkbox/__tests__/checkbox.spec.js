import { mount } from '@suning/v-test-utils';
import { UxCheckbox, UxCheckboxGroup } from '..';

it('render checkbox correctly', () => {
  const changeFn = jest.fn();
  const wrapper = mount(UxCheckbox, {
    listeners: {
      change: changeFn,
    },
  });
  expect(wrapper.find('input').element.getAttribute('type')).toBe('checkbox');
  wrapper.find('input').trigger('click');
  expect(changeFn).toHaveBeenCalledTimes(1);
});

it('render indeterminate correctly', () => {
  const wrapper = mount(UxCheckbox, {
    propsData: {
      checked: false,
      indeterminate: true,
    },
  });
  expect(wrapper.contains('.ux-checkbox-indeterminate')).toBeTruthy();
});

it('render checkbox group correctly with slots', () => {
  const checkboxGroupChangeFn = jest.fn();
  const wrapper = mount({
    template: `
      <ux-checkbox-group v-model="checked" @change="checkboxGroupChangeFn">
        <ux-checkbox value="a">a</ux-checkbox>
        <ux-checkbox value="b">b</ux-checkbox>
        <ux-checkbox value="c">c</ux-checkbox>
      </ux-checkbox-group>
    `,
    components: { UxCheckbox, UxCheckboxGroup },
    data() {
      return {
        checked: [],
      };
    },
    methods: { checkboxGroupChangeFn },
  });
  expect(wrapper.findAll('input').length).toBe(3);
  wrapper
    .findAll('input')
    .at(0)
    .trigger('click');
  expect(checkboxGroupChangeFn).toHaveBeenCalledTimes(1);
  expect(wrapper.vm.checked).toMatchObject(['a']);
});

it('render checkbox group correctly with props', () => {
  const wrapper = mount(UxCheckboxGroup, {
    propsData: {
      options: [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }, { label: 'c', value: 'c' }],
    },
  });
  expect(wrapper.findAll('input').length).toBe(3);
});

it('methods works correctly', () => {
  const focusFn = jest.fn();
  const blurFn = jest.fn();
  const wrapper = mount(UxCheckbox);
  const checkboxEle = wrapper.find('input').element;
  checkboxEle.onfocus = focusFn;
  checkboxEle.onblur = blurFn;
  wrapper.vm.focus();
  expect(focusFn).toBeCalled();
  wrapper.vm.blur();
  expect(blurFn).toBeCalled();
});
