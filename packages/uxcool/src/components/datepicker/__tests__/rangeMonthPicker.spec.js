import {
  mount,
  waitTime,
  getPortal,
  triggerEvent,
  mountPickerFactory,
  createWrapper,
} from '@cloud-sn/v-test-utils';
import dayjs from 'dayjs';
import { selectMonth } from './utils';
import RangeMonthPicker from '../rangeMonthPicker';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

describe('RangeMonthPicker', () => {
  const mountPicker = mountPickerFactory(RangeMonthPicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY-MM';
  it('create', async () => {
    const selectedValue = [mockDate.toDate(), mockDate.add(2, 'month').toDate()];
    const wrapper = await mountPicker({
      propsData: {
        selectedValue,
        format,
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);
    const inputs = wrapper.findAll('.ux-calendar-range-picker-input');
    expect(inputs.at(0).element.value).toBe(dayjs(selectedValue[0]).format(format));
    expect(inputs.at(1).element.value).toBe(dayjs(selectedValue[1]).format(format));
    expect(portal.findAll('.ux-calendar-month-panel-selected-month').length).toBe(2);
  });

  describe('placement', () => {
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(
        portal.find('.ux-calendar-picker-container-placement-bottomLeft').exists()
      ).toBeTruthy();
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      wrapper.setProps({
        placement: 'topRight',
      });
      await waitTime();

      expect(portal.find('.ux-calendar-picker-container-placement-topRight').exists()).toBeTruthy();
    });

    it.each(['bottomLeft', 'bottomRight', 'topRight', 'topLeft'])('%s', async (placement) => {
      const wrapper = await mountPicker({
        propsData: {
          placement,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(
        portal.find(`.ux-calendar-picker-container-placement-${placement}`).exists()
      ).toBeTruthy();
    });
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

        const props = {
          pickerValue: [mockDate.toDate(), mockDate.toDate()],
          getPopupContainer,
        };
        return (
          <div ref="wrapRef">
            <RangeMonthPicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test);

    await waitTime();
    await triggerEvent(wrapper.find(RangeMonthPicker), 'click');
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('disabled', () => {
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: true,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: false,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-input-disabled').exists()).toBeFalsy();

      wrapper.setProps({
        disabled: true,
      });
      await waitTime();

      expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();
    });
  });
  describe('format', () => {
    const customFormat = 'MM/YYYY';
    it('init', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.toDate()],
          format: customFormat,
          transitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await selectMonth(portal, mockDate.add(2, 'month'));
      await selectMonth(portal, mockDate.add(4, 'month'));
      const inputs = wrapper.findAll('.ux-calendar-range-picker-input');

      const selectedValue = [
        mockDate.add(2, 'month').format(customFormat),
        mockDate.add(4, 'month').format(customFormat),
      ];
      expect(inputs.at(0).element.value).toBe(selectedValue[0]);
      expect(inputs.at(1).element.value).toBe(selectedValue[1]);

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][1]).toEqual(selectedValue);
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(1, 'month').toDate()],
          format,
          transitionName: '',
        },
      });

      const inputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(inputs.at(0).element.value).toBe(mockDate.format(format));
      expect(inputs.at(1).element.value).toBe(mockDate.add(1, 'month').format(format));

      wrapper.setProps({
        format: customFormat,
        transitionName: '',
      });

      await waitTime();

      expect(inputs.at(0).element.value).toBe(mockDate.format(customFormat));
      expect(inputs.at(1).element.value).toBe(mockDate.add(1, 'month').format(customFormat));
    });
  });
  describe('visible', () => {
    it('init', async () => {
      const onVisible = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          visible: true,
          transitionName: '',
        },
        listeners: {
          'open-change': onVisible,
        },
      });

      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(true);
    });
    it('update`', async () => {
      const onVisible = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          visible: false,
          transitionName: '',
        },
        listeners: {
          'open-change': onVisible,
        },
      });
      let portal = await getPortal(wrapper);
      expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

      wrapper.setProps({
        visible: true,
      });
      await waitTime();
      // 和上面的portal不一致, 需重新获取
      portal = await getPortal(wrapper);
      expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();

      expect(onVisible.mock.calls.length).toBe(1);
      expect(onVisible.mock.calls[0][0]).toBeTruthy();
    });
  });
  describe('picker-value', () => {
    it('should use current date when picker-value and selected-value is undefined', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      const current = dayjs();
      expect(yearPanels.at(0).text()).toBe(current.format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(current.add(1, 'year').format('YYYY'));
    });

    it('should use next year when year is equal', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [mockDate.toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.add(1, 'year').format('YYYY'));
    });
    it('should use new picker-value when picker-value update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [
            mockDate.subtract(7, 'year').toDate(),
            mockDate.subtract(3, 'year').toDate(),
          ],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      wrapper.setProps({
        pickerValue: [mockDate.subtract(4, 'year').toDate(), mockDate.toDate()],
      });
      await waitTime();
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.subtract(4, 'year').format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.format('YYYY'));
    });
    it('should use picker-value when selected-value is undefined', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [mockDate.subtract(5, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.subtract(5, 'year').format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.format('YYYY'));
    });

    it('should use selected-value when selected value', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [
            mockDate.subtract(5, 'year').toDate(),
            mockDate.subtract(3, 'year').toDate(),
          ],
          selectedValue: [mockDate.subtract(2, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.subtract(2, 'year').format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.format('YYYY'));
    });

    it('should use selected-value after selected value update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [
            mockDate.subtract(3, 'year').toDate(),
            mockDate.subtract(2, 'year').toDate(),
          ],
          selectedValue: [mockDate.subtract(2, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      wrapper.setProps({
        selectedValue: [
          mockDate.subtract(7, 'year').toDate(),
          mockDate.subtract(5, 'year').toDate(),
        ],
      });
      await waitTime();

      const portal = await getPortal(wrapper);
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.subtract(7, 'year').format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.subtract(5, 'year').format('YYYY'));
    });

    it('should use picker-value after selectd-value clear', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [
            mockDate.subtract(3, 'year').toDate(),
            mockDate.subtract(2, 'year').toDate(),
          ],
          selectedValue: [mockDate.subtract(6, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(wrapper.find('.ux-calendar-picker-clear'), 'click');
      const yearPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearPanels.at(0).text()).toBe(mockDate.subtract(3, 'year').format('YYYY'));
      expect(yearPanels.at(1).text()).toBe(mockDate.subtract(2, 'year').format('YYYY'));
    });
  });
  describe('selected-value', () => {
    const mockStartDate = mockDate.subtract(3, 'year').subtract(1, 'month');
    const mockEndDate = mockDate.add(2, 'month');
    it('default', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const yearsPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearsPanels.at(0).text()).toBe(mockStartDate.format('YYYY'));
      expect(yearsPanels.at(1).text()).toBe(mockEndDate.format('YYYY'));

      const startMonth = portal.find('.ux-calendar-month-panel-selected-start-month');
      const endMonth = portal.find('.ux-calendar-month-panel-selected-end-month');
      expect(startMonth.attributes('title')).toBe(mockStartDate.format('M月'));
      expect(endMonth.attributes('title')).toBe(mockEndDate.format('M月'));
    });

    it('should update when select date', async () => {
      const onInput = jest.fn();
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          format,
          transitionName: '',
        },
        listeners: {
          input: onInput,
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const selectedStartDate = mockStartDate.subtract(2, 'month');
      const selectedEndDate = mockEndDate.add(2, 'month');
      const leftPart = portal.find('.ux-calendar-month-range-left');
      const rightPart = portal.find('.ux-calendar-month-range-right');
      await selectMonth(leftPart, selectedStartDate);
      await selectMonth(rightPart, selectedEndDate);
      // open portal
      await triggerEvent(wrapper, 'click');
      const yearsPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearsPanels.at(0).text()).toBe(selectedStartDate.format('YYYY'));
      expect(yearsPanels.at(1).text()).toBe(selectedEndDate.format('YYYY'));

      const startMonth = portal.find('.ux-calendar-month-panel-selected-start-month');
      const endMonth = portal.find('.ux-calendar-month-panel-selected-end-month');
      expect(startMonth.attributes('title')).toBe(selectedStartDate.format('M月'));
      expect(endMonth.attributes('title')).toBe(selectedEndDate.format('M月'));
      expect(onInput).toHaveBeenCalled();
      expect(onInput.mock.calls[0][0]).toEqual([
        selectedStartDate.toDate(),
        selectedEndDate.toDate(),
      ]);
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual([
        selectedStartDate.toDate(),
        selectedEndDate.toDate(),
      ]);
      expect(onChange.mock.calls[0][1]).toEqual([
        selectedStartDate.format(format),
        selectedEndDate.format(format),
      ]);
    });

    it('should update when selected-value update', async () => {
      const onInput = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockStartDate.toDate(), mockEndDate.toDate()],
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const updateStartDate = mockStartDate.subtract(2, 'year').add(1, 'month');
      const updateEndDate = mockEndDate.subtract(1, 'year').add(3, 'month');
      wrapper.setProps({
        selectedValue: [updateStartDate.toDate(), updateEndDate.toDate()],
      });

      await waitTime();
      const portal = await getPortal(wrapper);
      const yearsPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearsPanels.at(0).text()).toBe(updateStartDate.format('YYYY'));
      expect(yearsPanels.at(1).text()).toBe(updateEndDate.format('YYYY'));

      const startMonth = portal.find('.ux-calendar-month-panel-selected-start-month');
      const endMonth = portal.find('.ux-calendar-month-panel-selected-end-month');
      expect(startMonth.attributes('title')).toBe(updateStartDate.format('M月'));
      expect(endMonth.attributes('title')).toBe(updateEndDate.format('M月'));
      expect(onInput).not.toHaveBeenCalled();
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
      const yearsPanels = portal.findAll('.ux-calendar-month-panel-year-select-content');
      expect(yearsPanels.at(0).text()).toBe(mockDate.format('YYYY'));
      expect(yearsPanels.at(1).text()).toBe(mockDate.add(1, 'year').format('YYYY'));
    });
  });
  describe('locale', () => {
    it.each([
      ['locale.lang', localeEN.lang],
      ['locale', localeEN],
    ])('should work when use %s', async (_, locale) => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [mockDate.toDate(), mockDate.toDate()],
          locale,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });
  });
  describe('placeholder', () => {
    it.each([
      [
        'default',
        'default',
        localeCN.lang.rangeMonthPlaceholder[0],
        localeCN.lang.rangeMonthPlaceholder[1],
      ],
      [
        'should work when placeholder is string',
        'this is string placeholder',
        'this is string placeholder',
        'this is string placeholder',
      ],
      [
        'should work when placeholder is Array and length = 1',
        ['this is array placeholder'],
        'this is array placeholder',
        'this is array placeholder',
      ],
      [
        'should work when placeholder is Array',
        ['this is start placeholder', 'this is end placeholder'],
        'this is start placeholder',
        'this is end placeholder',
      ],
    ])('%s', async (_, placeholder, expectStart, expectEnd) => {
      const propsData = { transitionName: '' };

      if (placeholder !== 'default') {
        propsData.placeholder = placeholder;
      }
      const wrapper = await mountPicker({
        propsData,
      });
      const inputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(inputs.at(0).attributes('placeholder')).toBe(expectStart);
      expect(inputs.at(1).attributes('placeholder')).toBe(expectEnd);
    });
  });
  describe('disabled-month', () => {
    it('should disabled 2018-05 ~ 2019-08', async () => {
      const mockDate1 = dayjs('2018-05-03');
      const mockDate2 = dayjs('2019-05-03');
      function disabledMonth(date) {
        const current = dayjs(date);
        return (
          current.isAfter(mockDate1.set('month', 3), 'month')
          && current.isBefore(mockDate2.set('month', 8), 'month')
        );
      }
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate1.toDate(), mockDate2.toDate()],
          disabledMonth,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(`${portal.html()}`).toMatchSnapshot();
    });
  });
  describe('size', () => {
    it.each(['small', 'default', 'large'])('%s', async (size) => {
      const wrapper = await mountPicker({
        propsData: {
          size,
          transitionName: '',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('allow-clear', () => {
    it('should clear when allow-clear is true default', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(4, 'month').toDate()],
          format,
          allowClear: true,
          transitionName: '',
        },
      });

      const inputs = wrapper.findAll('.ux-calendar-range-picker-input');

      expect(inputs.at(0).element.value).toBe(mockDate.format(format));
      expect(inputs.at(1).element.value).toBe(mockDate.add(4, 'month').format(format));

      const clear = wrapper.find('.ux-calendar-picker-clear');

      expect(clear.exists()).toBeTruthy();
      await triggerEvent(clear, 'click');

      expect(inputs.at(0).element.value).toBe('');
      expect(inputs.at(1).element.value).toBe('');
    });

    it('should not clear when allow-clear is false default', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(4, 'month').toDate()],
          format,
          allowClear: false,
          transitionName: '',
        },
      });

      const clear = wrapper.find('.ux-calendar-picker-clear');
      expect(clear.exists()).toBeFalsy();
    });

    it('should work after allow-clear update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          selectedValue: [mockDate.toDate(), mockDate.add(4, 'month').toDate()],
          format,
          allowClear: false,
          transitionName: '',
        },
      });

      wrapper.setProps({
        allowClear: true,
      });
      await waitTime();

      const clear = wrapper.find('.ux-calendar-picker-clear');
      expect(clear.exists()).toBeTruthy();

      await triggerEvent(clear, 'click');
      const inputs = wrapper.findAll('.ux-calendar-range-picker-input');
      expect(inputs.at(0).element.value).toBe('');
      expect(inputs.at(1).element.value).toBe('');
    });
  });

  describe('events', () => {
    it('panel-change', async () => {
      const onPanelChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
        listeners: {
          'panel-change': onPanelChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-month-range-left');
      const rightPart = portal.find('.ux-calendar-month-range-right');

      await triggerEvent(leftPart.find('.ux-calendar-month-panel-year-select'), 'click');

      expect(onPanelChange.mock.calls.length).toBe(1);
      expect(onPanelChange.mock.calls[0][1]).toEqual(['year', 'month']);

      await triggerEvent(leftPart.find('.ux-calendar-year-panel-decade-select'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(2);
      expect(onPanelChange.mock.calls[1][1]).toEqual(['decade', 'month']);

      await triggerEvent(leftPart.findAll('.ux-calendar-decade-panel-decade').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(3);
      expect(onPanelChange.mock.calls[2][1]).toEqual(['year', 'month']);

      await triggerEvent(leftPart.findAll('.ux-calendar-year-panel-year').at(1), 'click');

      expect(onPanelChange.mock.calls.length).toBe(4);
      expect(onPanelChange.mock.calls[3][1]).toEqual(['month', 'month']);

      await triggerEvent(rightPart.find('.ux-calendar-month-panel-year-select'), 'click');

      expect(onPanelChange.mock.calls.length).toBe(5);
      expect(onPanelChange.mock.calls[4][1]).toEqual(['month', 'year']);

      await triggerEvent(rightPart.findAll('.ux-calendar-year-panel-year').at(1), 'click');

      expect(onPanelChange.mock.calls.length).toBe(6);
      expect(onPanelChange.mock.calls[5][1]).toEqual(['month', 'month']);
    });

    it('hover-change', async () => {
      const onHoverChange = jest.fn();

      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [mockDate.subtract(1, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
        listeners: {
          'hover-change': onHoverChange,
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const leftPart = portal.find('.ux-calendar-month-range-left');
      const selectedStartDate = mockDate.subtract(1, 'year').set('month', 2);
      await selectMonth(leftPart, selectedStartDate);

      await triggerEvent(leftPart.find('[title="6月"]'), 'mouseenter');

      expect(onHoverChange).toHaveBeenCalled();
      expect(onHoverChange).toHaveBeenCalledWith([
        selectedStartDate.toDate(),
        selectedStartDate.set('month', 5).toDate(),
      ]);

      onHoverChange.mockReset();
      await triggerEvent(leftPart.find('[title="9月"]'), 'mouseenter');
      expect(onHoverChange).toHaveBeenCalled();
      expect(onHoverChange).toHaveBeenCalledWith([
        selectedStartDate.toDate(),
        selectedStartDate.set('month', 8).toDate(),
      ]);
    });

    it('calendar-change', async () => {
      const onCalendarChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: [mockDate.subtract(1, 'year').toDate(), mockDate.toDate()],
          transitionName: '',
        },
        listeners: {
          'calendar-change': onCalendarChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const leftPart = portal.find('.ux-calendar-month-range-left');

      const selectedStartDate = mockDate.subtract(1, 'year').set('month', 2);
      await selectMonth(leftPart, selectedStartDate);

      expect(onCalendarChange.mock.calls.length).toBe(1);
      expect(onCalendarChange.mock.calls[0][0]).toEqual([selectedStartDate.toDate()]);

      const rightPart = portal.find('.ux-calendar-month-range-right');
      const selectedEndDate = mockDate.set('month', 11);
      await selectMonth(rightPart, selectedEndDate);

      expect(onCalendarChange.mock.calls.length).toBe(2);
      expect(onCalendarChange.mock.calls[1][0]).toEqual([
        selectedStartDate.toDate(),
        selectedEndDate.toDate(),
      ]);
    });

    describe('open-change', () => {
      const mockPickerValue = [mockDate.subtract(2, 'month').toDate(), mockDate.toDate()];
      it('should open ', async () => {
        const onOpenChange = jest.fn();

        const wrapper = await mountPicker({
          propsData: {
            pickerValue: mockPickerValue,
            transitionName: '',
          },
          listeners: {
            'open-change': onOpenChange,
          },
        });

        await triggerEvent(wrapper, 'click');
        expect(onOpenChange).toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
      it('should close after select month', async () => {
        const onOpenChange = jest.fn();
        const wrapper = await mountPicker({
          propsData: {
            pickerValue: mockPickerValue,
            transitionName: '',
          },
          listeners: {
            'open-change': onOpenChange,
          },
        });

        await triggerEvent(wrapper, 'click');
        const portal = await getPortal(wrapper);

        const leftPart = portal.find('.ux-calendar-month-range-left');

        await selectMonth(leftPart, mockDate.set('month', 0));
        await selectMonth(leftPart, mockDate.set('month', 9));

        expect(onOpenChange).toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
      it('should close when body click', async () => {
        const onOpenChange = jest.fn();
        const wrapper = await mountPicker({
          propsData: {
            pickerValue: mockPickerValue,
            transitionName: '',
          },
          listeners: {
            'open-change': onOpenChange,
          },
        });

        await triggerEvent(wrapper, 'click');

        const bodyWrapper = createWrapper(wrapper.element.ownerDocument.body);

        await triggerEvent(bodyWrapper, 'mousedown');

        expect(onOpenChange).toHaveBeenCalled();
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });
});
