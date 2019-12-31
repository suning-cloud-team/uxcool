import { mount, waitTime } from '@suning/v-test-utils';
import dayjs from 'dayjs';
import { selectDate, getPortal, triggerEvent } from './utils';
import DatePicker from '../datepicker.vue';

describe('DatePicker', () => {
  it('create', () => {
    const format = 'YYYY-MM-DD';
    const placeholder = 'create-test';
    const id = 'test-a';
    const wrapper = mount(DatePicker, {
      propsData: {
        format,
        placeholder,
      },
      attrs: {
        id,
      },
    });

    const input = wrapper.find('input');

    expect(input.attributes('placeholder')).toBe(placeholder);
    expect(wrapper.element.id).toBe(id);
    // const selectedDate = formatDate(subDays(new Date(), 1), format);
    // const input = wrapper.find('input');
    // input.trigger('click');

    // await waitTime(20);
    // const triggerWrapper = wrapper.find(Trigger);
    // const portalWrapper = createWrapper(triggerWrapper.vm.portal.$el);
    // console.log('portalWrapper, %o', portalWrapper);
    // const a = portalWrapper.find(`[role="gridcell"][title="${selectedDate}"]`);
    // console.log('a%o', a);
    // portalWrapper.find(`[role="gridcell"][title="${selectedDate}"]`).trigger('click');

    // expect(wrapper.find('input').text()).toBe(selectedDate);
  });

  it('select date', async () => {
    const format = 'YYYY-MM-DD';
    const wrapper = mount(DatePicker, {
      propsData: {
        format,
        // isOpen: true,
      },
    });
    // wait render
    await waitTime(20);

    const inputWrapper = wrapper.find('.ux-input');
    await triggerEvent(wrapper, 'click');
    const portalWrapper = await getPortal(wrapper);

    const prevDate = dayjs()
      .subtract(1, 'date')
      .format(format);
    // const prevDate = formatDate(subDays(new Date(), 1), format);
    await selectDate(portalWrapper, prevDate);
    expect(inputWrapper.element.value).toBe(prevDate);

    const prevMonth = dayjs()
      .subtract(1, 'month')
      .format(format);
    //  formatDate(subMonths(new Date(), 1), format);
    await selectDate(portalWrapper, prevMonth);
    expect(inputWrapper.element.value).toBe(prevMonth);
  });

  it('is-open', async () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        isOpen: true,
      },
    });
    await waitTime(20);

    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();

    wrapper.setProps({
      isOpen: false,
    });
    // animate delay
    await waitTime(300);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

    wrapper.setProps({
      isOpen: true,
    });
    // animate delay
    await waitTime(300);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
  });

  it('value(v-model) no transitionName', async () => {
    const format = 'YYYY-MM-DD';
    const Test = {
      data() {
        return {
          value: null,
        };
      },
      methods: {
        onInput(value) {
          this.value = value;
        },
      },
      render() {
        const { value, onInput } = this;
        return <DatePicker value={value} transitionName="" on-input={onInput} />;
      },
    };

    const wrapper = mount(Test);
    const input = wrapper.find('.ux-input');
    await waitTime(20);
    const dp = wrapper.find(DatePicker);
    await triggerEvent(dp, 'click');
    const portal = await getPortal(wrapper);

    await triggerEvent(portal.find('.ux-calendar-next-month-btn'), 'click');
    const nextMonth = dayjs()
      .add(1, 'month')
      .format('format');
    // const nextMonth = formatDate(addMonths(new Date(), 1), format);
    await selectDate(portal, nextMonth);
    expect(dayjs(wrapper.vm.value).format(format)).toBe(nextMonth);
    expect(input.element.value).toBe(nextMonth);

    await triggerEvent(dp, 'click');
    const prevMonthBtn = portal.find('.ux-calendar-prev-month-btn');
    await triggerEvent(prevMonthBtn, 'click');
    await triggerEvent(prevMonthBtn, 'click');
    const prevMonth = dayjs()
      .subtract(1, 'month')
      .format(format);
    // formatDate(subMonths(new Date(), 1), format);
    // const prevMonth = formatDate(subMonths(new Date(), 1), format);
    await selectDate(portal, prevMonth);
    expect(dayjs(wrapper.vm.value).format(format)).toBe(prevMonth);
    expect(input.element.value).toBe(prevMonth);

    await triggerEvent(dp, 'click');

    const nDate = dayjs().subtract(1, 'year');
    wrapper.setData({
      value: nDate,
    });
    await waitTime(20);

    const selectedElement = portal.find('.ux-calendar-selected-date');
    expect(selectedElement.exists()).toBeTruthy();

    expect(selectedElement.attributes('title')).toBe(dayjs(nDate).format(format));
  });

  it('disabled', async () => {
    const wrapper = mount(DatePicker, {
      propsData: {
        disabled: true,
      },
    });
    await waitTime(20);
    expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();

    wrapper.setProps({
      disabled: false,
    });
    await waitTime(20);
    expect(wrapper.find('.ux-input-disabled').exists()).toBeFalsy();
  });

  it('format DD/MM/YYYY', async () => {
    const format = 'DD/MM/YYYY';
    const today = new Date();
    const wrapper = mount(DatePicker, {
      propsData: {
        value: today,
        format,
        transitionName: '',
      },
    });

    await waitTime(20);

    const input = wrapper.find('.ux-input');
    expect(input.element.value).toBe(dayjs(today).format(format));

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);
    const nDate = dayjs()
      .add(2, 'date')
      .format(format);
    // formatDate(addDays(new Date(), 2), format);
    await selectDate(portal, nDate);
    expect(input.element.value).toBe(nDate);
  });

  it.only('show-time', async () => {
    jest.setTimeout(50000);
    const wrapper = mount(DatePicker, {
      propsData: {
        showTime: true,
        transitionName: '',
      },
    });

    await waitTime(20);

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    const timePickerBtn = portal.find('.ux-calendar-time-picker-btn');
    const okBtn = portal.find('.ux-calendar-ok-btn');
    expect(timePickerBtn.exists()).toBeTruthy();
    expect(okBtn.exists()).toBeTruthy();

    await triggerEvent(timePickerBtn, 'click');
    const timerPicker = portal.find('.ux-calendar-time-picker');
    expect(timerPicker.exists()).toBeTruthy();

    wrapper.setProps({
      showTime: false,
    });
    await waitTime(20);

    expect(timePickerBtn.exists()).toBeFalsy();
    expect(okBtn.exists()).toBeFalsy();
    expect(timerPicker.exists()).toBeFalsy();
  });
});
