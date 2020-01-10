import { mount, waitTime, $ } from '@suning/v-test-utils';
import UxPopconfirm from '..';

it('render correctly', async () => {
  const confirmFn = jest.fn();
  const cancelFn = jest.fn();
  const visibleChangeFn = jest.fn();
  const wrapper = mount(UxPopconfirm, {
    propsData: {
      okText: 'OK',
      okType: 'danger',
      cancelText: 'CANCEL',
    },
    slots: {
      default: '<span>test</span>',
      title: '<p>this is title</p>',
    },
    listeners: {
      confirm: confirmFn,
      cancel: cancelFn,
      'visible-change': visibleChangeFn,
    },
  });
  wrapper.find('span').element.focus();
  await waitTime(50);
  wrapper.find('span').element.click();
  await waitTime(50);
  expect(visibleChangeFn).toHaveBeenCalledTimes(1);
  expect($('.ux-popover-message-title')[0].children[0].outerHTML).toBe('<p>this is title</p>');
  expect($('.ux-popover-buttons')[0].children[0].innerHTML).toBe('<span>CANCEL</span>');
  expect($('.ux-popover-buttons')[0].children[1].innerHTML).toBe('<span>OK</span>');
  expect($('.ux-btn-danger').length).toBe(1);
  $('.ux-popover-buttons')[0].children[1].click();
  expect(confirmFn).toHaveBeenCalled();
  await waitTime(50);
  expect(visibleChangeFn).toHaveBeenCalledTimes(3);
  wrapper.find('span').element.focus();
  await waitTime(50);
  wrapper.find('span').element.click();
  await waitTime(50);
  $('.ux-popover-buttons')[0].children[0].click();
  expect(cancelFn).toHaveBeenCalled();
  await waitTime(50);
  expect(visibleChangeFn).toHaveBeenCalledTimes(6);
  document.body.innerHTML = '';
});
