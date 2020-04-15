import { mountPickerFactory, triggerEvent, waitTime } from '@suning/v-test-utils';
import Table from '../table';
import { getCols, getData, getSortRowName } from './utils';

describe('Table.pagination', () => {
  const mountPicker = mountPickerFactory(Table);
  const columns = getCols();
  const dataSource = getData();
  const expectPage1 = ['John Brown', 'Jim Green'];
  const expectPage2 = ['Joe Black'];
  it('render pagination', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: { pageSize: 2 },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('render pagination = true', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('pagination click', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: { pageSize: 2 },
      },
    });

    expect(getSortRowName(wrapper)).toEqual(expectPage1);

    await triggerEvent(wrapper.findAll('.ux-pagination-item').at(1), 'click');

    expect(getSortRowName(wrapper)).toEqual(expectPage2);
  });
  it('change pageSize', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: {
          pageSize: 2,
        },
      },
    });

    wrapper.setProps({
      pagination: { pageSize: 1 },
    });
    await waitTime();

    expect(getSortRowName(wrapper)).toEqual([dataSource[0].name]);
  });

  it('fire change event', async () => {
    const onPaginationChange = jest.fn();
    const onChange = jest.fn();
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: {
          pageSize: 2,
          onChange: onPaginationChange,
        },
      },
      listeners: {
        change: onChange,
      },
    });

    await triggerEvent(wrapper.findAll('.ux-pagination-item').at(1), 'click');

    expect(onPaginationChange).toHaveBeenCalledWith(2, 2);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toEqual(
      expect.objectContaining({ current: 2, pageSize: 2, position: 'bottom' })
    );
  });

  describe('position', () => {
    it('top', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          pagination: {
            pageSize: 2,
            position: 'top',
          },
        },
      });
      const elements = wrapper.findAll('.ux-spin-container > *');
      expect(elements.length).toBe(2);
      expect(elements.at(0).classes('ux-pagination')).toBeTruthy();
    });
    it('bottom', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          pagination: {
            pageSize: 2,
            position: 'bottom',
          },
        },
      });
      const elements = wrapper.findAll('.ux-spin-container > *');
      expect(elements.length).toBe(2);
      expect(elements.at(1).classes('ux-pagination')).toBeTruthy();
    });
    it('both', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          pagination: {
            pageSize: 2,
            position: 'both',
          },
        },
      });
      const elements = wrapper.findAll('.ux-spin-container > *');
      expect(elements.length).toBe(3);
      expect(elements.at(0).classes('ux-pagination')).toBeTruthy();
      expect(elements.at(2).classes('ux-pagination')).toBeTruthy();
    });
  });
  it('support current', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        pagination: {
          pageSize: 2,
          current: 2,
        },
      },
    });

    expect(wrapper.find('.ux-pagination-item-active').attributes('title')).toBe('2');
  });
});
