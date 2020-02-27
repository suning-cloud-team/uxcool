import Vue from 'vue';

import $ from 'jquery';
import { mount, createWrapper } from '@vue/test-utils';
import Trigger from '@suning/v-trigger';

export * from '@vue/test-utils';

// export * as server from '@vue/server-test-utils';

export { $, $ as jQuery };
// ms
export async function waitTime(delay = 20) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

export function removePopup() {
  document.body.innerHTML = '';
}

const vueInst = new Vue();
export function getVueCreateElement() {
  return vueInst.$createElement;
}

/**
 * 获取Trigger实例
 * @param {Wrapper} wrapper
 */
export async function getPortal(wrapper) {
  const trigger = wrapper.find(Trigger);
  const portal = createWrapper(trigger.vm.portal.$el);
  return portal;
}

/**
 * 触发事件
 * @param {Wrapper} wrapper
 * @param {string} eventName
 * @param {number} delay
 */
export async function triggerEvent(wrapper, eventName, event = {}, delay = 20) {
  let evt = event;
  let d = delay;
  if (typeof evt === 'number') {
    d = evt;
    evt = {};
  }
  wrapper.trigger(eventName, evt);
  await waitTime(d);
}

export function mountPickerFactory(Component) {
  return async (opts = {}) => {
    const wrapper = mount(Component, {
      ...opts,
    });
    await waitTime();
    return wrapper;
  };
}

export function destroyWrapper(wrapper) {
  wrapper.destroy();
}
