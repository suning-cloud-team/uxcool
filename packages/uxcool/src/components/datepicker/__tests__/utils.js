import { createWrapper, waitTime } from '@suning/v-test-utils';
import dayjs from 'dayjs';
// import { format as formatDate, isDate } from 'date-fns';
import Trigger from '@suning/v-trigger';
import { isDate } from 'lodash';

export async function selectDate(wrapper, date, format = 'YYYY-MM-DD', delay = 20) {
  wrapper
    .find(`[role="gridcell"][title="${isDate(date) ? dayjs(date).format(format) : date}"]`)
    .trigger('click');

  await waitTime(delay);
}

export function noop() {}
export async function getPortal(wrapper) {
  const trigger = wrapper.find(Trigger);
  const portal = createWrapper(trigger.vm.portal.$el);
  return portal;
}

export async function triggerEvent(wrapper, eventName, delay = 20) {
  wrapper.trigger(eventName);
  await waitTime(delay);
}
