import {
  mountPickerFactory,
  waitTime,
  triggerEvent,
  getVueCreateElement,
} from '@cloud-sn/v-test-utils';
import VTable from '@cloud-sn/v-table/src/table';
import Table from '../table';
import { getCols, getData } from './utils';

describe('Table.main', () => {
  jest.setTimeout(50000000);
  const mountPicker = mountPickerFactory(Table);
  const columns = getCols();
  const dataSource = getData();
  it('create', async () => {
    const wrapper = await mountPicker({
      propsData: {
        columns,
        value: dataSource,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  describe('size', () => {
    it.each(['default', 'middle', 'small'])('%s', async (size) => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          size,
        },
      });

      expect(wrapper.find(`.ux-table-${size}`).exists()).toBeTruthy();
    });
  });
  describe('bordered', () => {
    it('init bordered = false ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
        },
      });
      expect(wrapper.find('.ux-table-bordered').exists()).toBeFalsy();
    });
    it('bordered = true ', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          bordered: true,
        },
      });
      expect(wrapper.find('.ux-table-bordered').exists()).toBeTruthy();
    });
    it('update bordered = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          bordered: false,
        },
      });

      wrapper.setProps({
        bordered: true,
      });
      await waitTime();

      expect(wrapper.find('.ux-table-bordered').exists()).toBeTruthy();
    });
    it('update bordered = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          bordered: true,
        },
      });

      wrapper.setProps({
        bordered: false,
      });
      await waitTime();

      expect(wrapper.find('.ux-table-bordered').exists()).toBeFalsy();
    });
  });
  describe('pagination', () => {
    // TODO:
  });
  describe('loading', () => {
    it('loading = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          loading: false,
        },
      });

      expect(wrapper.find('.ux-table-loading').exists()).toBeFalsy();
    });

    it('loading = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          loading: true,
        },
      });

      expect(wrapper.find('.ux-table-loading').exists()).toBeTruthy();
    });
    it('update loading = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          loading: false,
        },
      });
      wrapper.setProps({
        loading: true,
      });
      await waitTime();

      expect(wrapper.find('.ux-table-loading').exists()).toBeTruthy();
    });
    it('update loading = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          loading: true,
        },
      });
      wrapper.setProps({
        loading: false,
      });
      await waitTime();
      expect(wrapper.find('.ux-table-loading').exists()).toBeFalsy();
    });

    it('loading = {spinning:true, spinClass: "t-spin"}', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          loading: {
            spinning: true,
            spinClass: 't-spin',
          },
        },
      });
      expect(wrapper.find('.t-spin').exists()).toBeTruthy();
      expect(wrapper.find('.ux-table-loading').exists()).toBeTruthy();
    });
    it('update loading = {spinning:true, spinClass: "t-spin"}', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
        },
      });
      expect(wrapper.find('.t-spin').exists()).toBeFalsy();
      expect(wrapper.find('.ux-table-loading').exists()).toBeFalsy();
      wrapper.setProps({
        loading: {
          spinning: true,
          spinClass: 't-spin',
        },
      });
      await waitTime();
      expect(wrapper.find('.t-spin').exists()).toBeTruthy();
      expect(wrapper.find('.ux-table-loading').exists()).toBeTruthy();
    });
  });
  describe('row-class', () => {
    it('row-class = "t-row-class"', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          rowClass: 't-row-class',
        },
      });
      expect(wrapper.findAll('tr.t-row-class').length).toBe(dataSource.length);
    });

    it('row-class is function', async () => {
      const rowClassFn = jest.fn(() => 't-fn-r-class');
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          rowClass: rowClassFn,
        },
      });
      expect(rowClassFn).toHaveBeenCalled();
      expect(wrapper.findAll('tr.t-fn-r-class').length).toBe(dataSource.length);
    });
  });
  describe('on-row', () => {
    it('bind className', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          onRow() {
            return {
              className: 't-on-row-class',
            };
          },
        },
      });
      expect(wrapper.findAll('tr.t-on-row-class').length).toBe(dataSource.length);
    });
    it('bind click event', async () => {
      const onRowClick = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          onRow() {
            return {
              className: 't-on-row-click',
              on: {
                click: onRowClick,
              },
            };
          },
        },
      });

      await triggerEvent(wrapper.find('tr.t-on-row-click'), 'click');
      expect(onRowClick).toHaveBeenCalled();
    });
    it('bind data-test attr', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          onRow() {
            return {
              'data-test': 'test-v',
            };
          },
        },
      });

      expect(wrapper.findAll('[data-test]').length).toBe(dataSource.length);
    });
  });
  describe('on-header-row', () => {
    it('bind className', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          onHeaderRow() {
            return {
              className: 't-header-row-class',
            };
          },
        },
      });

      expect(wrapper.findAll('.t-header-row-class').length).toBe(1);
    });
    it('bind data-t1 attr', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          onHeaderRow() {
            return {
              'data-t1': 't1',
            };
          },
        },
      });

      expect(wrapper.findAll('[data-t1]').length).toBe(1);
    });
  });
  describe('hide-header', () => {
    it('hide-header=false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          hideHeader: false,
        },
      });

      expect(wrapper.find('.ux-table-thead').exists()).toBeTruthy();
    });
    it('hide-header=true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          hideHeader: true,
        },
      });

      expect(wrapper.find('.ux-table-thead').exists()).toBeFalsy();
    });
    it('update hide-header=true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          hideHeader: false,
        },
      });

      wrapper.setProps({
        hideHeader: true,
      });
      await waitTime();
      expect(wrapper.find('.ux-table-thead').exists()).toBeFalsy();
    });
    it('update hide-header=false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          hideHeader: true,
        },
      });

      wrapper.setProps({
        hideHeader: false,
      });
      await waitTime(100);
      expect(wrapper.find('.ux-table-thead').exists()).toBeTruthy();
    });
  });
  describe('title', () => {
    const title = 'this is test title';
    it('title prop', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          title,
        },
      });
      expect(wrapper.find('.ux-table-title').text()).toBe(title);
    });
    it('title slot', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
        },
        slots: {
          title: `<div class="t-title">${title}</div>`,
        },
      });
      expect(
        wrapper
          .find('.ux-table-title')
          .find('.t-title')
          .text()
      ).toBe(title);
    });
    it('title scopedSlots', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
        },
        scopedSlots: {
          title() {
            return <a>{title}</a>;
          },
        },
      });
      expect(
        wrapper
          .find('.ux-table-title')
          .find('a')
          .text()
      ).toBe(title);
    });
  });
  describe('footer', () => {
    const footer = 'this is footer test';
    it('footer prop', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          footer,
        },
      });

      expect(wrapper.find('.ux-table-footer').text()).toBe(footer);
    });
    it('footer slot', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
        },
        slots: {
          footer: `<div class="t-test">${footer}</div>`,
        },
      });

      expect(
        wrapper
          .find('.ux-table-footer')
          .find('.t-test')
          .text()
      ).toBe(footer);
    });
    it('footer scopedSlot', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
        },
        scopedSlots: {
          footer() {
            return <a>{footer}</a>;
          },
        },
      });
      expect(
        wrapper
          .find('.ux-table-footer')
          .find('a')
          .text()
      ).toBe(footer);
    });
  });
  describe('empty-text', () => {
    const emptyText = 'this is empty text';
    it('empty-text prop', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [],
          columns,
          emptyText,
        },
      });

      expect(wrapper.find('.ux-table-placeholder').text()).toBe(emptyText);
    });
    it('empty slot', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: [],
          columns,
        },
        slots: {
          empty: `<div class="t-test">${emptyText}</div>`,
        },
      });

      expect(
        wrapper
          .find('.ux-table-placeholder')
          .find('.t-test')
          .text()
      ).toBe(emptyText);
    });
  });
  describe('columns', () => {
    // TODO: columns
  });
  describe('expand-icon-as-cell', () => {
    it('init expand-icon-as-cell = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandIconAsCell: false,
          expandedRowRender() {
            return 'test';
          },
        },
      });

      expect(wrapper.find('.ux-table-row').findAll('td').length).toBe(columns.length);
      expect(wrapper.find('.ux-table-row-expand-icon-cell').exists()).toBeFalsy();
    });

    it('init expand-icon-as-cell = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandIconAsCell: true,
          expandedRowRender() {
            return 'test';
          },
        },
      });

      expect(wrapper.find('.ux-table-row').findAll('td').length).toBe(columns.length + 1);
      expect(wrapper.find('.ux-table-row-expand-icon-cell').exists()).toBeTruthy();
    });

    it('update expand-icon-as-cell = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandIconAsCell: false,
        },
      });

      wrapper.setProps({
        expandedRowRender() {
          return 'test';
        },
        expandIconAsCell: true,
      });
      await waitTime();
      expect(wrapper.find('.ux-table-row').findAll('td').length).toBe(columns.length + 1);
      expect(wrapper.find('.ux-table-row-expand-icon-cell').exists()).toBeTruthy();
    });

    it('update expand-icon-as-cell = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandIconAsCell: true,
          expandedRowRender() {
            return 'test';
          },
        },
      });

      wrapper.setProps({
        expandIconAsCell: false,
      });
      await waitTime();
      expect(wrapper.find('.ux-table-row').findAll('td').length).toBe(columns.length);
      expect(wrapper.find('.ux-table-row-expand-icon-cell').exists()).toBeFalsy();
    });
  });
  describe('use-fixed-header', () => {
    it('init use-fixed-header = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          useFixedHeader: false,
        },
      });

      expect(wrapper.find('.ux-table-fixed-header').exists()).toBeFalsy();
      expect(wrapper.find('.ux-table-main-table').findAll('table').length).toBe(1);
    });
    it('init use-fixed-header = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          useFixedHeader: true,
        },
      });

      expect(wrapper.find('.ux-table-fixed-header').exists()).toBeTruthy();
      expect(wrapper.find('.ux-table-main-table').findAll('table').length).toBe(2);
    });
    it('update use-fixed-header = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          useFixedHeader: false,
        },
      });

      wrapper.setProps({
        useFixedHeader: true,
      });
      await waitTime();

      expect(wrapper.find('.ux-table-fixed-header').exists()).toBeTruthy();
      expect(wrapper.find('.ux-table-main-table').findAll('table').length).toBe(2);
    });
    it('update use-fixed-header = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          useFixedHeader: true,
        },
      });

      wrapper.setProps({
        useFixedHeader: false,
      });

      await waitTime();
      expect(wrapper.find('.ux-table-fixed-header').exists()).toBeFalsy();
      expect(wrapper.find('.ux-table-main-table').findAll('table').length).toBe(1);
    });
  });
  describe('bodyStyle', () => {
    it('body-style={"text-align":"center"}', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          bodyStyle: { 'text-align': 'center' },
        },
      });

      expect(wrapper.find('.ux-table-body').attributes('style')).toBe('text-align: center;');
    });
  });
  describe('scroll', () => {
    // TODO: scroll
  });
  describe('row-key', () => {
    const data = [
      {
        k1: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        k1: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        k1: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    it('row-key default "key"', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
        },
      });
      const rows = wrapper.findAll('.ux-table-row');
      expect(rows.wrappers[0].vm.record.$$_key).toBe(dataSource[0].key);
      expect(rows.wrappers[1].vm.record.$$_key).toBe(dataSource[1].key);
      expect(rows.wrappers[2].vm.record.$$_key).toBe(dataSource[2].key);
    });
    it('row-key=k1', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: data,
          rowKey: 'k1',
        },
      });

      const rows = wrapper.findAll('.ux-table-row');
      expect(rows.wrappers[0].vm.record.$$_key).toBe(data[0].k1);
      expect(rows.wrappers[1].vm.record.$$_key).toBe(data[1].k1);
      expect(rows.wrappers[2].vm.record.$$_key).toBe(data[2].k1);
    });
    it('row-key is function', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: data,
          rowKey(record) {
            return record.k1;
          },
        },
      });
      const rows = wrapper.findAll('.ux-table-row');
      expect(rows.wrappers[0].vm.record.$$_key).toBe(data[0].k1);
      expect(rows.wrappers[1].vm.record.$$_key).toBe(data[1].k1);
      expect(rows.wrappers[2].vm.record.$$_key).toBe(data[2].k1);
    });
  });
  describe('indent-size', () => {
    const mockTreeData = [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    it('indent-size = 20', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: mockTreeData,
          indentSize: 20,
        },
      });
      expect(wrapper.find('.ux-table-row-indent.indent-level-1').attributes('style')).toBe(
        'padding-left: 20px;'
      );
    });
  });
  describe('child-col-name', () => {
    const mockTreeData = [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        childs: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    it('child-col-name = childs', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: mockTreeData,
          childColName: 'childs',
        },
      });
      expect(wrapper.find('.ux-table-row-indent.indent-level-1').exists()).toBeTruthy();
    });
  });
  describe('expand-row-by-click', () => {
    it('expand-row-by-click = false', async () => {
      const onExpand = jest.fn();
      const onExpandedRowChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandRowByClick: false,
          expandedRowRender() {
            return 'test';
          },
        },
        listeners: {
          expand: onExpand,
          'expanded-row-change': onExpandedRowChange,
        },
      });

      await triggerEvent(wrapper.find('.ux-table-row'), 'click');

      expect(onExpandedRowChange).not.toHaveBeenCalled();
      expect(onExpand).not.toHaveBeenCalled();
    });
    it('expand-row-by-click = true', async () => {
      const onExpand = jest.fn();
      const onExpandedRowChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandRowByClick: true,
          expandedRowRender() {
            return 'test';
          },
        },
        listeners: {
          expand: onExpand,
          'expanded-row-change': onExpandedRowChange,
        },
      });

      await triggerEvent(wrapper.find('.ux-table-row'), 'click');

      expect(onExpandedRowChange).toHaveBeenCalled();
      expect(onExpand).toHaveBeenCalled();
    });

    it('update expand-row-by-click = true', async () => {
      const onExpand = jest.fn();
      const onExpandedRowChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandRowByClick: false,
          expandedRowRender() {
            return 'test';
          },
        },
        listeners: {
          expand: onExpand,
          'expanded-row-change': onExpandedRowChange,
        },
      });

      wrapper.setProps({
        expandRowByClick: true,
      });

      await waitTime();
      await triggerEvent(wrapper.find('.ux-table-row'), 'click');

      expect(onExpandedRowChange).toHaveBeenCalled();
      expect(onExpand).toHaveBeenCalled();
    });
    it('update expand-row-by-click = false', async () => {
      const onExpand = jest.fn();
      const onExpandedRowChange = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandRowByClick: true,
          expandedRowRender() {
            return 'test';
          },
        },
        listeners: {
          expand: onExpand,
          'expanded-row-change': onExpandedRowChange,
        },
      });

      wrapper.setProps({
        expandRowByClick: false,
      });

      await waitTime();
      await triggerEvent(wrapper.find('.ux-table-row'), 'click');

      expect(onExpandedRowChange).not.toHaveBeenCalled();
      expect(onExpand).not.toHaveBeenCalled();
    });
  });
  describe('expand-icon-col-index', () => {
    // TODO:expand-icon-col-index
  });
  describe('expandedRowRender prop and expand scopedSlots', () => {
    const mockText = 'expand render test text';
    it('expanded-row-render is function', async () => {
      const h = getVueCreateElement();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandedRowRender() {
            return h('p', { class: 'expanded-render-test' }, [mockText]);
          },
        },
      });

      expect(wrapper.find('.expanded-render-test').exists()).toBeTruthy();
      expect(wrapper.find('.expanded-render-test').text()).toBe(mockText);
    });
    it('expand scopedSlots', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
        },
        scopedSlots: {
          expand() {
            return <p class="expand-slot">{mockText}</p>;
          },
        },
      });
      expect(wrapper.find('.expand-slot').exists()).toBeTruthy();
      expect(wrapper.find('.expand-slot').text()).toBe(mockText);
    });
  });
  describe('expanded-row-class-name', () => {
    it('expanded-row-class-name', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandedRowClassName() {
            return 't-expanded-row-class';
          },
          expandedRowRender() {
            return 'expanded test render';
          },
        },
      });

      expect(wrapper.find('.ux-table-expanded-row.t-expanded-row-class').exists()).toBeTruthy();
    });
  });
  describe('expanded-row-keys', () => {
    it('expanded-row-keys', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandedRowKeys: ['2', '3'],
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });

      const rows = wrapper.findAll('.ux-table-expanded-row');
      expect(
        rows
          .at(0)
          .attributes('style')
          .indexOf('display: none;') === -1
      ).toBeFalsy();
      expect((rows.at(1).attributes('style') || '').indexOf('display: none;') === -1).toBeTruthy();
      expect((rows.at(2).attributes('style') || '').indexOf('display: none;') === -1).toBeTruthy();
    });

    it('updated expanded-row-keys', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandedRowKeys: ['2', '3'],
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });

      wrapper.setProps({
        expandedRowKeys: ['1'],
      });
      await waitTime();
      const rows = wrapper.findAll('.ux-table-expanded-row');
      expect(
        rows
          .at(0)
          .attributes('style')
          .indexOf('display: none;') === -1
      ).toBeTruthy();
      expect((rows.at(1).attributes('style') || '').indexOf('display: none;') === -1).toBeFalsy();
      expect((rows.at(2).attributes('style') || '').indexOf('display: none;') === -1).toBeFalsy();
    });
  });
  describe('expand-all-rows', () => {
    it('expand-all-rows', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandAllRows: true,
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });

      const rows = wrapper.findAll('.ux-table-expanded-row');
      expect((rows.at(0).attributes('style') || '').indexOf('display: none;') === -1).toBeTruthy();
      expect((rows.at(1).attributes('style') || '').indexOf('display: none;') === -1).toBeTruthy();
      expect((rows.at(2).attributes('style') || '').indexOf('display: none;') === -1).toBeTruthy();
    });
    it('updated expand-all-rows', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandAllRows: true,
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });
      wrapper.setProps({
        expandAllRows: false,
      });
      await waitTime();
      const rows = wrapper.findAll('.ux-table-expanded-row');
      expect((rows.at(0).attributes('style') || '').indexOf('display: none;') === -1).toBeFalsy();
      expect((rows.at(1).attributes('style') || '').indexOf('display: none;') === -1).toBeFalsy();
      expect((rows.at(2).attributes('style') || '').indexOf('display: none;') === -1).toBeFalsy();
    });
  });
  describe('hideExpandTreeIcon', () => {
    const mockTreeData = [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        childs: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    it.skip('hide-expand-tree-icon = false', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: mockTreeData,
          hideExpandTreeIcon: false,
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findAll('.ux-table-row-indent.indent-level-1').length).toBe(dataSource.length);
    });
    it('hide-expand-tree-icon = true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          hideExpandTreeIcon: true,
          expandedRowRender() {
            return 'this is test render';
          },
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.findAll('.ux-table-row-indent.indent-level-1').length).toBe(0);
    });
    it('fire expand event', async () => {
      const onExpand = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          columns,
          value: dataSource,
          expandedRowRender() {
            return 'this is test render';
          },
        },
        listeners: {
          expand: onExpand,
        },
      });

      await triggerEvent(wrapper.find('.ux-table-row-expand-icon'), 'click');

      expect(onExpand).toHaveBeenCalled();
      expect(onExpand.mock.calls[0][0]).toBeTruthy();
    });
  });
  it('destroy', async () => {
    const resizeEventRemove = jest.fn();
    const resizeWatch = jest.fn();

    const wrapper = await mountPicker({
      propsData: {
        columns,
        value: dataSource,
      },
    });
    const vtable = wrapper.find(VTable);
    vtable.vm.resizeEvent.remove = resizeEventRemove;
    vtable.vm.resizeWatch = resizeWatch;
    await waitTime();
    wrapper.destroy();
    expect(resizeEventRemove).toHaveBeenCalled();
    expect(resizeWatch).toHaveBeenCalled();
  });
});
