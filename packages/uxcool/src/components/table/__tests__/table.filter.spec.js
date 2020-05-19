import {
  mountPickerFactory, triggerEvent, waitTime, mount
} from '@cloud-sn/v-test-utils';
import { getData, getFilterDropdownPortal } from './utils';
import Table from '../table';
import FilterDropdown from '../filterDropdown';

describe('Table.filter', () => {
  const mountPicker = mountPickerFactory(Table);
  const column = {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'A1',
        value: 'a1',
      },
      {
        text: 'B1',
        value: 'b1',
      },
      {
        text: 'C1',
        value: 'c1',
        children: [
          {
            text: 'CC1',
            value: 'cc1',
          },
          {
            text: 'CC2',
            value: 'cc2',
          },
        ],
      },
    ],
    onFilter(val, record) {
      return record.name.includes(val);
    },
  };
  const dataSource = getData();
  it('render filter', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [column],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('render filter dropdown', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [column],
      },
    });

    const portal = await getFilterDropdownPortal(wrapper);
    expect(portal.find('.ux-dropdown-content').html()).toMatchSnapshot();
  });

  it('render radio filter ', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [{ ...column, filterMultiple: false }],
      },
    });

    const portal = await getFilterDropdownPortal(wrapper);
    expect(portal.find('.ux-dropdown-content').html()).toMatchSnapshot();
  });

  it('render custom dropdown', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [
          {
            ...column,
            // eslint-disable-next-line
            filterDropdown(h) {
              return <div class="custom-filter"> this is custome filter </div>;
            },
          },
        ],
      },
    });

    const portal = await getFilterDropdownPortal(wrapper);
    expect(portal.find('.ux-dropdown-content').html()).toMatchSnapshot();
  });

  it('controlled filterDropdownVisible', async () => {
    const Test = {
      props: {
        filterDropdownVisible: {
          type: Boolean,
          default: false,
        },
      },
      render() {
        const { filterDropdownVisible } = this;
        const props = {
          value: dataSource,
          columns: [{ ...column, filterDropdownVisible }],
        };
        return <Table {...{ props }} />;
      },
    };
    const wrapper = mount(Test, {
      propsData: {
        filterDropdownVisible: true,
      },
    });
    await waitTime();
    const filterDropdown = wrapper.find(FilterDropdown);
    expect(filterDropdown.vm.dropdownVisible).toBeTruthy();

    wrapper.setProps({
      filterDropdownVisible: false,
    });
    await waitTime();
    expect(filterDropdown.vm.dropdownVisible).toBeFalsy();
  });

  it('filter keep selected keys when table value updated', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [{ ...column, filterDropdownVisible: true }],
      },
    });

    const filterDropdown = wrapper.find(FilterDropdown);
    expect(filterDropdown.vm.innerSelectedKeys).toEqual([]);

    const portal = await getFilterDropdownPortal(wrapper);

    const checkboxs = portal.findAll('.ux-dropdown-menu-item');

    await triggerEvent(checkboxs.at(0), 'click', 100);
    await triggerEvent(portal.find('.ux-table-filter-dropdown-link.confirm'), 'click');

    expect(filterDropdown.vm.innerSelectedKeys).toEqual(['a1']);

    wrapper.setProps({
      value: [...dataSource, { key: '4', name: 'test' }],
    });
    await waitTime();

    expect(filterDropdown.vm.innerSelectedKeys).toEqual(['a1']);
  });

  it('onFilterDropdownVisibleChange', async () => {
    const onFilterDropdownVisibleChange = jest.fn();
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [{ ...column, onFilterDropdownVisibleChange }],
      },
    });

    await getFilterDropdownPortal(wrapper);

    expect(onFilterDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  describe('filteredValue', () => {
    it.each([
      ['[]', 'John', []],
      ['null', 'John', null],
    ])('controlled filteredValue to %s', async (_, v1, v2) => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns: [{ ...column, filteredValue: [v1] }],
        },
      });

      expect(wrapper.findAll('.ux-table-tbody > .ux-table-row').length).toBe(1);
      wrapper.setProps({
        columns: [{ ...column, filteredValue: v2 }],
      });
      await waitTime();

      expect(wrapper.findAll('.ux-table-tbody > .ux-table-row').length).toBe(dataSource.length);
    });
  });

  describe('change', () => {
    it('fire change', async () => {
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

      const portal = await getFilterDropdownPortal(wrapper);
      const checkboxs = portal.findAll('.ux-dropdown-menu-item');

      await triggerEvent(checkboxs.at(0), 'click', 100);
      await triggerEvent(portal.find('.ux-table-filter-dropdown-link.confirm'), 'click');

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][1]).toEqual({ name: ['a1'] });
    });
    it('should not fire change without change anything', async () => {
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
      const portal = await getFilterDropdownPortal(wrapper);
      await triggerEvent(portal.find('.ux-table-filter-dropdown-link.clear'), 'click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('fire change when dropdown hidden', async () => {
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
      const portal = await getFilterDropdownPortal(wrapper);

      const checkboxs = portal.findAll('.ux-dropdown-menu-item');
      await triggerEvent(checkboxs.at(0), 'click', 100);
      await triggerEvent(wrapper.find('.ux-table-filter-icon'), 'click');

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][1]).toEqual({ name: ['a1'] });
    });
  });

  it('custom filter icon', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: [
          {
            ...column,
            // eslint-disable-next-line
            filterIcon(h) {
              return <span>filter</span>;
            },
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('pagination', () => {
    const pData = [];
    for (let i = 0; i < 30; i += 1) {
      pData.push({
        key: i,
        name: `a1-name-${i}`,
      });
    }
    it('should reset pagination after filter', async () => {
      const onChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: pData,
          columns: [column],
          pagination: true,
        },
        listeners: {
          change: onChange,
        },
      });

      const portal = await getFilterDropdownPortal(wrapper);
      const checkboxs = portal.findAll('.ux-dropdown-menu-item');
      await triggerEvent(checkboxs.at(0), 'click', 100);
      await triggerEvent(portal.find('.ux-table-filter-dropdown-link.confirm'), 'click');

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          current: 1,
          pageSize: 10,
        })
      );
      expect(onChange.mock.calls[0][1]).toEqual({ name: ['a1'] });
    });
  });
});
