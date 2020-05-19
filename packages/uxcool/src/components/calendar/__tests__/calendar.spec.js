import {
  mount, waitTime, removePopup, $
} from '@cloud-sn/v-test-utils';
import {
  addYears, isSameDay, format, addDays
} from 'date-fns';
import UxCalendar from '../index';

describe('calendar header', () => {
  it('render correctly', async () => {
    const wrapper = mount(UxCalendar);
    expect(wrapper.findAll('.ux-select').length).toBe(2);
    expect(wrapper.findAll('.ux-radio-button').length).toBe(2);
  });
});

describe('full calendar', () => {
  it('render range correctly', async () => {
    // 检查是否按预设范围渲染年月
    const now = new Date('2019/08/15');
    const after2Y = addYears(now, 2);
    const wrapper = mount(UxCalendar, {
      propsData: {
        validRange: [now, after2Y],
      },
      attachToDocument: true,
      sync: false,
    });
    const yearSelector = wrapper.find('.ux-fullcalendar-year-select');
    yearSelector.trigger('focus');
    await waitTime(10);
    yearSelector.trigger('click');
    await waitTime(100);
    expect($('li[title$="年"]').length).toBe(3);
    $(`li[title="${now.getFullYear()}年"]`).trigger('click');
    const monthSelector = wrapper.find('.ux-fullcalendar-month-select');
    monthSelector.trigger('focus');
    await waitTime(10);
    monthSelector.trigger('click');
    await waitTime(100);
    expect($('li[title$="月"]').length).toBe(5);
    expect($('td[title="2019年08月14日"]:first').hasClass('ux-fullcalendar-disabled-cell')).toBeTruthy();
    expect($('td[title="2019年08月15日"]:first').hasClass('ux-fullcalendar-disabled-cell')).not.toBeTruthy();
    yearSelector.trigger('focus');
    await waitTime(10);
    yearSelector.trigger('click');
    await waitTime(100);
    $('li[title="2021年"]').trigger('click');
    await waitTime(100);
    monthSelector.trigger('focus');
    await waitTime(10);
    monthSelector.trigger('click');
    await waitTime(100);
    expect($('li[title$="月"]').length).toBe(8);
    $('li[title="8月"]').trigger('click');
    expect($('td[title="2021年08月16日"]:first').hasClass('ux-fullcalendar-disabled-cell')).toBeTruthy();
    expect($('td[title="2021年08月15日"]:first').hasClass('ux-fullcalendar-disabled-cell')).not.toBeTruthy();
    wrapper.destroy();
    removePopup();
  });

  it('render different mode correctly', async () => {
    const wrapper = mount(UxCalendar);
    expect(wrapper.findAll('td').length).toBe(42);
    expect(wrapper
      .findAll('td')
      .at(0)
      .element.getAttribute('title')).toMatch(/^\d{4}年\d{2}月\d{2}日$/);
    wrapper.setProps({ mode: 'year' });
    await waitTime(20);
    expect(wrapper.findAll('td').length).toBe(12);
    expect(wrapper
      .findAll('td')
      .at(0)
      .element.getAttribute('title')).toMatch(/^\d{1,2}月$/);
  });

  it('render disabled date correctly', () => {
    const now = new Date();
    const wrapper = mount(UxCalendar, {
      propsData: {
        disabledDate: (current) => isSameDay(current, now),
      },
    });
    expect(wrapper.find(`[title="${format(now, 'YYYY年MM月DD日')}"]`).classes()).toContain('ux-fullcalendar-disabled-cell');
  });

  it('event be called correctly', () => {
    const changeFn = jest.fn();
    const selectFn = jest.fn();
    const panelChangeFn = jest.fn();
    const now = new Date();
    const wrapper = mount(UxCalendar, {
      listeners: {
        change: changeFn,
        select: selectFn,
        'panel-change': panelChangeFn,
      },
    });
    const availableDate = wrapper.contains(`[title="${format(addDays(now, 1), 'YYYY年MM月DD日')}"]`)
      ? wrapper.find(`[title="${format(addDays(now, 1), 'YYYY年MM月DD日')}"]`)
      : wrapper.find(`[title="${format(addDays(now, -1), 'YYYY年MM月DD日')}"]`);
    availableDate.trigger('click');
    expect(changeFn).toHaveBeenCalledTimes(2);
    expect(selectFn).toHaveBeenCalledTimes(1);
    wrapper
      .findAll('.ux-radio-button-wrapper')
      .at(1)
      .trigger('click');
    expect(panelChangeFn).toHaveBeenCalledTimes(1);
  });
});
