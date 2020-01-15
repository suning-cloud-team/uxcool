import Vue from 'vue';
import {
  mount,
  waitTime,
  getPortal,
  triggerEvent,
  createWrapper,
  mountPickerFactory,
} from '@suning/v-test-utils';
import dayjs from 'dayjs';
import { selectDate } from './utils';
import RangeDatePicker from '../rangeDatePicker.vue';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

describe('rangeDatePicker', () => {
  const mountPicker = mountPickerFactory(RangeDatePicker);
  const currentMonthSelector = '.ux-calendar-cell:not(.ux-calendar-last-month-cell)';
  it('created', async () => {
    const wrapper = await mountPicker();
    expect(wrapper.find('.ux-calendar-picker').exists()).toBeTruthy();
    expect(wrapper.findAll('.ux-calendar-range-picker-input').length).toBe(2);

    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
  });

  it('is-open', async () => {
    const wrapper = await mountPicker({
      propsData: {
        isOpen: true,
        transitionName: '',
      },
    });

    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();

    wrapper.setProps({
      isOpen: false,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

    wrapper.setProps({
      isOpen: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
  });

  it('disalbed', async () => {
    const wrapper = await mountPicker({
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();

    const disabledInputs = wrapper.findAll('input');

    expect(disabledInputs.at(0).attributes('disabled')).toBe('disabled');
    expect(disabledInputs.at(1).attributes('disabled')).toBe('disabled');
  });

  it('format', async () => {
    const format = 'DD/MM/YYYY';
    const date = dayjs('2019-11-04');
    const wrapper = await mountPicker({
      propsData: {
        selectedValue: [date.toDate(), date.add(2, 'month').toDate()],
        format,
        transitionName: '',
        showOk: true,
      },
    });

    const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

    expect(pickerInputs.at(0).element.value).toBe(date.format(format));
    expect(pickerInputs.at(1).element.value).toBe(date.add(2, 'month').format(format));

    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    const nDate = date.add(2, 'month').add(4, 'day');
    await selectDate(portal, nDate, format);
    await selectDate(portal, nDate, format);

    const startDate = nDate.format(format);
    const endDate = nDate.format(format);
    expect(pickerInputs.at(0).element.value).toBe(startDate);
    expect(pickerInputs.at(1).element.value).toBe(endDate);

    const calendarInputs = portal.findAll('.ux-calendar-input');
    expect(calendarInputs.at(0).element.value).toBe(startDate);
    expect(calendarInputs.at(1).element.value).toBe(endDate);
  });

  it('show-ok', async () => {
    const wrapper = await mountPicker({
      propsData: {
        transitionName: '',
      },
    });

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

    wrapper.setProps({
      showOk: undefined,
      showTime: true,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

    wrapper.setProps({
      showOk: undefined,
      showTime: false,
    });
    await waitTime();
    expect(portal.find('.ux-calendar-ok-btn').exists()).toBeFalsy();
  });

  it('placeholder', async () => {
    const { rangePlaceholder } = localeCN.lang;
    const wrapper = await mountPicker({
      propsData: {
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);
    const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');
    expect(pickerInputs.at(0).attributes('placeholder')).toBe(rangePlaceholder[0]);
    expect(pickerInputs.at(1).attributes('placeholder')).toBe(rangePlaceholder[1]);

    const calendarInputs = portal.findAll('.ux-calendar-input');
    expect(calendarInputs.at(0).attributes('placeholder')).toBe(rangePlaceholder[0]);
    expect(calendarInputs.at(1).attributes('placeholder')).toBe(rangePlaceholder[1]);

    let placeholder = 'this is test placeholder';
    wrapper.setProps({
      placeholder,
    });

    await waitTime();

    expect(pickerInputs.at(0).attributes('placeholder')).toBe(placeholder);
    expect(pickerInputs.at(1).attributes('placeholder')).toBe(placeholder);
    expect(calendarInputs.at(0).attributes('placeholder')).toBe(placeholder);
    expect(calendarInputs.at(1).attributes('placeholder')).toBe(placeholder);

    placeholder = ['this is array placeholder'];
    wrapper.setProps({
      placeholder,
    });

    await waitTime();

    expect(pickerInputs.at(0).attributes('placeholder')).toBe(placeholder[0]);
    expect(pickerInputs.at(1).attributes('placeholder')).toBe(placeholder[0]);
    expect(calendarInputs.at(0).attributes('placeholder')).toBe(placeholder[0]);
    expect(calendarInputs.at(1).attributes('placeholder')).toBe(placeholder[0]);

    placeholder = ['this is start placeholder', 'this is end placeholder'];

    wrapper.setProps({
      placeholder,
    });
    await waitTime();
    expect(pickerInputs.at(0).attributes('placeholder')).toBe(placeholder[0]);
    expect(pickerInputs.at(1).attributes('placeholder')).toBe(placeholder[1]);
    expect(calendarInputs.at(0).attributes('placeholder')).toBe(placeholder[0]);
    expect(calendarInputs.at(1).attributes('placeholder')).toBe(placeholder[1]);
  });

  it('show-today', async () => {
    const wrapper = await mountPicker({
      propsData: {
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    expect(portal.find('.ux-calendar-today-btn').exists()).toBeFalsy();

    wrapper.setProps({
      showToday: true,
    });

    await waitTime();
    expect(portal.find('.ux-calendar-today-btn').exists()).toBeTruthy();
  });

  it('allow-clear', async () => {
    const format = 'YYYY-MM-DD';
    const mockDate = dayjs('2019-11-03');
    const wrapper = await mountPicker({
      propsData: {
        allowClear: true,
        format,
        transitionName: '',
        showOk: true,
      },
    });

    expect(wrapper.find('.ux-calendar-picker-clear').exists()).toBeFalsy();

    wrapper.setProps({
      selectedValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
    });

    await waitTime();

    expect(wrapper.find('.ux-calendar-picker-clear').exists()).toBeTruthy();

    // clear
    await triggerEvent(wrapper.find('.ux-calendar-picker-clear'), 'click');

    const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');
    expect(pickerInputs.at(0).element.value).toBe('');
    expect(pickerInputs.at(1).element.value).toBe('');
    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-calendar-selected-day').exists()).toBeFalsy();

    // select and clear
    const nMockDate = dayjs();
    await selectDate(portal, nMockDate);
    await selectDate(portal, nMockDate.add(5, 'day'));
    expect(portal.find('.ux-calendar-selected-day').exists()).toBeTruthy();
    await triggerEvent(wrapper.find('.ux-calendar-picker-clear'), 'click');
    expect(portal.find('.ux-calendar-selected-day').exists()).toBeFalsy();
  });

  it('placement', async () => {
    const wrapper = await mountPicker({
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

  it('get-popup-container', async () => {
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
            <RangeDatePicker getPopupContainer={getPopupContainer} />
          </div>
        );
      },
    };

    const wrapper = mount(Test);

    await waitTime();
    await triggerEvent(wrapper.find(RangeDatePicker), 'click');
    expect(
      wrapper
        .find({ ref: 'wrapRef' })
        .find('.ux-calendar-picker-container')
        .exists()
    ).toBeTruthy();
  });

  it('ok-confirm', async () => {
    const mockDate = dayjs('2019-05-03');
    const format = 'YYYY-MM-DD';
    const wrapper = await mountPicker({
      propsData: {
        openValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
        showOk: true,
        format,
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    let leftPart = portal.find('.ux-calendar-range-left');

    await selectDate(leftPart, mockDate.add(3, 'day'));
    await selectDate(leftPart, mockDate.add(5, 'day'));

    const body = createWrapper(wrapper.element.ownerDocument.body);

    await triggerEvent(body, 'mousedown');

    const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

    expect(pickerInputs.at(0).element.value).toBe(mockDate.add(3, 'day').format(format));
    expect(pickerInputs.at(1).element.value).toBe(mockDate.add(5, 'day').format(format));

    // ok-confirm = true
    wrapper.setProps({
      okConfirm: true,
    });
    await waitTime();
    await triggerEvent(wrapper, 'click');
    // 不能共用上面的leftPart,需重新查找
    // 共用时内部vm上绑定的事件会在调用`triggerEvent(wrapper, 'click')`时丢失,
    leftPart = portal.find('.ux-calendar-range-left');
    await selectDate(leftPart, mockDate.add(7, 'day'));
    await selectDate(leftPart, mockDate.add(9, 'day'));
    await triggerEvent(body, 'mousedown');
    expect(pickerInputs.at(0).element.value).toBe(mockDate.add(3, 'day').format(format));
    expect(pickerInputs.at(1).element.value).toBe(mockDate.add(5, 'day').format(format));

    // open portal
    await triggerEvent(wrapper, 'click');
    leftPart = portal.find('.ux-calendar-range-left');
    await selectDate(leftPart, mockDate.add(9, 'day'));
    await selectDate(leftPart, mockDate.add(10, 'day'));
    await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
    expect(pickerInputs.at(0).element.value).toBe(mockDate.add(9, 'day').format(format));
    expect(pickerInputs.at(1).element.value).toBe(mockDate.add(10, 'day').format(format));
  });

  describe('locale', () => {
    const mockDate = dayjs('2019-05-03');
    const values = [mockDate.toDate(), mockDate.add(2, 'month').toDate()];
    it('should work when use localeEN.lang', async () => {
      const wrapper = await mountPicker({
        propsData: {
          locale: localeEN.lang,
          selectedValue: values,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });

    it('should work when use localeEN', async () => {
      const wrapper = await mountPicker({
        propsData: {
          locale: localeEN,
          selectedValue: values,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });
  });

  describe('open-value', () => {
    const format = 'YYYY-MM-DD';
    it('normal', async () => {
      const wrapper = await mountPicker({
        propsData: {
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');
      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .startOf('month')
          .format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );

      const mockStartDate = dayjs('2019-05-07');
      const mockEndDate = dayjs('2019-07-07');
      wrapper.setProps({
        openValue: [mockStartDate.toDate(), mockEndDate.toDate()],
      });

      await waitTime();

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        mockStartDate.startOf('month').format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        mockEndDate.startOf('month').format(format)
      );
    });

    it('should use selected-value after selected-value update', async () => {
      const mockStartDate = dayjs('2019-05-08');
      const mockEndDate = dayjs('2019-08-08');
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        mockStartDate.startOf('month').format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        mockEndDate.startOf('month').format(format)
      );

      wrapper.setProps({
        selectedValue: [
          dayjs().toDate(),
          dayjs()
            .add(2, 'day')
            .toDate(),
        ],
      });
      await waitTime();
      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .startOf('month')
          .format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );
    });
    it('should use open-value after selected-value clear ', async () => {
      const mockStartDate = dayjs('2019-05-08');
      const mockEndDate = dayjs('2019-08-08');
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          selectedValue: [
            dayjs().toDate(),
            dayjs()
              .add(2, 'month')
              .toDate(),
          ],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .startOf('month')
          .format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .add(2, 'month')
          .startOf('month')
          .format(format)
      );

      // clear
      await triggerEvent(wrapper.find('.ux-calendar-picker-clear'), 'click');
      await triggerEvent(wrapper, 'click');

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        mockStartDate.startOf('month').format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        mockEndDate.startOf('month').format(format)
      );
    });
    it('should use current date after open-value clear', async () => {
      const mockStartDate = dayjs('2019-05-08');
      const mockEndDate = dayjs('2019-08-08');
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          format,
          transitionName: '',
        },
      });

      wrapper.setProps({
        openValue: [],
      });
      await waitTime();

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .startOf('month')
          .format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        dayjs()
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );
    });
    it('should use selected value after select date', async () => {
      const mockStartDate = dayjs('2019-05-08');
      const mockEndDate = dayjs('2019-08-08');
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');
      await triggerEvent(leftPart.find('.ux-calendar-prev-year-btn'), 'click');
      await triggerEvent(rightPart.find('.ux-calendar-next-year-btn'), 'click');

      const startDate = leftPart.find(currentMonthSelector).attributes('title');
      const endDate = rightPart.find(currentMonthSelector).attributes('title');

      await selectDate(portal, dayjs(startDate).add(3, 'day'));
      await selectDate(portal, dayjs(endDate).add(3, 'day'));

      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(startDate);
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(endDate);
    });

    it('should use next month when month is equal', async () => {
      const mockDate = dayjs('2019-05-01');

      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockDate.toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');
      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        mockDate.startOf('month').format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        mockDate
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );
    });
  });

  describe('selected-value', () => {
    const format = 'YYYY-MM-DD';
    const mockDate = dayjs('2019-11-03');
    it('should work', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(1, 'day').toDate()],
          transitionName: '',
        },
      });

      const startDate = mockDate.format(format);
      const endDate = mockDate.add(1, 'day').format(format);
      await triggerEvent(wrapper, 'click');
      const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(pickerInputs.at(0).element.value).toBe(startDate);
      expect(pickerInputs.at(1).element.value).toBe(endDate);
      const portal = await getPortal(wrapper);

      const calendarInputs = portal.findAll('.ux-calendar-input');
      expect(calendarInputs.at(0).element.value).toBe(startDate);
      expect(calendarInputs.at(1).element.value).toBe(endDate);

      const selectedDays = portal.findAll('.ux-calendar-selected-day');
      expect(selectedDays.at(0).attributes('title')).toBe(startDate);
      expect(selectedDays.at(1).attributes('title')).toBe(endDate);
    });
    it('should throw error when start date is null', async () => {
      Vue.config.warnHandler = (msg) => {
        expect(msg).toMatch(/Invalid prop: custom validator check failed for prop "selectedValue"/);
      };

      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [null, mockDate.toDate()],
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');

      Vue.config.warnHandler = null;
    });
    it('should throw error when end date is null', async () => {
      Vue.config.warnHandler = (msg) => {
        expect(msg).toMatch(/Invalid prop: custom validator check failed for prop "selectedValue"/);
      };
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), null],
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      Vue.config.warnHandler = null;
    });

    it('should use next month when month is equal', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');
      const rightPart = portal.find('.ux-calendar-range-right');
      expect(leftPart.find(currentMonthSelector).attributes('title')).toBe(
        mockDate.startOf('month').format(format)
      );
      expect(rightPart.find(currentMonthSelector).attributes('title')).toBe(
        mockDate
          .add(1, 'month')
          .startOf('month')
          .format(format)
      );
    });
  });

  describe('show-time', () => {
    const mockDate = dayjs('2019-05-03');
    const format = 'YYYY-MM-DD HH:mm:ss';
    it('should display selected time button', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-time-picker-btn').exists()).toBeFalsy();
      expect(portal.find('.ux-calendar-ok-btn').exists()).toBeFalsy();

      wrapper.setProps({
        showTime: true,
        selectedValue: [mockDate.toDate(), mockDate.toDate()],
      });
      await waitTime();
      expect(portal.find('.ux-calendar-time-picker-btn').exists()).toBeTruthy();
      expect(portal.find('.ux-calendar-ok-btn').exists()).toBeTruthy();

      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');

      expect(portal.findAll('.ux-calendar-time-picker').length).toBe(2);
    });

    it('should disabled selected time button', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showTime: true,
          openValue: [mockDate.toDate(), mockDate.add(2, 'month').toDate()],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-time-picker-btn-disabled').exists()).toBeTruthy();
      expect(portal.find('.ux-calendar-ok-btn-disabled').exists()).toBeTruthy();

      const leftPart = portal.find('.ux-calendar-range-left');
      await selectDate(leftPart, mockDate.add(5, 'day'), format);

      expect(portal.find('.ux-calendar-time-picker-btn-disabled').exists()).toBeTruthy();
      expect(portal.find('.ux-calendar-ok-btn-disabled').exists()).toBeTruthy();

      await selectDate(leftPart, mockDate.add(10, 'day'), format);
      expect(portal.find('.ux-calendar-time-picker-btn-disabled').exists()).toBeFalsy();
      expect(portal.find('.ux-calendar-ok-btn-disabled').exists()).toBeFalsy();
    });

    it('should show hour, minute, second', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: {
            showHour: true,
            showMinute: true,
            showSecond: true,
          },
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');

      const leftPart = portal.find('.ux-calendar-range-left');
      const timeLeftSelects = leftPart.findAll('.ux-calendar-time-picker-select');
      expect(timeLeftSelects.length).toBe(3);
      expect(
        timeLeftSelects
          .at(0)
          .find('li:last-child')
          .text()
      ).toBe('23');

      const rightPart = portal.find('.ux-calendar-range-right');
      const timeRightSelects = rightPart.findAll('.ux-calendar-time-picker-select');
      expect(timeRightSelects.length).toBe(3);
      expect(
        timeRightSelects
          .at(0)
          .find('li:last-child')
          .text()
      ).toBe('23');
    });

    it('should only show hour, minute', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: {
            showHour: true,
            showMinute: true,
            showSecond: false,
          },
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');

      const leftPart = portal.find('.ux-calendar-range-left');
      const timeLeftSelects = leftPart.findAll('.ux-calendar-time-picker-select');
      expect(timeLeftSelects.length).toBe(2);
      expect(
        timeLeftSelects
          .at(0)
          .find('li:last-child')
          .text()
      ).toBe('23');
    });
    it('should only show hour, minute', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: {
            showHour: true,
            showMinute: false,
            showSecond: false,
          },
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');

      const leftPart = portal.find('.ux-calendar-range-left');
      const timeLeftSelects = leftPart.findAll('.ux-calendar-time-picker-select');
      expect(timeLeftSelects.length).toBe(1);
      expect(
        timeLeftSelects
          .at(0)
          .find('li:last-child')
          .text()
      ).toBe('23');
    });
  });
  describe('disabled-date', () => {
    const mockDate = dayjs('2019-05-01');
    const values = [mockDate.toDate(), mockDate.add(1, 'month').toDate()];
    it('should disabled 2019-05-03 ~ 2019-06-08', async () => {
      function disabledDate(currentDate) {
        const current = dayjs(currentDate);

        return (
          current.isAfter(mockDate.add(1, 'day'), 'day')
          && current.isBefore(mockDate.add(1, 'month').add(8, 'day'), 'day')
        );
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: values,
          disabledDate,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);
      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });
  });
  describe('disabled-time', () => {
    const mockDate = dayjs('2019-05-03');
    it('should disabled hours [4,8,10]', async () => {
      function disabledHours() {
        return [4, 8, 10];
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: true,
          disabledTime() {
            return {
              disabledHours,
            };
          },
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');
      const timeLeftPart = portal.find('.ux-calendar-range-left').find('.ux-calendar-time-picker');
      const timeRightPart = portal
        .find('.ux-calendar-range-right')
        .find('.ux-calendar-time-picker');
      expect(`${timeLeftPart.html()}${timeRightPart.html()}`).toMatchSnapshot();
    });

    it('should disabled minute [2,7,9,24,59] when hour 14', async () => {
      function disabledMinutes(hour) {
        if (hour === 14) {
          return [2, 7, 9, 24, 59];
        }
        return [];
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: true,
          disabledTime() {
            return {
              disabledMinutes,
            };
          },
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');
      const timeLeftPart = portal.find('.ux-calendar-range-left').find('.ux-calendar-time-picker');
      const timeRightPart = portal
        .find('.ux-calendar-range-right')
        .find('.ux-calendar-time-picker');
      const timeLeftSelects = timeLeftPart.findAll('.ux-calendar-time-picker-select');
      await triggerEvent(timeLeftSelects.at(0).find('li:nth-child(1)'), 'click');
      expect(
        timeLeftSelects.at(1).findAll('.ux-calendar-time-picker-select-option-disabled').length
      ).toBe(0);

      await triggerEvent(timeLeftSelects.at(0).find('li:nth-child(15)'), 'click');

      expect(`${timeLeftPart.html()}${timeRightPart.html()}`).toMatchSnapshot();
    });

    it('should disabled sencod [4, 7,10,22,35,48] when hour 14, minute 15', async () => {
      function disabledSeconds(hour, minute) {
        if (hour === 14 && minute === 15) {
          return [4, 7, 10, 22, 35, 48];
        }
        return [];
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: true,
          disabledTime() {
            return {
              disabledSeconds,
            };
          },
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');
      const timeLeftPart = portal.find('.ux-calendar-range-left').find('.ux-calendar-time-picker');
      const timeRightPart = portal
        .find('.ux-calendar-range-right')
        .find('.ux-calendar-time-picker');
      const timeLeftSelects = timeLeftPart.findAll('.ux-calendar-time-picker-select');
      await triggerEvent(timeLeftSelects.at(0).find('li:nth-child(1)'), 'click');
      expect(
        timeLeftSelects.at(1).findAll('.ux-calendar-time-picker-select-option-disabled').length
      ).toBe(0);
      await triggerEvent(timeLeftSelects.at(1).find('li:nth-child(1)'), 'click');
      expect(
        timeLeftSelects.at(2).findAll('.ux-calendar-time-picker-select-option-disabled').length
      ).toBe(0);

      await triggerEvent(timeLeftSelects.at(0).find('li:nth-child(15)'), 'click');
      await triggerEvent(timeLeftSelects.at(1).find('li:nth-child(16)'), 'click');

      expect(`${timeLeftPart.html()}${timeRightPart.html()}`).toMatchSnapshot();
    });

    it('should disabled start panel minute [30, 44] when hour 18', async () => {
      function disabledMinutes(hour, type) {
        if (type === 'start' && hour === 18) {
          return [30, 44];
        }
        return [];
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: true,
          disabledTime(_, type) {
            return {
              disabledMinutes(hour) {
                return disabledMinutes(hour, type);
              },
            };
          },
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');
      const timeLeftPart = portal.find('.ux-calendar-range-left').find('.ux-calendar-time-picker');
      const timeLeftSelects = timeLeftPart.findAll('.ux-calendar-time-picker-select');
      await triggerEvent(timeLeftSelects.at(0).find('li:nth-child(19)'), 'click');
      expect(`${timeLeftPart.html()}`).toMatchSnapshot();

      const timeRightPart = portal
        .find('.ux-calendar-range-right')
        .find('.ux-calendar-time-picker');
      const timeRightSelects = timeRightPart.findAll('.ux-calendar-time-picker-select');
      await triggerEvent(timeRightSelects.at(0).find('li:nth-child(19)'), 'click');
      expect(`${timeRightPart.html()}`).toMatchSnapshot();
    });

    it('should disabledMinutes have hour param, disabledSeconds have hour and minute param', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showTime: true,
          disabledTime() {
            return {
              disabeldMinutes(hour) {
                expect(hour).not.toBeUndefined();
                return [];
              },
              disabledSeconds(hour, minute) {
                expect(hour).not.toBeUndefined();
                expect(minute).not.toBeUndefined();
                return [];
              },
            };
          },
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-time-picker-btn'), 'click');
    });
  });
  describe('ranges', () => {
    const mockDate = dayjs();
    const format = 'YYYY-MM-DD HH:mm:ss';
    it('static ranges', async () => {
      const wrapper = await mountPicker({
        propsData: {
          ranges: {
            今天: [mockDate.toDate(), mockDate.toDate()],
            当月: [mockDate.startOf('month').toDate(), mockDate.endOf('month').toDate()],
          },
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const quickSelector = portal.find('.ux-calendar-range-quick-selector');
      expect(quickSelector.exists()).toBeTruthy();
      const items = quickSelector.findAll('.ux-calendar-range-quick-selector-item');
      expect(items.length).toBe(2);

      await triggerEvent(items.at(1), 'click');

      const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(pickerInputs.at(0).element.value).toBe(mockDate.startOf('month').format(format));
      expect(pickerInputs.at(1).element.value).toBe(mockDate.endOf('month').format(format));
    });

    it('function ranges ', async () => {
      const range = [mockDate.subtract(2, 'day').toDate(), mockDate.toDate()];
      const wrapper = await mountPicker({
        propsData: {
          ranges: {
            最近两天: () => range,
          },
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.findAll('.ux-calendar-range-quick-selector-item').at(0), 'click');

      const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(pickerInputs.at(0).element.value).toBe(dayjs(range[0]).format(format));
      expect(pickerInputs.at(1).element.value).toBe(dayjs(range[1]).format(format));
    });

    it('array ranges', async () => {
      const range = [mockDate.subtract(2, 'day').toDate(), mockDate.toDate()];
      const wrapper = await mountPicker({
        propsData: {
          ranges: [
            {
              label: '最近两天',
              dates() {
                return range;
              },
            },
          ],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.findAll('.ux-calendar-range-quick-selector-item').at(0), 'click');

      const pickerInputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(pickerInputs.at(0).element.value).toBe(dayjs(range[0]).format(format));
      expect(pickerInputs.at(1).element.value).toBe(dayjs(range[1]).format(format));
    });

    it('should highlight when hover range', async () => {
      const wrapper = await mountPicker({
        propsData: {
          ranges: {
            当月: () => [mockDate.startOf('month').toDate(), mockDate.endOf('month').toDate()],
          },
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const items = portal.findAll('.ux-calendar-range-quick-selector-item');

      await triggerEvent(items.at(0), 'mouseenter');

      expect(portal.findAll('.ux-calendar-selected-day').length).toBe(2);
    });

    it('quick-select', async () => {
      const onQuickSelect = jest.fn();
      const onChange = jest.fn();
      const range = [mockDate.startOf('month').toDate(), mockDate.endOf('month').toDate()];
      const wrapper = await mountPicker({
        propsData: {
          ranges: {
            当月: () => range,
          },
          format,
          transitionName: '',
        },
        listeners: {
          'quick-select': onQuickSelect,
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const items = portal.findAll('.ux-calendar-range-quick-selector-item');

      await triggerEvent(items.at(0), 'click');

      expect(onQuickSelect.mock.calls.length).toBe(1);
      expect(onQuickSelect.mock.calls[0][0]).toEqual(range);
      expect(onChange).toHaveBeenCalled();
    });

    it('should close after selected range', async () => {
      const onVisible = jest.fn();
      const range = [mockDate.startOf('month').toDate(), mockDate.endOf('month').toDate()];
      const wrapper = await mountPicker({
        propsData: {
          ranges: {
            当月: () => range,
          },
          format,
          transitionName: '',
        },
        listeners: {
          'open-change': onVisible,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const items = portal.findAll('.ux-calendar-range-quick-selector-item');

      await triggerEvent(items.at(0), 'click');

      expect(onVisible).toHaveBeenCalledWith(false);
    });
  });
  describe('events', () => {
    const mockDate = dayjs('2019-05-03');
    const format = 'YYYY-MM-DD';

    it('input', async () => {
      const onChange = jest.fn();

      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
          transitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');

      await selectDate(leftPart, mockDate.add(4, 'day'));
      await selectDate(leftPart, mockDate.add(8, 'day'));

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0][0]).toEqual([
        mockDate.add(4, 'day').toDate(),
        mockDate.add(8, 'day').toDate(),
      ]);
    });
    it('change', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
          transitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');

      await selectDate(leftPart, mockDate.add(3, 'day'));
      await selectDate(leftPart, mockDate.add(6, 'day'));

      expect(onChange.mock.calls.length).toBe(1);

      expect(onChange.mock.calls[0][0].length).toBe(2);
      expect(onChange.mock.calls[0][0]).toEqual([
        mockDate.add(3, 'day').toDate(),
        mockDate.add(6, 'day').toDate(),
      ]);
      expect(onChange.mock.calls[0][1].length).toBe(2);
      expect(onChange.mock.calls[0][1][0]).toBe(mockDate.add(3, 'day').format(format));
      expect(onChange.mock.calls[0][1][1]).toBe(mockDate.add(6, 'day').format(format));
    });

    it('panel-change', async () => {
      const onPanelChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
          transitionName: '',
        },
        listeners: {
          'panel-change': onPanelChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');

      await triggerEvent(leftPart.find('.ux-calendar-month-select'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(1);
      expect(onPanelChange.mock.calls[0][1]).toEqual(['month', 'date']);

      await triggerEvent(leftPart.find('.ux-calendar-month-panel-year-select-content'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(2);
      expect(onPanelChange.mock.calls[1][1]).toEqual(['year', 'date']);

      await triggerEvent(leftPart.find('.ux-calendar-year-panel-decade-select-content'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(3);
      expect(onPanelChange.mock.calls[2][1]).toEqual(['decade', 'date']);

      await triggerEvent(leftPart.findAll('.ux-calendar-decade-panel-decade').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(4);
      expect(onPanelChange.mock.calls[3][1]).toEqual(['year', 'date']);

      await triggerEvent(leftPart.findAll('.ux-calendar-year-panel-year').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(5);
      expect(onPanelChange.mock.calls[4][1]).toEqual(['month', 'date']);

      await triggerEvent(leftPart.findAll('.ux-calendar-month-panel-month').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(6);
      expect(onPanelChange.mock.calls[5][1]).toEqual(['date', 'date']);

      const rightPart = portal.find('.ux-calendar-range-right');
      await triggerEvent(rightPart.find('.ux-calendar-year-select'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(7);
      expect(onPanelChange.mock.calls[6][1]).toEqual(['date', 'year']);

      await triggerEvent(rightPart.findAll('.ux-calendar-year-panel-year').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(8);
      expect(onPanelChange.mock.calls[7][1]).toEqual(['date', 'date']);
    });
    it('calendar-change', async () => {
      const onCalendarChange = jest.fn();

      const wrapper = await mountPicker({
        propsData: {
          openValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
          transitionName: '',
        },
        listeners: {
          'calendar-change': onCalendarChange,
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-range-left');

      await selectDate(leftPart, mockDate.add(6, 'day'));

      expect(onCalendarChange.mock.calls.length).toBe(1);
      expect(onCalendarChange.mock.calls[0][0]).toEqual([mockDate.add(6, 'day').toDate()]);
      const rightPart = portal.find('.ux-calendar-range-right');

      await selectDate(rightPart, mockDate.add(1, 'month'));
      expect(onCalendarChange.mock.calls.length).toBe(2);
      expect(onCalendarChange.mock.calls[1][0]).toEqual([
        mockDate.add(6, 'day').toDate(),
        mockDate.add(1, 'month').toDate(),
      ]);
    });
    it('open-change', async () => {
      const onVisible = jest.fn();

      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          transitionName: '',
        },
        listeners: {
          'open-change': onVisible,
        },
      });

      await triggerEvent(wrapper, 'click');
      expect(onVisible.mock.calls.length).toBe(1);
      expect(onVisible.mock.calls[0][0]).toBe(true);

      const portal = await getPortal(wrapper);
      await selectDate(portal, mockDate.add(3, 'day'));
      await selectDate(portal, mockDate.add(5, 'day'));
      expect(onVisible.mock.calls.length).toBe(2);
      expect(onVisible.mock.calls[1][0]).toBe(false);

      wrapper.setProps({
        showOk: true,
      });
      await waitTime();

      await triggerEvent(wrapper, 'click');
      expect(onVisible.mock.calls.length).toBe(3);
      expect(onVisible.mock.calls[2][0]).toBe(true);

      await selectDate(portal, mockDate.add(4, 'day'));
      await selectDate(portal, mockDate.add(7, 'day'));

      expect(onVisible.mock.calls.length).toBe(3);
      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      expect(onVisible.mock.calls.length).toBe(4);
      expect(onVisible.mock.calls[3][0]).toBe(false);

      await triggerEvent(wrapper, 'click');
      expect(onVisible.mock.calls.length).toBe(5);

      const body = createWrapper(wrapper.element.ownerDocument.body);
      await triggerEvent(body, 'mousedown');
      expect(onVisible.mock.calls.length).toBe(6);
      expect(onVisible.mock.calls[5][0]).toBe(false);
    });
    it('ok', async () => {
      const onOk = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          showOk: true,
          transitionName: '',
        },
        listeners: {
          ok: onOk,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      expect(onOk.mock.calls.length).toBe(1);
      expect(onOk.mock.calls[0][0]).toEqual([mockDate.toDate(), mockDate.toDate()]);
    });
  });
});
