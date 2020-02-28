import { mountPickerFactory, waitTime, triggerEvent } from '@suning/v-test-utils';
import Table from '../table';
import Checkbox from '../checkbox.vue';
import CheckboxAll from '../checkboxAll.vue';
import { getCols, getData, getCheckboxDropdownPortal } from './utils';

describe('Table.rowSelection', () => {
  const mountPicker = mountPickerFactory(Table);
  const columns = getCols();
  const dataSource = getData();

  function replaceStyle(html) {
    return html.replace(/style="[^"]+"/g, '');
  }
  it('checkbox select', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        rowSelection: {},
      },
    });

    const checkboxs = wrapper.findAll('.ux-checkbox-input');

    expect(checkboxs.length).toBe(dataSource.length + 1);
    await triggerEvent(checkboxs.at(0), 'click');

    expect(wrapper.vm.selectedRowKeys).toEqual(['1', '2', '3']);

    await triggerEvent(checkboxs.at(2), 'click');
    expect(wrapper.vm.selectedRowKeys).toEqual(['1', '3']);

    await triggerEvent(checkboxs.at(2), 'click');
    expect(wrapper.vm.selectedRowKeys).toEqual(['1', '3', '2']);
  });

  it('radio select', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        rowSelection: {
          type: 'radio',
        },
      },
    });
    const radios = wrapper.findAll('.ux-radio-input');
    expect(radios.length).toBe(dataSource.length);

    await triggerEvent(radios.at(1), 'click');
    expect(wrapper.vm.selectedRowKeys).toEqual(['2']);

    await triggerEvent(radios.at(2), 'click');
    expect(wrapper.vm.selectedRowKeys).toEqual(['3']);
  });
  describe('fixed', () => {
    it('fixed selection on the left', async () => {
      const cols = getCols();
      cols[0].fixed = true;
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns: cols,
          rowSelection: {
            fixed: true,
          },
        },
      });

      expect(replaceStyle(wrapper.html())).toMatchSnapshot();
    });
    it('fixed selection when other column fixed', async () => {
      const cols = getCols();
      cols[0].fixed = true;
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          rowSelection: {},
          columns: [
            {
              key: 'name',
              title: 'Name',
              align: 'center',
              dataIndex: 'name',
              fixed: true,
            },
          ],
        },
      });
      expect(replaceStyle(wrapper.html())).toMatchSnapshot();
    });
  });

  describe('getCheckboxProps', () => {
    it('disabled', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            getCheckboxProps(record) {
              return {
                disabled: record.key === '2',
              };
            },
          },
        },
      });

      const checkboxs = wrapper.findAll(Checkbox);
      expect(checkboxs.at(0).props().disabled).toBe(false);
      expect(checkboxs.at(1).props().disabled).toBe(true);
      expect(checkboxs.at(2).props().disabled).toBe(false);
    });

    it('defaultChecked', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            getCheckboxProps(record) {
              return {
                defaultChecked: record.key === '1',
              };
            },
          },
        },
      });

      const checkboxs = wrapper.findAll(Checkbox);
      expect(checkboxs.at(0).vm.checked).toBe(true);
      expect(checkboxs.at(1).vm.checked).toBe(false);
      expect(checkboxs.at(2).vm.checked).toBe(false);
    });
  });

  describe('selectedRowKeys', () => {
    it('update selectedRowKeys', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            selectedRowKeys: ['2'],
          },
        },
      });

      expect(wrapper.vm.selectedRowKeys).toEqual(['2']);

      wrapper.setProps({
        rowSelection: {
          selectedRowKeys: ['1'],
        },
      });

      await waitTime();

      expect(wrapper.vm.selectedRowKeys).toEqual(['1']);
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const onChange = jest.fn();

      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            onChange,
          },
        },
      });

      const checkboxs = wrapper.findAll(Checkbox);
      await triggerEvent(checkboxs.at(0), 'click');

      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual(['1']);
    });

    it('onSelect', async () => {
      const onSelect = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            onSelect,
          },
        },
      });

      const checkboxs = wrapper.findAll(Checkbox);
      await triggerEvent(checkboxs.at(1), 'click');

      expect(onSelect).toHaveBeenCalled();
      expect(onSelect.mock.calls[0][0].key).toBe('2');
    });

    it('selectAll', async () => {
      const onSelectAll = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            onSelectAll,
          },
        },
      });

      const checkboxAll = wrapper.find(CheckboxAll).find('.ux-checkbox-input');
      await triggerEvent(checkboxAll, 'click');
      expect(onSelectAll).toHaveBeenCalled();
      expect(onSelectAll.mock.calls[0][0]).toBeTruthy();
      expect(onSelectAll.mock.calls[0][3]).toEqual(['1', '2', '3']);

      await triggerEvent(checkboxAll, 'click');
      expect(onSelectAll.mock.calls[1][0]).toBeFalsy();
      expect(onSelectAll.mock.calls[1][3]).toEqual([]);
    });

    it('selectInvert', async () => {
      const onSelectInvert = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            selections: true,
            onSelectInvert,
          },
        },
      });

      const portal = await getCheckboxDropdownPortal(wrapper);

      const menuItems = portal.findAll('.ux-dropdown-menu-item > div');
      await triggerEvent(menuItems.at(1), 'click');
      expect(onSelectInvert).toHaveBeenCalled();
      expect(onSelectInvert.mock.calls[0][1]).toEqual(['1', '2', '3']);
    });
  });

  describe('selections', () => {
    it('custom selections', async () => {
      const onOddSelect = jest.fn();
      const onEvenSelect = jest.fn();
      const selections = [
        {
          key: 'odd',
          text: 'Select Odd value',
          onSelect: onOddSelect,
        },
        {
          key: 'even',
          text: 'Select Even value',
          onSelect: onEvenSelect,
        },
      ];
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            selections,
          },
        },
      });
      const portal = await getCheckboxDropdownPortal(wrapper);
      const menuItems = portal.findAll('.ux-dropdown-menu-item > div');

      expect(menuItems.length).toBe(4);
      await triggerEvent(menuItems.at(2), 'click');
      expect(onOddSelect).toHaveBeenCalled();
      expect(onOddSelect).toHaveBeenCalledWith(['1', '2', '3']);

      await triggerEvent(menuItems.at(3), 'click');
      expect(onEvenSelect).toHaveBeenCalled();
      expect(onEvenSelect).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('hide-default-selections', async () => {
      const selections = [
        {
          key: 'odd',
          text: 'Select Odd value',
          onSelect() {},
        },
        {
          key: 'even',
          text: 'Select Even value',
          onSelect() {},
        },
      ];
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            selections,
            hideDefaultSelections: true,
          },
        },
      });
      const portal = await getCheckboxDropdownPortal(wrapper);
      const menuItems = portal.findAll('.ux-dropdown-menu-item > div');

      expect(menuItems.length).toBe(2);
    });

    it('handle custom selections onSelect correctly when hide-default-selections', async () => {
      const onOddSelect = jest.fn();
      const onEvenSelect = jest.fn();
      const selections = [
        {
          key: 'odd',
          text: 'Select Odd value',
          onSelect: onOddSelect,
        },
        {
          key: 'even',
          text: 'Select Even value',
          onSelect: onEvenSelect,
        },
      ];
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          rowSelection: {
            hideDefaultSelections: true,
            selections,
          },
        },
      });
      const portal = await getCheckboxDropdownPortal(wrapper);
      const menuItems = portal.findAll('.ux-dropdown-menu-item > div');

      await triggerEvent(menuItems.at(0), 'click');
      expect(onOddSelect).toHaveBeenCalled();
      expect(onOddSelect).toHaveBeenCalledWith(['1', '2', '3']);

      await triggerEvent(menuItems.at(1), 'click');
      expect(onEvenSelect).toHaveBeenCalled();
      expect(onEvenSelect).toHaveBeenCalledWith(['1', '2', '3']);
    });
  });
});
