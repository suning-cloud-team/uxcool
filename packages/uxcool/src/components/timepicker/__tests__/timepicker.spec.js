import {
  mountPickerFactory, mount, waitTime, getPortal, triggerEvent
} from '@cloud-sn/v-test-utils';
import Timepicker from '..';


const mountTimepicker = mountPickerFactory(Timepicker);
describe('timepicker', () => {
  it('render correctly', async () => {
    const value = new Date(2018, 7, 20, 0, 45, 25);
    const newvValue = new Date(2018, 7, 20, 1, 45, 25);
    const wrapper = await mountTimepicker({
      propsData: {
        value
      }
    });
    expect(wrapper.vm.$data.innerValue).toBe(value);
    expect(wrapper.find('input').element.value).toBe('00:45:25');
    wrapper.vm.focus();
    await triggerEvent(wrapper.find('input'), 'click');
    const portal = await getPortal(wrapper);
    const timepickerPanels = portal.findAll('.ux-time-picker-panel-select');
    expect(timepickerPanels.at(0).findAll('li').length).toBe(24);
    expect(timepickerPanels.at(0).find('.ux-time-picker-panel-select-option-selected').text()).toBe('00');
    expect(timepickerPanels.at(1).findAll('li').length).toBe(60);
    expect(timepickerPanels.at(1).find('.ux-time-picker-panel-select-option-selected').text()).toBe('45');
    expect(timepickerPanels.at(2).findAll('li').length).toBe(60);
    expect(timepickerPanels.at(2).find('.ux-time-picker-panel-select-option-selected').text()).toBe('25');

    wrapper.setProps({ value: newvValue });
    await waitTime();
    expect(timepickerPanels.at(0).find('.ux-time-picker-panel-select-option-selected').text()).toBe('01');
  });

  it('rend open-value correctly', async () => {
    const openValue = new Date(2018, 7, 20, 2, 45, 15);
    const changedOpenValue = new Date(2018, 7, 20, 3, 25, 45);
    const wrapper = await mountTimepicker({
      propsData: {
        openValue
      }
    });
    expect(wrapper.find('input').element.value).toBe('');
    expect(wrapper.vm.$data.innerOpenValue).toBe(openValue);
    wrapper.setProps({ openValue: changedOpenValue });
    await waitTime();
    expect(wrapper.vm.$data.innerOpenValue).toBe(changedOpenValue);
  });

  it('rend format correctly', async () => {
    const openValue = new Date(2018, 7, 20, 2, 45, 15);
    const format = 'H:m';
    const wrapper = await mountTimepicker({
      propsData: {
        openValue,
        format,
        visible: true
      }
    });
    const portal = await getPortal(wrapper);
    const timepickerPanels = portal.findAll('.ux-time-picker-panel-select');
    expect(timepickerPanels.length).toBe(2);
    expect(timepickerPanels.at(0).find('.ux-time-picker-panel-select-option-selected').text()).toBe('02');
    const oldOpenValue = wrapper.vm.$data.innerOpenValue;
    await triggerEvent(timepickerPanels.at(0).find('li'), 'click');
    expect(wrapper.vm.$data.innerValue).toBe(wrapper.vm.$data.innerOpenValue);
    expect(oldOpenValue - wrapper.vm.$data.innerOpenValue).toBe(2 * 60 * 60 * 1000);
  });

  it('method and event correctly', async () => {
    const value = new Date(2018, 7, 20, 0, 45, 25);
    const wrapper = await mountTimepicker({
      propsData: {
        value,
        autofocus: true
      }
    });
    wrapper.vm.blur();
    await triggerEvent(wrapper.find('input'), 'keydown.down');
    expect(wrapper.vm.$data.innerVisible).toBe(true);
    expect(wrapper.emitted('popup-visible-change')).toBeTruthy();
    const portal = await getPortal(wrapper);
    const timepickerPanels = portal.findAll('.ux-time-picker-panel-select');
    const hourCol = timepickerPanels.at(0);
    const minuteCol = timepickerPanels.at(1);
    const secondCol = timepickerPanels.at(2);
    await triggerEvent(hourCol.findAll('li').at(1), 'mouseenter');
    await triggerEvent(hourCol.findAll('li').at(1), 'click');
    await triggerEvent(minuteCol, 'mouseenter');
    await triggerEvent(minuteCol.findAll('li').at(1), 'click');
    await triggerEvent(minuteCol, 'mouseleave');
    await triggerEvent(secondCol.findAll('li').at(1), 'click');
    expect(portal.find('.ux-time-picker-panel-input').element.value).toBe('01:01:01');
    expect(wrapper.emitted('change').length).toBe(3);

    // set input value
    portal.find('.ux-time-picker-panel-input').setValue('02:02:02');
    await waitTime();
    expect(hourCol.find('.ux-time-picker-panel-select-option-selected').text()).toBe('02');

    // set invaild value 12:00:1
    portal.find('.ux-time-picker-panel-input').setValue('12:00:1');
    await triggerEvent(portal.find('.ux-time-picker-panel-input'), 'blur');
    await waitTime();
    expect(portal.find('.ux-time-picker-panel-input').element.value).toBe('02:02:02');

    // clear value;
    portal.find('.ux-time-picker-panel-input').setValue('');
    await waitTime();
    expect(wrapper.vm.innerValue).toBe(null);

    // set invaild value
    portal.find('.ux-time-picker-panel-input').setValue('00');
    await waitTime();
    expect(portal.find('.ux-time-picker-panel-input-wrap').classes('ux-time-picker-panel-input-wrap-invalid')).toBe(true);

    portal.find('.ux-time-picker-panel-input').setValue('1:61:60');
    await waitTime();
    expect(portal.find('.ux-time-picker-panel-input-wrap').classes('ux-time-picker-panel-input-wrap-invalid')).toBe(true);

    portal.find('.ux-time-picker-panel-input').setValue('01:59:10');
    await waitTime(10);
    // clear value;
    await triggerEvent(portal.find('.ux-time-picker-panel-clear-btn'), 'click');
    await waitTime(100);
    expect(portal.find('.ux-time-picker-panel-input').element.value).toBe('');


    wrapper.setProps({ format: 'HH:MM:SS A' });
    await waitTime();
    portal.find('.ux-time-picker-panel-input').setValue('01:01:01 AM');
    await waitTime(10);
    expect(portal.find('.ux-time-picker-panel-input-wrap').classes('ux-time-picker-panel-input-wrap-invalid')).toBe(true);
  });
});
