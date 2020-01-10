import {
  mount, waitTime, removePopup, $
} from '@suning/v-test-utils';
import { UxDropdown, UxDropdownButton } from '..';

const triggerDropdownWrapper = (
  trigger = 'hover',
  closeOnSelect = true,
  visibleChangeFn = jest.fn(),
  overlayClickFn = jest.fn()
) => mount(
  {
    render() {
      return (
          <UxDropdown
            trigger={trigger}
            close-on-select={closeOnSelect}
            on-visible-change={visibleChangeFn}
            on-overlay-click={overlayClickFn}
          >
            <a slot="trigger">trigger element</a>
            <p slot="overlay" class="overlay">
              dropdown content
            </p>
          </UxDropdown>
      );
    },
  },
  {
    attachToDocument: true,
    sync: false,
  }
);

it('three trigger methods', async () => {
  const hoverWrapper = triggerDropdownWrapper();
  await waitTime(20);
  hoverWrapper.trigger('mouseenter');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();

  const clickWrapper = triggerDropdownWrapper('click');
  await waitTime(20);
  clickWrapper.trigger('click');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();

  const focusWrapper = triggerDropdownWrapper('focus');
  await waitTime(20);
  focusWrapper.trigger('focusin');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].getAttribute('display')).not.toBe('none');
  removePopup();
});

it('render close on select correctly', async () => {
  const visibleChangeFn = jest.fn();
  const overlayClickFn = jest.fn();
  const clickWrapper = triggerDropdownWrapper('click', true, visibleChangeFn, overlayClickFn);
  clickWrapper.vm.$on('visible-change', visibleChangeFn);
  clickWrapper.vm.$on('overlay-click', overlayClickFn);
  await waitTime(20);
  clickWrapper.trigger('click');
  await waitTime(200);
  expect($('[role=align-popup]')[0]).not.toBeUndefined();
  expect($('[role=align-popup]')[0].style.display).not.toBe('none');
  expect(visibleChangeFn).toHaveBeenCalledTimes(1);
  $('.overlay').click();
  await waitTime(200);
  expect($('[role=align-popup]')[0].style.display).toBe('none');
  expect(visibleChangeFn).toHaveBeenCalledTimes(2);
  expect(overlayClickFn).toHaveBeenCalledTimes(1);
  removePopup();
});

it('render dropdown-button correctly', async () => {
  const clickFn = jest.fn();
  const wrapper = mount(UxDropdownButton, {
    slots: {
      overlay: 'popup content',
    },
    listeners: {
      click: clickFn,
    },
    attachToDocument: true,
    sync: false,
  });
  await waitTime(20);
  wrapper.find('button').trigger('click');
  await waitTime(200);
  expect(clickFn).toBeCalled();
  removePopup();
});
