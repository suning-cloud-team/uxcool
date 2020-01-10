import Vue from 'vue';
import { mount, waitTime } from '@suning/v-test-utils';
import dayjs from 'dayjs';
import {
  selectDate, getPortal, triggerEvent, mountPickerFactory
} from './utils';
import RangeDatePicker from '../rangeDatePicker.vue';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

const mountPicker = mountPickerFactory(RangeDatePicker);
describe('rangeDatePicker', () => {
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

  describe.skip('locale', () => {
    const mockDate = dayjs('2019-11-03');
    const values = [mockDate.toDate(), mockDate.add(2, 'month').toDate()];
    it('should work when use localeEN.lang', async () => {
      const wrapper = await mountPicker({
        propsData: {
          locale: localeEN.lang,
          selectedValue: values,
        },
      });

      await triggerEvent(wrapper, 'click');
      expect(`${wrapper.html()}${wrapper.element.ownerDocument.body.innerHTML}`).toMatchSnapshot();
    });

    it('should work when use localeEN', async () => {
      const wrapper = await mountPicker({
        propsData: {
          locale: localeEN,
          selectedValue: values,
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('open-value', () => {
    const format = 'YYYY-MM-DD';
    const currentMonthSelector = '.ux-calendar-cell:not(.ux-calendar-last-month-cell)';
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
  });

  describe('selected-value', () => {
    const format = 'YYYY-MM-DD';
    it('should work', async () => {
      const mockDate = dayjs('2019-11-03');
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(1, 'day').toDate()],
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
      const mockDate = dayjs('2019-11-03');

      Vue.config.warnHandler = (msg) => {
        expect(msg).toMatch(/Invalid prop: custom validator check failed for prop "selectedValue"/);
      };

      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [null, mockDate.toDate()],
        },
      });
      await triggerEvent(wrapper, 'click');

      Vue.config.warnHandler = null;
    });
    it('should throw error when end date is null', async () => {
      const mockDate = dayjs('2019-11-03');

      Vue.config.warnHandler = (msg) => {
        expect(msg).toMatch(/Invalid prop: custom validator check failed for prop "selectedValue"/);
      };
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), null],
        },
      });
      await triggerEvent(wrapper, 'click');
    });
  });

  describe('show-time', () => {
    // TODO:
  });
  describe('disabled-date', () => {
    // TODO:
  });
  describe('disabled-time', () => {
    // TODO:
  });
  describe('ranges', () => {
    // TODO:
  });
  describe('events', () => {
    // TODO:
  });
});
