import { mountPickerFactory, triggerEvent, waitTime } from '@suning/v-test-utils';
import Table from '../table';
import { getSortRowName } from './utils';

describe('Table.sort', () => {
  const mountPicker = mountPickerFactory(Table);
  const sortFn = (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0);
  const dataSource = [
    {
      key: '1',
      name: 'John',
    },
    {
      key: '2',
      name: 'Tom',
    },
    {
      key: '3',
      name: 'Jim',
    },
    {
      key: '4',
      name: 'Lucy',
    },
  ];

  const column = {
    key: '$name',
    title: 'Name',
    dataIndex: 'name',
    sorter: sortFn,
  };

  const expectAscend = ['John', 'Jim', 'Lucy', 'Tom'];
  const expectDescend = ['Tom', 'Lucy', 'John', 'Jim'];

  it('render sorter', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [column],
      },
    });

    expect(wrapper.find('.ux-table-thead').html()).toMatchSnapshot();
  });

  it('default ascend', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [{ ...column, defaultSortOrder: 'ascend' }],
      },
    });

    expect(getSortRowName(wrapper)).toEqual(expectAscend);
  });
  it('default descend', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [{ ...column, defaultSortOrder: 'descend' }],
      },
    });

    expect(getSortRowName(wrapper)).toEqual(expectDescend);
  });

  it('sort records', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [column],
      },
    });
    await triggerEvent(wrapper.find('.ux-table-column-sorter-up'), 'click');
    expect(getSortRowName(wrapper)).toEqual(expectAscend);

    await triggerEvent(wrapper.find('.ux-table-column-sorter-down'), 'click');
    expect(getSortRowName(wrapper)).toEqual(expectDescend);
  });

  describe('sortOrder', () => {
    it('init', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns: [{ ...column, sortOrder: 'ascend' }],
        },
      });

      expect(getSortRowName(wrapper)).toEqual(expectAscend);
    });
    it('update', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns: [column],
        },
      });
      expect(getSortRowName(wrapper)).toEqual(['John', 'Tom', 'Jim', 'Lucy']);

      wrapper.setProps({
        columns: [{ ...column, sortOrder: 'descend' }],
      });

      await waitTime();

      expect(getSortRowName(wrapper)).toEqual(expectDescend);
    });
  });

  it('fire event', async () => {
    const onChange = jest.fn();
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [column],
      },
      listeners: {
        change: onChange,
      },
    });

    await triggerEvent(wrapper.find('.ux-table-column-sorter-up'), 'click');
    expect(onChange.mock.calls.length).toBe(1);
    const sorter0 = onChange.mock.calls[0][2];
    expect(sorter0.column.dataIndex).toBe('name');
    expect(sorter0.order).toBe('ascend');
    expect(sorter0.field).toBe('name');
    expect(sorter0.columnKey).toBe('$name');

    await triggerEvent(wrapper.find('.ux-table-column-sorter-down'), 'click');
    expect(onChange.mock.calls.length).toBe(2);
    const sorter1 = onChange.mock.calls[1][2];
    expect(sorter1.column.dataIndex).toBe('name');
    expect(sorter1.order).toBe('descend');
    expect(sorter1.field).toBe('name');
    expect(sorter1.columnKey).toBe('$name');

    await triggerEvent(wrapper.find('.ux-table-column-sorter-down'), 'click');
    expect(onChange.mock.calls.length).toBe(3);
    const sorter2 = onChange.mock.calls[2][2];
    expect(sorter2.column).toBe(undefined);
    expect(sorter2.order).toBe(undefined);
    expect(sorter2.field).toBe(undefined);
    expect(sorter2.columnKey).toBe(undefined);
  });

  it('group columns sort', async () => {
    const columns = [
      {
        key: 'group',
        title: 'Group',
        children: [
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: sortFn,
            sortOrder: 'descend',
          },
          {
            key: 'age',
            title: 'Age',
            dataIndex: 'age',
          },
        ],
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John',
        age: 32,
      },
      {
        key: '2',
        name: 'Tom',
        age: 24,
      },
      {
        key: '3',
        name: 'Jim',
        age: 50,
      },
      {
        key: '4',
        name: 'Lucy',
        age: 18,
      },
    ];
    const wrapper = await mountPicker({
      propsData: {
        value: data,
        columns,
      },
    });

    expect(getSortRowName(wrapper)).toEqual(expectDescend);
  });
});
