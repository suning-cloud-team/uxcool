import { mount, waitTime, createWrapper } from '@suning/v-test-utils';
import dayjs from 'dayjs';
import {
  selectDate, getPortal, triggerEvent, mountPickerFactory
} from './utils';
import DatePicker from '../datepicker.vue';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

const mountDatePicker = mountPickerFactory(DatePicker);

describe('DatePicker', () => {
  it('create', async () => {
    const format = 'YYYY-MM-DD';
    const placeholder = 'create-test';
    const id = 'test-a';
    const wrapper = await mountDatePicker({
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
    const wrapper = await mountDatePicker({
      propsData: {
        format,
        // isOpen: true,
      },
    });
    // wait render
    await waitTime();

    const inputWrapper = wrapper.find('.ux-input');
    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    const prevDate = dayjs()
      .subtract(1, 'day')
      .format(format);
    // const prevDate = formatDate(subDays(new Date(), 1), format);
    await selectDate(portal, prevDate);
    expect(inputWrapper.element.value).toBe(prevDate);

    await triggerEvent(wrapper, 'click');
    const prevMonth = dayjs()
      .subtract(1, 'month')
      .format(format);
    //  formatDate(subMonths(new Date(), 1), format);
    await triggerEvent(portal.find('.ux-calendar-prev-month-btn'), 'click');
    await selectDate(portal, prevMonth);
    expect(inputWrapper.element.value).toBe(prevMonth);
  });

  it('is-open', async () => {
    const wrapper = await mountDatePicker({
      propsData: {
        isOpen: true,
      },
    });

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
    await waitTime();
    const dp = wrapper.find(DatePicker);
    await triggerEvent(dp, 'click');
    const portal = await getPortal(wrapper);

    await triggerEvent(portal.find('.ux-calendar-next-month-btn'), 'click');
    const nextMonth = dayjs()
      .add(1, 'month')
      .format(format);
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

    const nDate = dayjs()
      .subtract(1, 'year')
      .toDate();
    wrapper.setData({
      value: nDate,
    });
    await waitTime();

    const selectedElement = portal.find('.ux-calendar-selected-date');
    expect(selectedElement.exists()).toBeTruthy();
    expect(selectedElement.attributes('title')).toBe(dayjs(nDate).format(format));
  });

  it('disabled', async () => {
    const wrapper = await mountDatePicker({
      propsData: {
        disabled: true,
      },
    });
    await waitTime();
    expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();

    wrapper.setProps({
      disabled: false,
    });
    await waitTime();
    expect(wrapper.find('.ux-input-disabled').exists()).toBeFalsy();
  });

  it('format DD/MM/YYYY', async () => {
    const format = 'DD/MM/YYYY';
    const today = new Date();
    const wrapper = await mountDatePicker({
      propsData: {
        value: today,
        format,
        transitionName: '',
      },
    });

    await waitTime();

    const input = wrapper.find('.ux-input');
    expect(input.element.value).toBe(dayjs(today).format(format));

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);
    const nDate = dayjs()
      .add(2, 'day')
      .format(format);
    await selectDate(portal, nDate);
    expect(input.element.value).toBe(nDate);
  });

  it('show-time', async () => {
    const wrapper = await mountDatePicker({
      propsData: {
        showTime: true,
        transitionName: '',
      },
    });

    await waitTime();
    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    const timePickerBtn = portal.find('.ux-calendar-time-picker-btn');
    expect(timePickerBtn.exists()).toBeTruthy();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

    await triggerEvent(timePickerBtn, 'click');
    expect(portal.find('.ux-calendar-time-picker').exists()).toBeTruthy();

    wrapper.setProps({
      showTime: false,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-time-picker-btn').exists()).toBeFalsy();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeFalsy();
    expect(portal.find('.ux-calendar-time-picker').exists()).toBeFalsy();

    wrapper.setProps({
      showTime: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-time-picker-btn').exists()).toBeTruthy();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();
    expect(portal.find('.ux-calendar-time-picker').exists()).toBeTruthy();
  });

  it('show-ok', async () => {
    const wrapper = await mountDatePicker({
      transitionName: '',
    });

    await waitTime();
    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeFalsy();

    wrapper.setProps({
      showOk: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

    wrapper.setProps({
      showOk: true,
      showTime: false,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

    wrapper.setProps({
      showOk: true,
      showTime: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

    wrapper.setProps({
      showOk: false,
      showTime: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeFalsy();
  });

  it('show-date-input', async () => {
    const format = 'YYYY/MM/DD';
    const wrapper = await mountDatePicker({
      propsData: {
        format,
        transitionName: '',
      },
    });

    await waitTime();

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    const dateInputWrap = portal.find('.ux-calendar-input-wrap');
    expect(dateInputWrap.exists()).toBeTruthy();

    wrapper.setProps({
      value: dayjs('2019-10-01').toDate(),
      showOk: true,
    });
    await waitTime();
    const date = dayjs('2019-10-20').format(format);
    await selectDate(portal, date);

    expect(dateInputWrap.find('.ux-calendar-input').element.value).toBe(date);

    wrapper.setProps({
      showDateInput: false,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-input-wrap').exists()).toBeFalsy();
  });

  it('show-today', async () => {
    const format = 'YYYY-MM-DD';
    const wrapper = await mountDatePicker({
      propsData: {
        showToday: false,
        format,
        transitionName: '',
      },
    });

    await waitTime();

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    expect(portal.find('.ux-calendar-today-btn').exists()).toBeFalsy();

    wrapper.setProps({
      showToday: true,
    });

    await waitTime();
    const todayBtn = portal.find('.ux-calendar-today-btn');
    expect(todayBtn.exists()).toBeTruthy();

    await triggerEvent(todayBtn, 'click');
    expect(wrapper.find('.ux-input').element.value).toBe(dayjs().format(format));
  });

  it('allow-clear', async () => {
    const now = new Date();
    const format = 'YYYY-MM-DD';
    const wrapper = await mountDatePicker({
      propsData: {
        value: now,
        format,
        transitionName: '',
      },
    });

    await waitTime();
    const input = wrapper.find('.ux-input');

    expect(input.element.value).toBe(dayjs(now).format(format));
    const pickerClear = wrapper.find('.ux-calendar-picker-clear');
    expect(pickerClear.exists()).toBeTruthy();
    await triggerEvent(pickerClear, 'click');

    expect(input.element.value).toBe('');

    wrapper.setProps({
      allowClear: false,
    });
    await waitTime();
    expect(wrapper.find('.ux-calendar-picker-clear').exists()).toBeFalsy();
  });

  it('placeholder', async () => {
    const wrapper = await mountDatePicker({
      propsData: {
        transitionName: '',
      },
    });

    await waitTime();

    const input = wrapper.find('.ux-input');
    expect(input.attributes('placeholder')).toBe(localeCN.lang.placeholder);

    const placeholder = 'this is test placeholder';
    wrapper.setProps({
      placeholder,
    });
    await waitTime();
    expect(input.attributes('placeholder')).toBe(placeholder);
  });

  it('placement', async () => {
    const wrapper = await mountDatePicker({
      propsData: {
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    expect(portal.find('.ux-calendar-picker-container-placement-bottomLeft').exists()).toBeTruthy();

    wrapper.setProps({
      placement: 'topRight',
    });
    await waitTime();
    expect(portal.find('.ux-calendar-picker-container-placement-topRight').exists()).toBeTruthy();
  });

  it('getPopupContainer', async () => {
    const Test = {
      methods: {
        getPopupContainer() {
          return this.$refs.wrapRef;
        },
      },
      render() {
        const { getPopupContainer } = this;
        return (
          <div ref="wrapRef">
            <DatePicker getPopupContainer={getPopupContainer}></DatePicker>
          </div>
        );
      },
    };
    const wrapper = mount(Test);

    await waitTime();
    await triggerEvent(wrapper.find(DatePicker), 'click');
    expect(
      wrapper
        .find({ ref: 'wrapRef' })
        .find('.ux-calendar-picker-container')
        .exists()
    ).toBeTruthy();
  });

  it('size', async () => {
    const wrapper = await mountDatePicker(DatePicker);

    expect(wrapper.find('.ux-input-*').exists()).toBeFalsy();
    wrapper.setProps({
      size: 'small',
    });
    await waitTime();
    expect(wrapper.find('.ux-input-sm').exists()).toBeTruthy();

    wrapper.setProps({
      size: 'large',
    });
    await waitTime();
    expect(wrapper.find('.ux-input-lg').exists()).toBeTruthy();
  });

  it('ok-confirm', async () => {
    const format = 'YYYY-MM-DD';
    const date = dayjs('2019-11-22');
    const wrapper = await mountDatePicker({
      propsData: {
        value: date.toDate(),
        showOk: true,
        format,
        transitionName: '',
      },
      attachedToDocument: true,
    });

    // body click and ok-confirm is false
    await triggerEvent(wrapper, 'click');

    const input = wrapper.find('.ux-input');
    expect(input.element.value).toBe(date.format(format));
    const portal = await getPortal(wrapper);
    const nFormatDate = date.add(3, 'day').format(format);
    await selectDate(portal, nFormatDate);

    const body = createWrapper(wrapper.element.ownerDocument.body);

    await triggerEvent(body, 'mousedown');
    // 2019-11-24
    expect(input.element.value).toBe(nFormatDate);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

    // body click and ok-confirm is true
    await triggerEvent(wrapper, 'click');
    wrapper.setProps({
      okConfirm: true,
    });
    await waitTime();
    const nnFormatDate = date.subtract(3, 'day').format(format);

    await selectDate(portal, nnFormatDate);

    await triggerEvent(body, 'mousedown');
    // 2019-11-24
    expect(input.element.value).toBe(nFormatDate);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

    // ok click and ok-confirm is true
    await triggerEvent(wrapper, 'click');
    await selectDate(portal, nnFormatDate);
    await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
    // 2019-11-19
    expect(input.element.value).toBe(nnFormatDate);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();
    wrapper.destroy();
  });

  it('locale', async () => {
    const Test = {
      data() {
        return {
          value: dayjs('2019-10-22').toDate(),
          locale: localeEN,
          isOpen: true,
        };
      },
      methods: {
        getPopupContainer() {
          return this.$refs.wrapRef;
        },
      },
      render() {
        const {
          value, locale, isOpen, getPopupContainer
        } = this;
        const props = {
          value,
          isOpen,
          locale,
          getPopupContainer,
        };
        return (
          <div ref="wrapRef">
            <DatePicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = await mount(Test);

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('event', () => {
    const format = 'YYYY-MM-DD';
    it('change event', async () => {
      const onChange = jest.fn();

      const date = dayjs('2019-10-21');
      const wrapper = await mountDatePicker({
        propsData: {
          value: date.toDate(),
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const nextDate = date.add(5, 'day').format(format);
      await selectDate(portal, nextDate);

      expect(onChange).toHaveBeenCalled();

      expect(dayjs(onChange.mock.calls[0][0]).format(format)).toBe(nextDate);
      expect(onChange.mock.calls[0][1]).toBe(nextDate);
    });
    it('open-panel', async () => {
      const onVisible = jest.fn();

      const wrapper = await mountDatePicker({
        listeners: {
          'open-change': onVisible,
        },
        attachedToDocument: true,
      });
      await triggerEvent(wrapper, 'click');

      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(true);

      onVisible.mockReset();
      const portal = await getPortal(wrapper);
      await selectDate(portal, new Date());

      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(false);

      // ok button
      onVisible.mockReset();
      await triggerEvent(wrapper, 'click');

      wrapper.setProps({
        showOk: true,
      });

      await waitTime();

      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(false);

      onVisible.mockReset();
      await triggerEvent(wrapper, 'click');

      // document body click
      await triggerEvent(createWrapper(wrapper.element.ownerDocument.body), 'mousedown');
      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(false);

      wrapper.destroy();
    });

    it('ok', async () => {
      const onOk = jest.fn();
      const wrapper = await mountDatePicker({
        propsData: {
          value: dayjs('2019-11-01').toDate(),
          showOk: true,
        },
        listeners: {
          ok: onOk,
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const date = dayjs('2019-11-03')
        .add(5, 'day')
        .format(format);
      await selectDate(portal, date);
      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');

      expect(onOk).toHaveBeenCalled();
      expect(dayjs(onOk.mock.calls[0][0]).format(format)).toBe(date);
    });
  });
});
