import { mountPickerFactory, triggerEvent, getVueCreateElement } from '@suning/v-test-utils';
import { getScrollCols, getScrollData } from './utils';
import Table from '../table';

describe('Table.virtual', () => {
  jest.setTimeout(100000);
  const mountPicker = mountPickerFactory(Table);
  const columns = getScrollCols(5);
  const dataSource = getScrollData(200);
  it('render virtual table ', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        virtualScroll: {
          itemSize: 40,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('scroll', () => {
    it('scroll.x is true', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          scroll: {
            x: true,
          },
          virtualScroll: {
            itemSize: 40,
          },
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('scroll.x is number', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          scroll: {
            x: 200,
          },
          virtualScroll: {
            itemSize: 40,
          },
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('scroll.y is number', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          scroll: {
            y: 200,
          },
          virtualScroll: {
            itemSize: 40,
          },
        },
      });

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('itemSize = 40', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          virtualScroll: {
            itemSize: 40,
          },
        },
      });

      const bTable = wrapper.find('.ux-table-main-table').find('.ux-table-body');

      bTable.element.scrollTop = 1000;

      await triggerEvent(bTable, 'scroll', 120);

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('itemSize is auto', async () => {
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          virtualScroll: true,
        },
      });

      const bTable = wrapper.find('.ux-table-main-table').find('.ux-table-body');

      bTable.element.scrollTop = 1000;

      await triggerEvent(bTable, 'scroll', 120);
      expect(parseInt(wrapper.find('[role=virtual]').element.style.paddingTop, 10)).toBeGreaterThan(
        0
      );
    });

    it('scroll and fixed column', async () => {
      const cols = getScrollCols();
      cols[0].fixed = 'left';
      cols[cols.length - 1].fixed = 'right';
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns: cols,
          scroll: {
            x: 200,
            y: 200,
          },
          virtualScroll: {
            itemSize: 40,
          },
        },
      });

      const bTable = wrapper.find('.ux-table-main-table').find('.ux-table-body');

      bTable.element.scrollTop = 1000;

      await triggerEvent(bTable, 'scroll', 120);
      expect(parseInt(wrapper.find('[role=virtual]').element.style.paddingTop, 10)).toBeGreaterThan(
        0
      );
      expect(wrapper.find('.ux-table-fixed-left').exists()).toBeTruthy();
      expect(wrapper.find('.ux-table-fixed-right').exists()).toBeTruthy();
    });
  });

  describe('expand', () => {
    const mockText = 'expand render test text';
    const h = getVueCreateElement();
    it('expanded-row-render', async () => {
      const onExpand = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          virtualScroll: true,
          expandedRowRender() {
            return h('p', { class: 'expanded-render-test' }, [mockText]);
          },
        },
        listeners: {
          expand: onExpand,
        },
      });
      await triggerEvent(wrapper.find('.ux-table-row-expand-icon'), 'click');

      expect(onExpand).toHaveBeenCalled();
      expect(onExpand.mock.calls[0][0]).toBeTruthy();
      expect(wrapper.find('.expanded-render-test').exists()).toBeTruthy();
    });
  });

  it('fixed table hover', async () => {
    const cols = getScrollCols();
    cols[0].fixed = 'left';
    cols[cols.length - 1].fixed = 'right';

    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns: cols,
        virtualScroll: true,
      },
    });

    const mainTables = wrapper.findAll('.ux-table-main-table');

    const mainTableRows = mainTables.at(0).findAll('.ux-table-tbody tr');
    const leftTableRows = mainTables.at(1).findAll('.ux-table-tbody tr');
    const rightTableRows = mainTables.at(2).findAll('.ux-table-tbody tr');

    await triggerEvent(mainTableRows.at(0), 'mouseenter');

    expect(leftTableRows.at(0).classes('ux-table-row-hover')).toBeTruthy();
    expect(rightTableRows.at(0).classes('ux-table-row-hover')).toBeTruthy();

    await triggerEvent(mainTableRows.at(0), 'mouseleave');
    expect(leftTableRows.at(0).classes('ux-table-row-hover')).toBeFalsy();
    expect(rightTableRows.at(0).classes('ux-table-row-hover')).toBeFalsy();

    await triggerEvent(leftTableRows.at(1), 'mouseenter');
    expect(mainTableRows.at(1).classes('ux-table-row-hover')).toBeTruthy();
    expect(rightTableRows.at(1).classes('ux-table-row-hover')).toBeTruthy();

    await triggerEvent(leftTableRows.at(1), 'mouseleave');
    expect(mainTableRows.at(1).classes('ux-table-row-hover')).toBeFalsy();
    expect(rightTableRows.at(1).classes('ux-table-row-hover')).toBeFalsy();

    await triggerEvent(rightTableRows.at(2), 'mouseenter');
    expect(mainTableRows.at(2).classes('ux-table-row-hover')).toBeTruthy();
    expect(leftTableRows.at(2).classes('ux-table-row-hover')).toBeTruthy();

    await triggerEvent(rightTableRows.at(2), 'mouseleave');
    expect(mainTableRows.at(2).classes('ux-table-row-hover')).toBeFalsy();
    expect(leftTableRows.at(2).classes('ux-table-row-hover')).toBeFalsy();
  });
});
