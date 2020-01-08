import { createWrapper, waitTime, mount } from '@suning/v-test-utils';
import dayjs from 'dayjs';
// import { format as formatDate, isDate } from 'date-fns';
import Trigger from '@suning/v-trigger';
import { isDate } from 'lodash';

export function mountPickerFactory(Component) {
  return async (opts = {}) => {
    const wrapper = mount(Component, {
      ...opts,
    });
    await waitTime();
    return wrapper;
  };
}
/**
 * 选择 时间
 * @param {Wrapper} wrapper
 * @param {string|Date} date
 * @param {string} format
 * @param {number} delay
 */
export async function selectDate(wrapper, date, format = 'YYYY-MM-DD', delay = 20) {
  wrapper
    .find(
      `[role="gridcell"][title="${
        isDate(date) || dayjs.isDayjs(date) ? dayjs(date).format(format) : date
      }"]`
    )
    .trigger('click');

  await waitTime(delay);
}

export function noop() {}

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
export async function triggerEvent(wrapper, eventName, delay = 20) {
  wrapper.trigger(eventName);
  await waitTime(delay);
}
