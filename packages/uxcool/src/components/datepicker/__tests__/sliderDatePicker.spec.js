import {
  mountPickerFactory,
  waitTime,
  triggerEvent,
  getPortal,
  mount,
  createWrapper,
} from '@suning/v-test-utils';
import dayjs from 'dayjs';
import { VRangeDatePicker } from '@suning/v-datepicker';
import Trigger from '@suning/v-trigger';
import SliderDatePicker from '../sliderDatePicker';
import Select from '../../select';
import localeCN from '../locale/zh_CN';
import localeEN from '../locale/en_US';

describe('SliderDatePicker', () => {
  const mountPicker = mountPickerFactory(SliderDatePicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY-MM-DD';
  async function openRangeDatePicker(selectPortal) {
    await triggerEvent(
      selectPortal.findAll('.ux-select-dropdown-menu-item:nth-of-type(1)').at(0),
      'click',
      // menu click 有 50ms 延时
      100
    );
  }

  function calcDuration(d1, d2) {
    const diffTime = Math.abs(d1.toDate().getTime() - d2.toDate().getTime()) || 0;
    return diffTime;
  }
  function getSelect(wrapper) {
    return wrapper.find(Select);
  }
  function getRangeDatePicker(wrapper) {
    return wrapper.find(VRangeDatePicker);
  }

  async function openSelectPortal(wrapper) {
    const selectWrapper = getSelect(wrapper);
    await triggerEvent(selectWrapper, 'click');
    const selectPortal = await getPortal(selectWrapper);

    return {
      selectWrapper,
      selectPortal,
    };
  }
  async function getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper) {
    const { selectWrapper, selectPortal } = await openSelectPortal(wrapper);

    await openRangeDatePicker(selectPortal);
    const dateWrapper = getRangeDatePicker(wrapper);
    const datePortal = await getPortal(dateWrapper);

    return {
      selectWrapper,
      selectPortal,
      dateWrapper,
      datePortal,
    };
  }

  function getFormatDateStr(values = [], fmt) {
    return values.map((v) => v.format(fmt)).join('~');
  }

  it('create', async () => {
    const d1 = mockDate.add(2, 'day');
    const d2 = mockDate.add(5, 'day');
    const wrapper = await mountPicker({
      value: [d1.toDate(), d2.toDate()],
      transition: '',
    });

    const selectWrapper = getSelect(wrapper);
    await triggerEvent(selectWrapper, 'click');
    const selectPortal = await getPortal(selectWrapper);
    expect(selectPortal.find('.ux-select-dropdown').exists()).toBeTruthy();

    await openRangeDatePicker(selectPortal);
    const dateWrapper = getRangeDatePicker(wrapper);
    const datePortal = await getPortal(dateWrapper);

    expect(datePortal.find('.ux-calendar-picker-container').exists()).toBeTruthy();
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
          value: [mockDate.toDate(), mockDate.add(2, 'day').toDate()],
          getPopupContainer,
        };
        return (
          <div class="wrap" ref="wrapRef">
            <SliderDatePicker {...{ props }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test);
    await waitTime();
    await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
    await waitTime(500);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('disabled', () => {
    it('init and disabled is false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: false,
          showSliderBar: true,
          transition: '',
        },
      });

      expect(wrapper.find('.ux-select-disabled').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-left]').attributes('disabled')).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-pause]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').attributes('disabled')).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-refresh]').attributes('disabled')).toBeFalsy();
    });
    it('init and disabled is true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: true,
          showSliderBar: true,
          transition: '',
        },
      });

      expect(wrapper.find('.ux-select-disabled').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-left]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-pause]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-refresh]').attributes('disabled')).toBeTruthy();
    });
    it('update disable true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: false,
          showSliderBar: true,
          transition: '',
        },
      });
      wrapper.setProps({
        disabled: true,
      });
      await waitTime();

      expect(wrapper.find('.ux-select-disabled').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-left]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-pause]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-refresh]').attributes('disabled')).toBeTruthy();
    });
    it('update disable false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          disabled: true,
          showSliderBar: true,
          transition: '',
        },
      });

      wrapper.setProps({
        disabled: false,
      });
      await waitTime();
      expect(wrapper.find('.ux-select-disabled').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-left]').attributes('disabled')).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-pause]').attributes('disabled')).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').attributes('disabled')).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-refresh]').attributes('disabled')).toBeFalsy();
    });
  });

  describe('allow-clear', () => {
    const d1 = mockDate.add(2, 'day');
    const d2 = mockDate.add(5, 'day');
    it('should clear when allow-clear true', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          allowClear: true,
          transition: '',
        },
        listeners: {
          change: onChange,
        },
      });
      const clear = wrapper.find('.ux-select-selection__clear');
      expect(clear.exists()).toBeTruthy();

      // clear event 有 100ms 延时
      await triggerEvent(clear, 'click', 150);
      expect(wrapper.find('.ux-calendar-slider-select-label').exists()).toBeFalsy();

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual([]);
    });

    it('should not clear when allow-clear is false ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          allowClear: false,
          transition: '',
        },
      });

      expect(wrapper.find('.ux-select-selection__clear').exists()).toBeFalsy();
    });
    it('should clear when allow-clear update to true ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          allowClear: false,
          transition: '',
        },
      });

      wrapper.setProps({
        allowClear: true,
      });
      await waitTime();

      const clear = wrapper.find('.ux-select-selection__clear');
      expect(clear.exists()).toBeTruthy();
      // clear event 有 100ms 延时
      await triggerEvent(clear, 'click', 150);
      expect(wrapper.find('.ux-calendar-slider-select-label').exists()).toBeFalsy();
    });
  });

  describe('format', () => {
    const customFormat = 'DD/MM/YYYY';
    const d1 = mockDate.add(5, 'day');
    const d2 = mockDate.add(7, 'day');
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          format: customFormat,
          showTime: false,
          transition: '',
        },
      });

      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], customFormat)
      );
    });
    // 原代码未实现这个逻辑 - hw 2020-02-19
    // it('update', async () => {
    //   const wrapper = await mountPicker({
    //     propsData: {
    //       value: [d1.toDate(), d2.toDate()],
    //       format,
    //       showTime: false,
    //       transition: '',
    //     },
    //   });

    //   wrapper.setProps({
    //     format: customFormat,
    //   });

    //   await waitTime();

    //   expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
    //     getFormatDateStr([d1, d2], customFormat)
    //   );
    // });
  });

  describe('show-slider-bar', () => {
    it('init  show-slider-bar true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showSliderBar: true,
          transition: '',
        },
      });

      expect(wrapper.find('[role=slider-bar-left]').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-pause]').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').exists()).toBeTruthy();
    });
    it('init show-slider-bar false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showSliderBar: false,
          transition: '',
        },
      });

      expect(wrapper.find('[role=slider-bar-left]').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-pause]').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-right]').exists()).toBeFalsy();
    });
    it('update show-slider-bar true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showSliderBar: false,
          transition: '',
        },
      });

      wrapper.setProps({
        showSliderBar: true,
      });

      await waitTime();

      expect(wrapper.find('[role=slider-bar-left]').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-pause]').exists()).toBeTruthy();
      expect(wrapper.find('[role=slider-bar-right]').exists()).toBeTruthy();
    });

    it('update show-slider-bar false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showSliderBar: true,
          transition: '',
        },
      });

      wrapper.setProps({
        showSliderBar: false,
      });

      await waitTime();

      expect(wrapper.find('[role=slider-bar-left]').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-pause]').exists()).toBeFalsy();
      expect(wrapper.find('[role=slider-bar-right]').exists()).toBeFalsy();
    });
  });

  describe('ranges', () => {
    const currentDate = dayjs();
    const ranges = [
      {
        label: '最近15分钟',
        duration: '15m',
        dates() {
          return [currentDate.subtract(15, 'minute').toDate(), currentDate.toDate()];
        },
      },
      {
        value: '最近1小时',
        label: '最近1小时啊',
        duration: '1h',
        dates() {
          return [currentDate.subtract(1, 'hour').toDate(), currentDate.toDate()];
        },
      },
    ];
    it('render ranges', async () => {
      const wrapper = await mountPicker({
        propsData: {
          ranges,
          transition: '',
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      const quicks = datePortal.findAll('.ux-calendar-range-quick-selector-item');
      expect(quicks.length).toBe(ranges.length);
      expect(
        quicks
          .at(0)
          .find('a')
          .text()
      ).toBe(ranges[0].label);
      expect(
        quicks
          .at(1)
          .find('a')
          .text()
      ).toBe(ranges[1].label);
    });

    it('click ranges', async () => {
      const onInput = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          ranges,
          transition: '',
        },
        listeners: {
          input: onInput,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      const quicks = datePortal.findAll('.ux-calendar-range-quick-selector-item');
      await triggerEvent(quicks.at(0).find('a'), 'click');

      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(ranges[0].label);

      expect(onInput).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalledWith(ranges[0].dates());
    });
  });

  describe('max-history-len', () => {
    const d1 = mockDate.add(5, 'day');
    const d2 = mockDate.add(10, 'day');
    it('init max-history-len 3', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxHistoryLen: 3,
          transition: '',
        },
      });

      wrapper.setProps({
        value: [d1.add(3, 'day').toDate(), d2.add(1, 'day').toDate()],
      });
      await waitTime();
      wrapper.setProps({
        value: [d1.add(4, 'day').toDate(), d2.add(2, 'day').toDate()],
      });
      await waitTime();
      wrapper.setProps({
        value: [d1.add(5, 'day').toDate(), d2.add(3, 'day').toDate()],
      });
      await waitTime();

      const { selectPortal } = await openSelectPortal(wrapper);

      expect(selectPortal.findAll('.ux-select-dropdown-menu-item').length).toBe(3 + 1);
    });
    // 原代码未实现这个逻辑 - hw 2020-02-19
    // it('update max-history-len 2', async () => {
    //   const wrapper = await mountPicker({
    //     propsData: {
    //       value: [d1.toDate(), d2.toDate()],
    //       maxHistoryLen: 3,
    //       transition: '',
    //     },
    //   });

    //   wrapper.setProps({
    //     value: [d1.add(3, 'day').toDate(), d2.add(1, 'day').toDate()],
    //   });
    //   await waitTime();
    //   wrapper.setProps({
    //     value: [d1.add(4, 'day').toDate(), d2.add(2, 'day').toDate()],
    //   });
    //   await waitTime();
    //   wrapper.setProps({
    //     value: [d1.add(5, 'day').toDate(), d2.add(3, 'day').toDate()],
    //   });
    //   await waitTime();

    //   wrapper.setProps({
    //     maxHistoryLen: 2,
    //   });
    //   await waitTime();
    //   const { selectPortal } = await openSelectPortal(wrapper);

    //   expect(selectPortal.findAll('.ux-select-dropdown-menu-item').length).toBe(2 + 1);
    // });

    it('select history', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          format,
          transition: '',
        },
      });

      wrapper.setProps({
        value: [d1.add(3, 'day').toDate(), d2.add(1, 'day').toDate()],
      });
      await waitTime();

      const { selectPortal } = await openSelectPortal(wrapper);
      // select menu click 有 50ms 延时
      await triggerEvent(selectPortal.findAll('.ux-select-dropdown-menu-item').at(1), 'click', 100);

      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
    });
  });

  describe('reverse-history', () => {
    const d1 = mockDate.add(5, 'day');
    const d2 = mockDate.add(10, 'day');
    it('init reverse-history false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          reverseHistory: false,
          transition: '',
          format,
        },
      });

      const d3 = d1.add(3, 'day');
      const d4 = d2.add(1, 'day');
      wrapper.setProps({
        value: [d3.toDate(), d4.toDate()],
      });
      await waitTime();

      const { selectPortal } = await openSelectPortal(wrapper);
      const items = selectPortal.findAll('.ux-select-dropdown-menu-item');
      expect(
        items
          .at(1)
          .find('.ux-calendar-slider-select-label')
          .text()
      ).toBe(getFormatDateStr([d1, d2], format));
      expect(
        items
          .at(2)
          .find('.ux-calendar-slider-select-label')
          .text()
      ).toBe(getFormatDateStr([d3, d4], format));
    });
    it('init reverse-history true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          reverseHistory: true,
          transition: '',
          format,
        },
      });

      const d3 = d1.add(3, 'day');
      const d4 = d2.add(1, 'day');
      wrapper.setProps({
        value: [d3.toDate(), d4.toDate()],
      });
      await waitTime();

      const { selectPortal } = await openSelectPortal(wrapper);
      const items = selectPortal.findAll('.ux-select-dropdown-menu-item');
      expect(
        items
          .at(1)
          .find('.ux-calendar-slider-select-label')
          .text()
      ).toBe(getFormatDateStr([d3, d4], format));
      expect(
        items
          .at(2)
          .find('.ux-calendar-slider-select-label')
          .text()
      ).toBe(getFormatDateStr([d1, d2], format));
    });
  });

  describe('max-slider-date and min-slider-date', () => {
    const d1 = mockDate.add(5, 'day');
    const d2 = mockDate.add(10, 'day');
    it('should work max-slider-date - min-slider-date < diffTime ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(1, 'day').toDate(),
          minSliderDate: d1.subtract(1, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const rightBtn = wrapper.find('[role=slider-bar-right]');
      await triggerEvent(rightBtn, 'click');
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
      const leftBtn = wrapper.find('[role=slider-bar-left]');
      await triggerEvent(leftBtn, 'click');
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
    });
    it('should work max-slider-date - min-slider-date > diffTime', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(6, 'day').toDate(),
          minSliderDate: d1.subtract(6, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const rightBtn = wrapper.find('[role=slider-bar-right]');
      await triggerEvent(rightBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1.add(diffTime, 'ms'), d2.add(diffTime, 'ms')], format)
      );
      const pauseBtn = wrapper.find('[role=slider-bar-pause]');
      await triggerEvent(pauseBtn, 'click');
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
    });

    it('should work only max-slider-date', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(1, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const rightBtn = wrapper.find('[role=slider-bar-right]');
      await triggerEvent(rightBtn, 'click');
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
    });
    it('should work only min-slider-date', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          minSliderDate: d1.subtract(1, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const leftBtn = wrapper.find('[role=slider-bar-left]');
      await triggerEvent(leftBtn, 'click');
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1, d2], format)
      );
    });
    it('should work when min-slider-date > slider date', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          minSliderDate: d1.subtract(6, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const leftBtn = wrapper.find('[role=slider-bar-left]');
      await triggerEvent(leftBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1.subtract(diffTime, 'ms'), d2.subtract(diffTime, 'ms')], format)
      );
    });
    it('should work when max-slider-date > slider date', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(6, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const rightBtn = wrapper.find('[role=slider-bar-right]');
      await triggerEvent(rightBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([d1.add(diffTime, 'ms'), d2.add(diffTime, 'ms')], format)
      );
    });

    it('should work when max-slider-date and compatibility', async () => {
      const maxSliderDate = d2.add(1, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: maxSliderDate.toDate(),
          transition: '',
          format,
          compatibility: true,
        },
      });

      const rightBtn = wrapper.find('[role=slider-bar-right]');
      await triggerEvent(rightBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([maxSliderDate.subtract(diffTime, 'ms'), maxSliderDate], format)
      );
    });
    it('should work when min-slider-date and compatibility', async () => {
      const minSliderDate = d1.subtract(1, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          minSliderDate: minSliderDate.toDate(),
          transition: '',
          format,
          compatibility: true,
        },
      });

      const leftBtn = wrapper.find('[role=slider-bar-left]');
      await triggerEvent(leftBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([minSliderDate, minSliderDate.add(diffTime, 'ms')], format)
      );
    });
    it('should work when min-slider-date and compatibility', async () => {
      const minSliderDate = d1.subtract(1, 'day');
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          minSliderDate: minSliderDate.toDate(),
          transition: '',
          format,
          compatibility: true,
        },
      });

      const leftBtn = wrapper.find('[role=slider-bar-left]');
      await triggerEvent(leftBtn, 'click');
      const diffTime = calcDuration(d1, d2);
      expect(wrapper.find('.ux-calendar-slider-select-label').text()).toBe(
        getFormatDateStr([minSliderDate, minSliderDate.add(diffTime, 'ms')], format)
      );
    });
    it('should work max-slider-date - min-slider-date > diffTime and open datePicker', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(6, 'day').toDate(),
          minSliderDate: d1.subtract(6, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      expect(datePortal.html()).toMatchSnapshot();
    });

    it('should work max-slider-date - min-slider-date > diffTime and disabledDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          maxSliderDate: d2.add(6, 'day').toDate(),
          minSliderDate: d1.subtract(6, 'day').toDate(),
          transition: '',
          format,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      expect(datePortal.html()).toMatchSnapshot();
    });
  });

  describe('minSliderDate and maxSliderDate and disabledTime', () => {
    const d1 = mockDate.add(1, 'day');
    const d2 = mockDate.add(3, 'day');
    it('should work  disabledTime minutes = minSliderDate and minutes = maxSliderDate ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 14)
              .set('second', 30)
              .toDate(),
            d1
              .set('hour', 2)
              .set('minute', 14)
              .set('second', 35)
              .toDate(),
          ],
          maxSliderDate: d1
            .set('hour', 2)
            .set('minute', 14)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 14)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
    it('should work disabledTime minutes < minSliderDate and minutes > maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 14)
              .set('second', 30)
              .toDate(),
            d1
              .set('hour', 10)
              .set('minute', 45)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d1
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
    it('should work disabledTime startEnd !== endDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 14)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 10)
              .set('minute', 45)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });

    it('should work disabledTime hour < minSliderDate and hour > maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 1)
              .set('minute', 14)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 11)
              .set('minute', 45)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });

    it('should work disabledTime startDate minute = minSliderDate and endDate minute = maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 15)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 10)
              .set('minute', 35)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });

    it('should work disabledTime startDate > minSliderDate and endDate < maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 3)
              .set('minute', 15)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 9)
              .set('minute', 35)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });

    it('should work disabledTime only minSliderDate and minute = minSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 15)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 9)
              .set('minute', 35)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: null,
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
    it('should work disabledTime only minSliderDate and minute < minSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 1)
              .set('minute', 14)
              .set('second', 12)
              .toDate(),
            d2
              .set('hour', 9)
              .set('minute', 35)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: null,
          minSliderDate: d1
            .set('hour', 2)
            .set('minute', 15)
            .set('second', 20)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
    it('should work disabledTime only maxSliderDate and minute = maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 2)
              .set('minute', 15)
              .set('second', 30)
              .toDate(),
            d2
              .set('hour', 10)
              .set('minute', 35)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
    it('should work disabledTime only maxSliderDate and minute > maxSliderDate', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [
            d1
              .set('hour', 1)
              .set('minute', 14)
              .set('second', 12)
              .toDate(),
            d2
              .set('hour', 11)
              .set('minute', 40)
              .set('second', 30)
              .toDate(),
          ],
          maxSliderDate: d2
            .set('hour', 10)
            .set('minute', 35)
            .set('second', 40)
            .toDate(),
          transition: '',
          showTime: true,
        },
      });

      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      await triggerEvent(datePortal.find('.ux-calendar-time-picker-btn'), 'click');
      const ym = datePortal.findAll('.ux-calendar-ym-select');
      const timePickers = datePortal.findAll('.ux-calendar-time-picker');
      expect(
        `${ym.at(0).html()}${timePickers.at(0).html()}${ym.at(1).html()}${timePickers.at(1).html()}`
      ).toMatchSnapshot();
    });
  });
  describe('date-picker-props', () => {
    it('placement', async () => {
      const placement = 'topRight';
      const wrapper = await mountPicker({
        propsData: {
          datePickerProps: {
            placement,
          },
          transition: '',
        },
      });
      const { datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);

      expect(
        datePortal.find('.ux-calendar-picker-container-placement-topRight').exists
      ).toBeTruthy();
    });
  });

  describe('date-picker-events', () => {
    it('visible', async () => {
      const onOpenChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: [mockDate.toDate(), mockDate.add(5, 'day').toDate()],
          datePickerEvents: {
            'open-change': onOpenChange,
          },
          transition: '',
        },
      });

      await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(wrapper);
      expect(onOpenChange).toHaveBeenCalled();
      expect(onOpenChange).toHaveBeenCalledWith(true);
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
          value: [mockDate.toDate(), mockDate.add(5, 'day').toDate()],
          locale,
          transition: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const { dateWrapper, datePortal } = await getSelectAndRangeDatePickerAndOpenRangeDaterPicker(
        wrapper
      );

      expect(`${dateWrapper.html()}${datePortal.html()}`).toMatchSnapshot();
    });
  });
  describe('refresh-times', () => {
    it('init refresh-times []', async () => {
      const wrapper = await mountPicker({
        propsData: {
          refreshTimes: [],
          transition: '',
        },
      });

      const { selectPortal } = await openSelectPortal(wrapper);
      expect(selectPortal.find('.ux-select-dropdown-extra').exists()).toBeFalsy();
    });

    it.skip('init refresh-times [3s,10h]', async () => {
      const refreshTimes = [
        {
          value: '3s',
          label: '3s a',
        },
        {
          value: '10h',
          label: '10h b',
        },
      ];
      const wrapper = await mountPicker({
        propsData: {
          refreshTimes,
          transition: '',
        },
        attachToDocument: true,
      });
      const { selectPortal } = await openSelectPortal(wrapper);
      const refreshSelectWrapper = createWrapper(selectPortal).find(Select);
      const refreshSelectPortal = await openSelectPortal(refreshSelectWrapper);
      const refreshSelectItems = refreshSelectPortal.findAll('.ux-select-dropdown-menu-item');
      expect(refreshSelectItems.length).toBe(3);
      expect(refreshSelectItems.at(0).attributes('title')).toBe('off');
      expect(refreshSelectItems.at(1).attributes('title')).toBe(refreshTimes[0].value);
      expect(refreshSelectItems.at(2).attributes('title')).toBe(refreshTimes[1].value);
      wrapper.destroy();
    });

    it.skip('update refresh-times [4s, 2h]', async () => {
      const mockRefreshTimes = [
        {
          value: '4s',
          label: '4s a',
        },
        {
          value: '2h',
          label: '2h b',
        },
      ];
      const Test = {
        props: {
          refreshTimes: Array,
        },
        methods: {
          getPopupContainer() {
            return this.$refs.wrapRef;
          },
        },
        render() {
          const { refreshTimes, getPopupContainer } = this;

          const props = {
            value: [mockDate.toDate(), mockDate.add(2, 'day').toDate()],
            getPopupContainer,
            refreshTimes,
            transition: '',
          };
          return (
            <div class="wrap" ref="wrapRef">
              <SliderDatePicker {...{ props }} />
            </div>
          );
        },
      };
      const wrapper = mount(Test, {
        propsData: {
          refreshTimes: [],
          transition: '',
        },
      });
      await waitTime();

      wrapper.setProps({
        refreshTimes: mockRefreshTimes,
      });
      await waitTime();
      const { selectWrapper } = await openSelectPortal(wrapper);
      const refreshSelectWrapper = selectWrapper.find(Trigger);
      const c1 = refreshSelectWrapper.find(Select);
      const { selectPortal: refreshSelectPortal } = await openSelectPortal(c1);
      const refreshSelectItems = refreshSelectPortal.findAll('.ux-select-dropdown-menu-item');
      expect(refreshSelectItems.length).toBe(3);
      expect(refreshSelectItems.at(0).attributes('title')).toBe('off');
      expect(refreshSelectItems.at(1).attributes('title')).toBe(mockRefreshTimes[0].value);
      expect(refreshSelectItems.at(2).attributes('title')).toBe(mockRefreshTimes[1].value);
    });

    it('update refresh-times []', async () => {
      const refreshTimes = [
        {
          value: '3s',
          label: '3s a',
        },
        {
          value: '10h',
          label: '10h b',
        },
      ];
      const wrapper = await mountPicker({
        propsData: {
          refreshTimes,
          transition: '',
        },
      });

      wrapper.setProps({
        refreshTimes: [],
      });
      await waitTime();
      const { selectPortal } = await openSelectPortal(wrapper);
      expect(selectPortal.find('.ux-select-dropdown-extra').exists()).toBeFalsy();
    });
  });
  describe('force-refresh', () => {
    const d1 = mockDate.add(2, 'day');
    const d2 = mockDate.add(5, 'day');
    const refreshTimes = [
      {
        value: '500ms',
        label: '500ms a',
      },
    ];
    it('init force-refresh false', async () => {
      const onIntervalRefresh = jest.fn();
      await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          forceRefresh: false,
          refreshValue: refreshTimes[0].value,
          refreshTimes,
        },
        listeners: {
          'interval-refresh': onIntervalRefresh,
        },
      });
      await waitTime(1000);
      expect(onIntervalRefresh).not.toHaveBeenCalled();
    });

    it('force-refresh true', async () => {
      const onIntervalRefresh = jest.fn();
      await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          forceRefresh: true,
          refreshValue: refreshTimes[0].value,
          refreshTimes,
        },
        listeners: {
          'interval-refresh': onIntervalRefresh,
        },
      });
      await waitTime(1000);
      expect(onIntervalRefresh).toHaveBeenCalled();
    });
  });
  describe('render-refresh-label', () => {
    const d1 = mockDate.add(2, 'day');
    const d2 = mockDate.add(5, 'day');
    const refreshTimes = [
      {
        value: '500ms',
        label: '500ms a',
      },
    ];
    it('render-refresh-label is function', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          forceRefresh: true,
          refreshValue: refreshTimes[0].value,
          refreshTimes,
          renderRefreshLabel({ option }) {
            return option.value;
          },
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('render-refresh-label is slot-scope', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
          forceRefresh: true,
          refreshValue: refreshTimes[0].value,
          refreshTimes,
        },
        scopedSlots: {
          renderRefreshLabel({ option }) {
            return <span>test render {option.value}</span>;
          },
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('show-refresh-bar', () => {
    it('init show-refresh-bar true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showRefreshBar: true,
          transition: '',
        },
      });
      expect(wrapper.find('[role=slider-bar-refresh]').exists()).toBeTruthy();
    });
    it('init show-refresh-bar false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showRefreshBar: false,
          transition: '',
        },
      });
      expect(wrapper.find('[role=slider-bar-refresh]').exists()).toBeFalsy();
    });
    it('update show-refresh-bar false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showRefreshBar: true,
          transition: '',
        },
      });
      wrapper.setProps({
        showRefreshBar: false,
      });
      await waitTime();
      expect(wrapper.find('[role=slider-bar-refresh]').exists()).toBeFalsy();
    });

    it('update show-refresh-bar false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          showRefreshBar: false,
          transition: '',
        },
      });
      wrapper.setProps({
        showRefreshBar: true,
      });
      await waitTime();
      expect(wrapper.find('[role=slider-bar-refresh]').exists()).toBeTruthy();
    });
  });
  describe('events', () => {
    const d1 = mockDate.add(1, 'day');
    const d2 = mockDate.add(3, 'day');
    it('manual-refresh', async () => {
      const onManualRefresh = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: [d1.toDate(), d2.toDate()],
        },
        listeners: {
          'manual-refresh': onManualRefresh,
        },
      });
      const refreshBtn = wrapper.find('[role=slider-bar-refresh]');
      await triggerEvent(refreshBtn, 'click');
      expect(onManualRefresh).toHaveBeenCalled();
    });
  });
});
