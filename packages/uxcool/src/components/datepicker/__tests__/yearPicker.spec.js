import {
  mountPickerFactory, triggerEvent, getPortal, waitTime
} from '@cloud-sn/v-test-utils';
import dayjs from 'dayjs';
import YearPicker from '../yearPicker';
import localeEN from '../locale/en_US';

describe('YearPicker', () => {
  const mountPicker = mountPickerFactory(YearPicker);
  const mockDate = dayjs('2019-05-03');
  const format = 'YYYY';
  it('create', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: mockDate.toDate(),
        transitionName: '',
      },
    });

    await triggerEvent(wrapper, 'click');

    const portal = await getPortal(wrapper);

    const input = wrapper.find('.ux-input');

    expect(input.element.value).toBe(mockDate.format(format));

    expect(portal.find('.ux-calendar-year-panel-selected-cell').exists()).toBeTruthy();
  });

  describe('value', () => {
    it('init', async () => {
      const initValue = mockDate.subtract(1, 'year');
      const wrapper = await mountPicker({
        propsData: {
          value: initValue.toDate(),
          format,
          transitionName: '',
        },
      });

      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(initValue.format(format));
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.subtract(1, 'year').toDate(),
          format,
          transitionName: '',
        },
      });

      const updateValue = mockDate.subtract(3, 'year');
      wrapper.setProps({
        value: updateValue.toDate(),
      });
      await waitTime();

      const input = wrapper.find('.ux-input');
      expect(input.element.value).toBe(updateValue.format(format));
    });
  });

  describe('format', () => {
    const customFormat = 'YY';
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

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(format));

      wrapper.setProps({
        format: customFormat,
      });
      await waitTime();

      expect(wrapper.find('.ux-input').element.value).toBe(mockDate.format(customFormat));
    });
  });

  describe('disabledYear', () => {
    function disabledYearFactory(disabledMapping) {
      return (date) => {
        const current = dayjs(date);

        return current.get('year') in disabledMapping;
      };
    }
    it('init and disabled 2013, 2015,2019', async () => {
      const disabledYear = disabledYearFactory({
        2013: 1,
        2015: 1,
        2019: 1,
      });
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.set('year', 2010).toDate(),
          disabledYear,
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      expect(portal.html()).toMatchSnapshot();
    });

    it('update and disabled 2012, 2014, 2018', async () => {
      const disabledYear = disabledYearFactory({
        2012: 1,
        2014: 1,
        2018: 1,
      });
      const wrapper = await mountPicker({
        propsData: {
          value: mockDate.set('year', 2010).toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);

      wrapper.setProps({
        disabledYear,
      });

      await waitTime();
      expect(portal.html()).toMatchSnapshot();
    });
  });

  describe('locale', () => {
    it.each([
      ['locale.lang', localeEN.lang],
      ['locale', localeEN],
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

  describe('decade', () => {
    const mockValue = mockDate.set('year', 2016);
    it('prev decade click', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockValue.toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-year-panel-prev-decade-btn'), 'click');

      expect(
        portal
          .findAll('.ux-calendar-year-panel-cell')
          .at(1)
          .attributes('title')
      ).toBe('2000');
    });
    it('next decade click', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockValue.toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');

      const portal = await getPortal(wrapper);

      await triggerEvent(portal.find('.ux-calendar-year-panel-next-decade-btn'), 'click');

      expect(
        portal
          .findAll('.ux-calendar-year-panel-cell')
          .at(1)
          .attributes('title')
      ).toBe('2020');
    });

    it('should go to prev panel when select first year', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockValue.toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-year-panel-last-decade-cell'), 'click');
      expect(
        portal
          .findAll('.ux-calendar-year-panel-cell')
          .at(1)
          .attributes('title')
      ).toBe('2000');
    });
    it('should go to next panel when select last year', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: mockValue.toDate(),
          transitionName: '',
        },
      });

      await triggerEvent(wrapper, 'click');
      const portal = await getPortal(wrapper);
      await triggerEvent(portal.find('.ux-calendar-year-panel-next-decade-cell'), 'click');
      expect(
        portal
          .findAll('.ux-calendar-year-panel-cell')
          .at(1)
          .attributes('title')
      ).toBe('2020');
    });
  });
});
