import {
  mountPickerFactory, waitTime, triggerEvent, getPortal, mount
} from '@suning/v-test-utils';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { selectWeek } from './utils';
import WeekPicker from '../weekPicker';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

dayjs.locale(zhCN);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);

describe('WeekPicker', () => {
  const mountPicker = mountPickerFactory(WeekPicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY 第 WW 周';
  const dayjsFormat = 'YYYY 第 ww 周';

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

    expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(dayjsFormat));

    expect(portal.find('.ux-calendar-week-number-cell').exists()).toBeTruthy();
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
            <WeekPicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test);
    await waitTime();
    await triggerEvent(wrapper.find(WeekPicker), 'click');
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('value', () => {
    it('default', async () => {
      const onInput = jest.fn();
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

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(dayjsFormat));
      expect(onInput).not.toHaveBeenCalled();
    });

    it('should select week when set value', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(
        portal
          .find('.ux-calendar-active-week')
          .find('[title]')
          .attributes('title')
      ).toBe(mockDate.format(dayjsFormat));
    });
    it('should update when selected value', async () => {
      const onInput = jest.fn();
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

      const weekDate = mockDate.week(21);
      await selectWeek(portal, weekDate, dayjsFormat);

      expect(wrapper.find('.ux-input').element.value).toBe(weekDate.format(dayjsFormat));

      expect(onInput).toHaveBeenCalled();
      expect(dayjs(onInput.mock.calls[0][0]).format(dayjsFormat)).toEqual(
        weekDate.format(dayjsFormat)
      );
    });

    it('should select week when update value', async () => {
      const onInput = jest.fn();
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

      const weekDate = mockDate.week(26);
      wrapper.setProps({
        value: weekDate.toDate(),
      });
      await waitTime();

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(wrapper.find('.ux-input').element.value).toBe(weekDate.format(dayjsFormat));

      expect(
        portal
          .find('.ux-calendar-active-week')
          .find('[title]')
          .attributes('title')
      ).toBe(weekDate.format(dayjsFormat));
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
      expect(portal.find('.ux-calendar-picker-container').exists()).toBeFalsy();

      wrapper.setProps({
        visible: true,
      });
      await waitTime();

      portal = await getPortal(wrapper);

      expect(portal.find('.ux-calendar-picker-container').exists()).toBeTruthy();

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
  describe('format', () => {
    const customFormat = 'W YYYY';
    const customDayjsFormat = 'w YYYY';
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format: customFormat,
          transitionName: '',
        },
      });

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(customDayjsFormat));
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
      });

      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(mockDate.format(dayjsFormat));

      wrapper.setProps({
        format: customFormat,
      });

      await waitTime();

      expect(input.element.value).toBe(mockDate.format(customDayjsFormat));
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

      const customDate = mockDate.week(21);
      await selectWeek(portal, customDate, customDayjsFormat);

      expect(wrapper.find('.ux-input').element.value).toBe(customDate.format(customDayjsFormat));
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][1]).toBe(customDate.format(customDayjsFormat));
    });
  });
  describe('placeholder', () => {
    it.each([
      ['default', 'default', localeCN.lang.weekPlaceholder],
      [
        'should work when placeholder is string',
        'this is week placeholder',
        'this is week placeholder',
      ],
    ])('%s', async (_, placeholder, expectValue) => {
      const props = { transitionName: '' };

      if (placeholder !== 'default') {
        props.placeholder = placeholder;
      }
      const wrapper = await mountPicker({
        propsData: props,
      });

      expect(wrapper.find('.ux-input').attributes('placeholder')).toBe(expectValue);
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
      expect(wrapper.find('.ux-input').element.value).toBe('');

      expect(onChange).toHaveBeenCalled();
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
      expect(wrapper.find('.ux-input').element.value).toBe('');
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
  describe('disabled-date', () => {
    it('init and disabled 19,21 week', async () => {
      function disabledDate(date) {
        const current = dayjs(date);
        return (
          (current.isAfter(
            mockDate
              .week(19)
              .startOf('week')
              .subtract(1, 'day'),
            'day'
          )
            && current.isBefore(
              mockDate
                .week(19)
                .endOf('week')
                .add(1, 'day'),
              'day'
            ))
          || (current.isAfter(
            mockDate
              .week(21)
              .startOf('week')
              .subtract(1, 'day'),
            'day'
          )
            && current.isBefore(
              mockDate
                .week(21)
                .endOf('week')
                .add(1, 'day'),
              'day'
            ))
        );
      }
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
          disabledDate,
        },
      });
      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(portal.html()).toMatchSnapshot();
    });
    it('init and disabled 20,22 week', async () => {
      function disabledDate(date) {
        const current = dayjs(date);
        return (
          (current.isAfter(
            mockDate
              .week(20)
              .startOf('week')
              .subtract(1, 'day'),
            'day'
          )
            && current.isBefore(
              mockDate
                .week(20)
                .endOf('week')
                .add(1, 'day'),
              'day'
            ))
          || (current.isAfter(
            mockDate
              .week(22)
              .startOf('week')
              .subtract(1, 'day'),
            'day'
          )
            && current.isBefore(
              mockDate
                .week(22)
                .endOf('week')
                .add(1, 'day'),
              'day'
            ))
        );
      }
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.toDate(),
          format,
          transitionName: '',
        },
      });

      wrapper.setProps({
        disabledDate,
      });
      await waitTime();

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      expect(portal.html()).toMatchSnapshot();
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
});
