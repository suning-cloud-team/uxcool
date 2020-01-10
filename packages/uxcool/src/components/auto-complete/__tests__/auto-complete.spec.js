import { mount, waitTime } from '@suning/v-test-utils';
import UxAutoComplete from '../index';
import { UxOption } from '../../select/index';

const inputFn = jest.fn();
const changeFn = jest.fn();
const searchFn = jest.fn();
const selectFn = jest.fn();
const popupVisbleChangeFn = jest.fn();

it('render correctly use datasource with filter', async () => {
  const DATASOURCE = [
    { key: 1, value: 'a' },
    { key: 2, value: 'aa' },
    { key: 3, value: 'aaa' },
    { key: 4, value: 'bbbb' },
  ];
  const wrapper = mount(UxAutoComplete, {
    propsData: {
      dataSource: DATASOURCE,
      filterOption: true,
    },
    listeners: {
      input: inputFn,
      change: changeFn,
      select: selectFn,
      search: searchFn,
      'popup-visible-change': popupVisbleChangeFn,
    },
    attachToDocument: true,
    sync: false,
  });
  const inputElement = wrapper.find('input');
  inputElement.element.value = 'a';
  inputElement.trigger('input');
  inputElement.trigger('change');
  expect(inputFn).toHaveBeenCalledTimes(1);
  expect(changeFn).toHaveBeenCalledTimes(1);
  await waitTime(20);
  expect(searchFn).toHaveBeenCalledTimes(1);
  expect(popupVisbleChangeFn).toHaveBeenCalled();
  const popup = document.getElementsByClassName('ux-select-dropdown-content')[0];
  const list = popup.getElementsByTagName('li');
  expect(list.length).toBe(3);
  expect(list[0].innerHTML).toBe('a');
  expect(list[1].innerHTML).toBe('aa');
  expect(list[2].innerHTML).toBe('aaa');
  list[0].click();
  expect(searchFn).toHaveBeenCalledTimes(1);
  wrapper.destroy();
});

it('render correctly use option without filter', async () => {
  const wrapper = mount(
    {
      template: `
      <ux-auto-complete>
        <ux-option :key="1" value="a">a</ux-option>
        <ux-option :key="2" value="aa">aa</ux-option>
        <ux-option :key="3" value="aaa">aaa</ux-option>
        <ux-option :key="4" value="bbbb">bbbb</ux-option>
      </ux-auto-complete>
    `,
      components: { UxAutoComplete, UxOption },
    },
    { attachToDocument: true, sync: false }
  );
  const inputElement = wrapper.find('input');
  inputElement.element.value = 'a';
  inputElement.trigger('input');
  inputElement.trigger('change');
  await waitTime(20);
  const popup = document.getElementsByClassName('ux-select-dropdown-content')[0];
  const list = popup.getElementsByTagName('li');
  expect(list.length).toBe(4);
  expect(list[0].innerHTML).toBe('a');
  expect(list[1].innerHTML).toBe('aa');
  expect(list[2].innerHTML).toBe('aaa');
  expect(list[3].innerHTML).toBe('bbbb');
  wrapper.destroy();
});

it('allow clear operate correctly', async () => {
  const DATASOURCE = [
    { key: 1, value: 'a' },
    { key: 2, value: 'aa' },
    { key: 3, value: 'aaa' },
    { key: 4, value: 'bbbb' },
  ];
  const wrapper = mount(UxAutoComplete, {
    propsData: {
      dataSource: DATASOURCE,
      allowClear: true,
    },
    listeners: {
      input: inputFn,
      change: changeFn,
    },
    attachToDocument: true,
    sync: false,
  });
  const inputElement = wrapper.find('input');
  inputElement.element.value = 'a';
  inputElement.trigger('input');
  inputElement.trigger('change');
  await waitTime(20);
  const clearButton = wrapper.find('.ux-select-selection__clear');
  clearButton.trigger('click');
  await waitTime(100);
  expect(inputElement.element.value).toBe('');
  wrapper.destroy();
});

it('use custom render input element', () => {
  const wrapper = mount(UxAutoComplete, {
    slots: {
      renderInputElement: '<textarea></textarea>',
    },
  });
  const inputElement = wrapper.find('.ux-select-search__field');
  expect(inputElement.element.tagName).toBe('TEXTAREA');
});
