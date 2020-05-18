import {
  mountPickerFactory, triggerEvent, getPortal, waitTime, mount
} from '@cloud-sn/v-test-utils';
import dayjs from 'dayjs';
import MultiDatePicker from '../multiDatePicker';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';
import { selectDate } from './utils';

describe('MultiDatePicker', () => {
  const mountPicker = mountPickerFactory(MultiDatePicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY-MM-DD';

  it('create', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: mockDate.toDate(),
        format,
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');
    expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(format));

    const portal = await getPortal(wrapper);
    expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
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
          value: mockDate.toDate(),
          getPopupContainer,
        };
        return (
          <div ref="wrapRef">
            <MultiDatePicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test);
    await waitTime();
    await triggerEvent(wrapper.find(MultiDatePicker), 'click');
    expect(wrapper.html()).toMatchSnapshot();
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

    await triggerEvent(portal.find('.ux-calendar-month-select'), 'click');
    expect(onPanelChange.mock.calls.length).toBe(1);
    expect(onPanelChange.mock.calls[0][1]).toEqual('month');

    await triggerEvent(portal.find('.ux-calendar-month-panel-year-select-content'), 'click');
    expect(onPanelChange.mock.calls.length).toBe(2);
    expect(onPanelChange.mock.calls[1][1]).toEqual('year');

    await triggerEvent(portal.find('.ux-calendar-year-panel-decade-select-content'), 'click');
    expect(onPanelChange.mock.calls.length).toBe(3);
    expect(onPanelChange.mock.calls[2][1]).toEqual('decade');

    await triggerEvent(portal.findAll('.ux-calendar-decade-panel-decade').at(1), 'click');
    expect(onPanelChange.mock.calls.length).toBe(4);
    expect(onPanelChange.mock.calls[3][1]).toEqual('year');

    await triggerEvent(portal.findAll('.ux-calendar-year-panel-year').at(1), 'click');
    expect(onPanelChange.mock.calls.length).toBe(5);
    expect(onPanelChange.mock.calls[4][1]).toEqual('month');

    await triggerEvent(portal.findAll('.ux-calendar-month-panel-month').at(1), 'click');
    expect(onPanelChange.mock.calls.length).toBe(6);
    expect(onPanelChange.mock.calls[5][1]).toEqual('date');
  });
  describe('locale', () => {
    it.each([
      ['localeEN.lang', localeEN.lang],
      ['localeEN', localeEN],
      ['localeCN', localeCN],
    ])('should work when use %s', async (_, locale) => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          locale,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
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
      expect(portal.find('.ux-calendar-multi').exists()).toBeTruthy();
      expect(onVisible).toHaveBeenCalled();
      expect(onVisible).toHaveBeenCalledWith(true);
    });
    it('update', async () => {
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
      expect(portal.find('.ux-calendar-multi').exists()).toBeFalsy();

      wrapper.setProps({
        visible: true,
      });
      await waitTime();

      portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-multi').exists()).toBeTruthy();

      expect(onVisible.mock.calls.length).toBe(1);
      expect(onVisible.mock.calls[0][0]).toBeTruthy();
    });
  });
  describe('disabled', () => {
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: true,
          transitionName: '',
        },
      });
      const input = wrapper.find('.ux-input-disabled');
      expect(input.exists()).toBeTruthy();
      expect(input.attributes('disabled')).toBeTruthy();
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

      const input = wrapper.find('.ux-input-disabled');
      expect(input.exists()).toBeTruthy();
      expect(input.attributes('disabled')).toBeTruthy();
    });
  });

  describe('picker-value', () => {
    const selector = '.ux-calendar-cell:not(.ux-calendar-last-month-cell)';
    const pickerValue = mockDate.subtract(1, 'month');
    it('should use current date when picker-value and value is undefined', async () => {
      const wrapper = await mountPicker({
        propsData: {
          format,
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const current = dayjs();

      expect(portal.find(selector).attributes('title')).toEqual(
        current.startOf('month').format(format)
      );
    });

    it('should use picker-value when picker-value is defined and value is undefined', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          format,
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(portal.find(selector).attributes('title')).toEqual(
        pickerValue.startOf('month').format(format)
      );
    });

    it('should use value when picker-value and value is defined', async () => {
      const nDate = mockDate.add(2, 'month');
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          value: nDate.toDate(),
          format,
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(portal.find(selector).attributes('title')).toEqual(
        nDate.startOf('month').format(format)
      );
    });

    it('should use updated value when picker-value is defined and value updated', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          value: mockDate.add(2, 'month').toDate(),
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      const updatedValue = mockDate.add(5, 'month');
      wrapper.setProps({
        value: updatedValue.toDate(),
      });

      await waitTime();
      expect(portal.find(selector).attributes('title')).toEqual(
        updatedValue.startOf('month').format(format)
      );
    });

    it('should use picker-value when picker-value is defined and value clear', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          value: mockDate.add(2, 'month').toDate(),
          allowClear: true,
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper.find('.ux-calendar-picker-clear'), 'click');
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.find(selector).attributes('title')).toEqual(
        pickerValue.startOf('month').format(format)
      );
    });

    it('should use updated picker-value when picker-value updated and vlaue is undefined', async () => {
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          allowClear: true,
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const updatedPickerValue = pickerValue.subtract(3, 'month');
      wrapper.setProps({
        pickerValue: updatedPickerValue.toDate(),
      });
      await waitTime();
      expect(portal.find(selector).attributes('title')).toEqual(
        updatedPickerValue.startOf('month').format(format)
      );
    });
  });
  describe('value', () => {
    it('should empty string when default', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });
      expect(wrapper.find('.ux-input').element.value).toBe('');
    });
    it('should set input value when value is string ', async () => {
      const onInput = jest.fn();
      const d1 = mockDate.add(3, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: d1.toDate(),
          format,
          transitionName: '',
        },
        listeners: {
          input: onInput,
        },
      });

      expect(wrapper.find('.ux-input').element.value).toBe(d1.format(format));
      expect(onInput).not.toHaveBeenCalled();
    });
    it('should set input value when value is array ', async () => {
      const d1 = mockDate.add(3, 'day');
      const d2 = mockDate.add(10, 'day');
      const d3 = mockDate.add(15, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate(), d3.toDate()],
          format,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-input').element.value).toBe(
        [d1, d2, d3].map((v) => v.format(format)).join(', ')
      );
    });
    it('should select date when value is string', async () => {
      const d1 = mockDate.add(3, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: d1.toDate(),
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const selectedDays = portal.findAll('.ux-calendar-selected-day');

      expect(selectedDays.length).toBe(1);
      expect(selectedDays.at(0).attributes('title')).toBe(d1.format(format));
    });

    it('should select date when value is array', async () => {
      const d1 = mockDate.add(3, 'day');
      const d2 = mockDate.add(10, 'day');
      const d3 = mockDate.add(15, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate(), d3.toDate()],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const selectedDays = portal.findAll('.ux-calendar-selected-day');

      expect(selectedDays.length).toBe(3);
      expect(selectedDays.at(0).attributes('title')).toBe(d1.format(format));
      expect(selectedDays.at(1).attributes('title')).toBe(d2.format(format));
      expect(selectedDays.at(2).attributes('title')).toBe(d3.format(format));
    });

    it('should update select date when value is update', async () => {
      const d1 = mockDate.add(3, 'day');
      const d2 = mockDate.add(10, 'day');
      const d3 = mockDate.add(15, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate(), d3.toDate()],
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const d4 = mockDate.add(7, 'day');
      wrapper.setProps({
        value: [d4.toDate()],
      });
      await waitTime();
      const selectedDays = portal.findAll('.ux-calendar-selected-day');

      expect(selectedDays.length).toBe(1);
      expect(selectedDays.at(0).attributes('title')).toBe(d4.format(format));
    });

    it('should update value when select date', async () => {
      const onInput = jest.fn();
      const pickerValue = mockDate.add(2, 'month');
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: pickerValue.toDate(),
          format,
          transitionName: '',
        },
        listeners: {
          input: onInput,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      const d1 = pickerValue.add(1, 'day');
      const d2 = pickerValue.add(10, 'day');
      const d3 = pickerValue.add(20, 'day');

      await selectDate(portal, d2, format);
      await selectDate(portal, d1, format);
      await selectDate(portal, d3, format);

      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      expect(onInput).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalledWith([d2.toDate(), d1.toDate(), d3.toDate()]);
    });

    it('should update value when unselect date', async () => {
      const onInput = jest.fn();
      const d1 = mockDate.add(3, 'day');
      const d2 = mockDate.add(10, 'day');
      const d3 = mockDate.add(15, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate(), d3.toDate()],
          format,
          transitionName: '',
        },
        listeners: {
          input: onInput,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await selectDate(portal, d1, format);
      await selectDate(portal, d3, format);

      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      expect(onInput).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalledWith([d2.toDate()]);
    });
  });
  describe('format', () => {
    const customFormat = 'DD/MM/YYYY';
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format: customFormat,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(customFormat));
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
      });

      wrapper.setProps({
        format: customFormat,
      });

      await waitTime();

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(customFormat));
    });

    it('selected value', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format: customFormat,
          transitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const d1 = mockDate.add(2, 'day');
      const d2 = mockDate.add(4, 'day');
      const d3 = mockDate.add(8, 'day');
      // unselect value
      await selectDate(portal, mockDate, customFormat);
      // select value
      await selectDate(portal, d1, customFormat);
      await selectDate(portal, d2, customFormat);
      await selectDate(portal, d3, customFormat);
      await triggerEvent(portal.find('.ux-calendar-ok-btn'), 'click');
      const expectVal = [d1, d2, d3].map((v) => v.format(customFormat)).join(', ');
      expect(wrapper.find('.ux-input').element.value).toBe(expectVal);
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual([d1.toDate(), d2.toDate(), d3.toDate()]);
      expect(onChange.mock.calls[0][1]).toBe(expectVal);
    });
  });
  describe('show-date-input', () => {
    it('should display when init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-input-wrap').exists()).toBeTruthy();
    });

    it('init false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showDateInput: false,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-input-wrap').exists()).toBeFalsy();
    });

    it('update true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showDateInput: false,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      wrapper.setProps({
        showDateInput: true,
      });

      await waitTime();
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-input-wrap').exists()).toBeTruthy();
    });

    it('update false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showDateInput: true,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      wrapper.setProps({
        showDateInput: false,
      });

      await waitTime();
      const portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-input-wrap').exists()).toBeFalsy();
    });
  });
  describe('disabled-date', () => {
    it('init and disabled 2019-04-05 ,2019-04-10', async () => {
      const d1 = dayjs('2019-04-05');
      const d2 = dayjs('2019-04-10');
      function disabledDate(date) {
        const current = dayjs(date);

        return current.isSame(d1) || current.isSame(d2);
      }
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: mockDate.subtract(1, 'month').toDate(),
          disabledDate,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(portal.html()).toMatchSnapshot();
    });
    it('update and disabled 2019-06-15 ,2019-06-20', async () => {
      const d1 = dayjs('2019-06-15');
      const d2 = dayjs('2019-06-20');
      function disabledDate(date) {
        const current = dayjs(date);

        return current.isSame(d1) || current.isSame(d2);
      }
      const wrapper = await mountPicker({
        propsData: {
          pickerValue: mockDate.add(1, 'month').toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      wrapper.setProps({
        disabledDate,
      });
      await waitTime();
      expect(portal.html()).toMatchSnapshot();
    });
  });

  describe('allow-clear', () => {
    it('should clear when default true', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          transitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      const clear = wrapper.find('.ux-calendar-picker-clear');
      expect(clear.exists()).toBeTruthy();

      await triggerEvent(clear, 'click');
      expect(wrapper.find('.ux-input').element.value).toEqual('');

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual([]);
      expect(onChange.mock.calls[0][1]).toBe('');
    });
    it('should not clear when allow-clear is false ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          allowClear: false,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-calendar-picker-clear').exists()).toBeFalsy();
    });
    it('should clear when allow-clear update to true ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
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
      expect(wrapper.find('.ux-input').element.value).toEqual('');
    });
    it('should clear when value is array ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [mockDate.toDate(), mockDate.add(2, 'month').toDate()],
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
      expect(wrapper.find('.ux-input').element.value).toBe('');
    });
  });
  describe('placeholder', () => {
    it.each([
      ['default', 'default', localeCN.lang.multiPlaceholder],
      [
        'should work when placeholder is string',
        'this is multi date placeholder',
        'this is multi date placeholder',
      ],
    ])('%s', async (_, placeholder, expectValue) => {
      const props = { showDateInput: true, transitionName: '' };

      if (placeholder !== 'default') {
        props.placeholder = placeholder;
      }
      const wrapper = await mountPicker({
        propsData: props,
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(wrapper.find('.ux-input').attributes('placeholder')).toBe(expectValue);
      expect(portal.find('.ux-calendar-date-input-wrap input').attributes('placeholder')).toBe(
        expectValue
      );
    });
  });
  describe('size', () => {
    it.each(['small', 'large', 'default'])('%s', async (size) => {
      const wrapper = await mountPicker({
        propsData: {
          size,
          transitionName: '',
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
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

  describe('events', () => {
    it('select', async () => {
      const onSelect = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
        listeners: {
          select: onSelect,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      const d1 = mockDate.add(10, 'day');
      await selectDate(portal, d1, format);

      expect(onSelect).toHaveBeenCalled();
      expect(onSelect.mock.calls[0][0]).toEqual(d1.toDate());
      expect(onSelect.mock.calls[0][1]).toEqual([mockDate.toDate(), d1.toDate()]);
    });
  });
  it('unselect', async () => {
    const onUnSelect = jest.fn();
    const d1 = mockDate.add(4, 'day');
    const d2 = mockDate.add(10, 'day');
    const d3 = mockDate.add(15, 'day');
    const wrapper = await mountPicker({
      propsData: {
        value: [d1.toDate(), d2.toDate(), d3.toDate()],
        format,
        transitionName: '',
      },
      listeners: {
        unselect: onUnSelect,
      },
    });

    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);
    await selectDate(portal, d2, format);

    expect(onUnSelect).toHaveBeenCalled();
    expect(onUnSelect.mock.calls[0][0]).toEqual(d2.toDate());
    expect(onUnSelect.mock.calls[0][1]).toEqual([d1.toDate(), d3.toDate()]);
  });
});
