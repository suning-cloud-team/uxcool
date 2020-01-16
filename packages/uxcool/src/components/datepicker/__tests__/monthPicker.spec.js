import {
  mount,
  waitTime,
  getPortal,
  triggerEvent,
  mountPickerFactory,
  createWrapper,
} from '@suning/v-test-utils';
import dayjs from 'dayjs';

import { selectMonth } from './utils';
import MonthPicker from '../monthPicker';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

describe('MonthPicker', () => {
  const mountPicker = mountPickerFactory(MonthPicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY-MM';
  it('create', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: mockDate.toDate(),
        format,
        transitionName: '',
      },
    });
    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    await selectMonth(portal, mockDate.add(5, 'month'));

    expect(wrapper.find('.ux-input').element.value).toBe(mockDate.add(5, 'month').format(format));
  });
  it('disabled', async () => {
    const wrapper = await mountPicker({
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.find('.ux-input-disabled').exists()).toBeTruthy();
    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);
    expect(portal.element).toBeUndefined();
  });

  it('format', async () => {
    const customFormat = 'MM/YY';
    const wrapper = await mountPicker({
      propsData: {
        value: mockDate.toDate(),
        format: customFormat,
        transitionName: '',
      },
    });

    const input = wrapper.find('.ux-input');
    expect(input.element.value).toBe(mockDate.format(customFormat));
    await triggerEvent(wrapper, 'click');
    const portal = await getPortal(wrapper);

    await selectMonth(portal, mockDate.add(3, 'month'));
    expect(input.element.value).toBe(mockDate.add(3, 'month').format(customFormat));
  });

  it('get-popup-container', async () => {
    const Test = {
      render() {
        const { $refs } = this;
        const props = {
          getPopupContainer() {
            return $refs.wrapRef;
          },
        };
        return (
          <div ref="wrapRef">
            <MonthPicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test);

    await waitTime();
    await triggerEvent(wrapper.find(MonthPicker), 'click');

    expect(wrapper.html()).toMatchSnapshot();
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

  it('placeholder', async () => {
    const wrapper = await mountPicker({
      propsData: {
        transitionName: '',
      },
    });

    const input = wrapper.find('.ux-input');
    expect(input.attributes('placeholder')).toBe(localeCN.lang.monthPlaceholder);

    const placeholder = 'this is month placholder';
    wrapper.setProps({
      placeholder,
    });
    await waitTime();

    expect(input.attributes('placeholder')).toBe(placeholder);
  });

  describe('allow-clear', () => {
    it('should clear when allow-clear is true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          allowClear: true,
          format,
          transitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await selectMonth(portal, mockDate.add(1, 'month'));
      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(mockDate.add(1, 'month').format(format));

      const clear = wrapper.find('.ux-calendar-picker-clear');
      expect(clear.exists()).toBeTruthy();

      await triggerEvent(clear, 'click');
      expect(input.element.value).toBe('');
    });
    it('should not clear when allow-clear is false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          allowClear: false,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);
      await selectMonth(portal, mockDate.add(3, 'month'));

      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(mockDate.add(3, 'month').format(format));

      expect(wrapper.find('.ux-calendar-picker-clear').exists()).toBeFalsy();
    });
  });

  describe('size', () => {
    it('small', async () => {
      const wrapper = await mountPicker({
        propsData: {
          size: 'small',
          transitionName: '',
        },
      });

      expect(`${wrapper.html()}`).toMatchSnapshot();
    });
    it('default', async () => {
      const wrapper = await mountPicker({
        propsData: {
          size: 'default',
          transitionName: '',
        },
      });

      expect(`${wrapper.html()}`).toMatchSnapshot();
    });
    it('large', async () => {
      const wrapper = await mountPicker({
        propsData: {
          size: 'large',
          transitionName: '',
        },
      });
      expect(`${wrapper.html()}`).toMatchSnapshot();
    });
  });

  describe('visible', () => {
    it('should show trigger when visible is true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          visible: true,
          transitionName: '',
        },
      });

      const portal = await getPortal(wrapper);
      expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
    });
  });

  describe('value', () => {
    it('should update value after selected month', async () => {
      const onInput = jest.fn();
      const selectedMonth = mockDate.add(3, 'month');
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
        listeners: {
          input: onInput,
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);
      await selectMonth(portal, selectedMonth);

      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(selectedMonth.format(format));

      expect(onInput).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalledWith(selectedMonth.toDate());
    });

    it('should select month when init value', async () => {
      const onInput = jest.fn();
      const selectedDate = mockDate.add(5, 'month');
      const wrapper = await mountPicker({
        propsData: {
          value: selectedDate.toDate(),
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(wrapper.find('.ux-input').element.value).toBe(selectedDate.format(format));
      expect(portal.find('.ux-calendar-month-panel-year-select-content').text()).toBe(
        selectedDate.format('YYYY')
      );
      expect(portal.find('.ux-calendar-month-panel-selected-cell').attributes('title')).toBe(
        selectedDate.format('M月')
      );

      expect(onInput).not.toHaveBeenCalled();
    });

    it('should select month after update value', async () => {
      const onInput = jest.fn();
      const updateValue = mockDate.add(6, 'month');
      const wrapper = await mountPicker({
        propsData: {
          format,
          trnasitionName: '',
        },
        listeners: {
          input: onInput,
        },
      });

      await triggerEvent(wrapper, 'click');
      wrapper.setProps({
        value: updateValue.toDate(),
      });

      await waitTime();

      const portal = await getPortal(wrapper);

      expect(wrapper.find('.ux-input').element.value).toBe(updateValue.format(format));
      expect(portal.find('.ux-calendar-month-panel-year-select-content').text()).toBe(
        updateValue.format('YYYY')
      );
      expect(portal.find('.ux-calendar-month-panel-selected-cell').attributes('title')).toBe(
        updateValue.format('M月')
      );
      expect(onInput).not.toHaveBeenCalled();
    });
  });

  describe('locale', () => {
    it('should work when use locale.lang', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          locale: localeEN.lang,
          trnasitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });
    it('should work when use locale', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          locale: localeEN,
          trnasitionName: '',
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(`${wrapper.html()}${portal.html()}`).toMatchSnapshot();
    });
  });

  describe('disabled-month', () => {
    it('should disabled 2月,5月,7月, 8月, 12月', async () => {
      function disabledMonth(date) {
        const m = dayjs(date).month();
        return (
          m
          in {
            1: 1,
            4: 1,
            6: 1,
            7: 1,
            11: 1,
          }
        );
      }
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          disabledMonth,
          trnasitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      expect(portal.html()).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = jest.fn();
      const selectedValue = mockDate.add(2, 'month');
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          trnasitionName: '',
        },
        listeners: {
          change: onChange,
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      await selectMonth(portal, selectedValue);

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0]).toEqual([
        selectedValue.toDate(),
        selectedValue.format(format),
      ]);
    });
    it('open-change', async () => {
      const onOpenChange = jest.fn();
      const selectedValue = mockDate.add(2, 'month');
      const wrapper = await mountPicker({
        propsData: {
          trnasitionName: '',
        },
        listeners: {
          'open-change': onOpenChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      expect(onOpenChange.mock.calls.length).toBe(1);
      expect(onOpenChange.mock.calls[0]).toEqual([true]);

      const portal = await getPortal(wrapper);
      await selectMonth(portal, selectedValue);

      expect(onOpenChange.mock.calls.length).toBe(2);
      expect(onOpenChange.mock.calls[1]).toEqual([false]);

      await triggerEvent(wrapper, 'click');
      expect(onOpenChange.mock.calls.length).toBe(3);
      expect(onOpenChange.mock.calls[2]).toEqual([true]);
      const body = createWrapper(wrapper.element.ownerDocument.body);

      await triggerEvent(body, 'mousedown');
      expect(onOpenChange.mock.calls.length).toBe(4);
      expect(onOpenChange.mock.calls[3]).toEqual([false]);
    });

    it('panel-change', async () => {
      const onPanelChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          trnasitionName: '',
        },
        listeners: {
          'panel-change': onPanelChange,
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-month-panel-year-select'), 'click');

      expect(onPanelChange.mock.calls.length).toBe(1);
      expect(onPanelChange.mock.calls[0][1]).toBe('year');

      await triggerEvent(portal.find('.ux-calendar-year-panel-decade-select'), 'click');
      expect(onPanelChange.mock.calls.length).toBe(2);
      expect(onPanelChange.mock.calls[1][1]).toBe('decade');

      await triggerEvent(portal.findAll('.ux-calendar-decade-panel-cell').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(3);
      expect(onPanelChange.mock.calls[2][1]).toBe('year');

      await triggerEvent(portal.findAll('.ux-calendar-year-panel-cell').at(1), 'click');
      expect(onPanelChange.mock.calls.length).toBe(4);
      expect(onPanelChange.mock.calls[3][1]).toBe('month');
    });
  });
});
