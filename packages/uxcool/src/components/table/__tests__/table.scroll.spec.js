import { mountPickerFactory, triggerEvent } from '@suning/v-test-utils';
import Table from '../table';
import { getScrollCols, getScrollData } from './utils';

describe('Table.scroll', () => {
  jest.setTimeout(100000);
  const mountPicker = mountPickerFactory(Table);

  const columns = getScrollCols();
  const dataSource = getScrollData();

  it('render scroll.x is true', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        scroll: {
          x: true,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('render scroll.x is number', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        scroll: {
          x: 200,
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('render scroll.y is number', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        scroll: {
          y: 200,
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('fire scroll event', async () => {
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
      },
    });

    const mainTable = wrapper.find('.ux-table-main-table');
    const hTable = mainTable.find('.ux-table-header');
    const bTable = mainTable.find('.ux-table-body');
    const leftTable = wrapper.find('.ux-table-fixed-left').find('.ux-table-body-inner');
    const rightTable = wrapper.find('.ux-table-fixed-right').find('.ux-table-body-inner');

    hTable.element.scrollTop = 0;
    hTable.element.scrollLeft = 30;
    await triggerEvent(hTable, 'scroll');

    expect(bTable.element.scrollTop).toBe(0);
    expect(bTable.element.scrollLeft).toBe(30);
    expect(leftTable.element.scrollTop).toBe(0);
    expect(leftTable.element.scrollLeft).toBe(0);
    expect(rightTable.element.scrollTop).toBe(0);
    expect(rightTable.element.scrollLeft).toBe(0);

    bTable.element.scrollTop = 20;
    bTable.element.scrollLeft = 50;
    await triggerEvent(bTable, 'scroll');
    expect(hTable.element.scrollTop).toBe(0);
    expect(hTable.element.scrollLeft).toBe(50);
    expect(leftTable.element.scrollTop).toBe(20);
    expect(leftTable.element.scrollLeft).toBe(0);
    expect(rightTable.element.scrollTop).toBe(20);
    expect(rightTable.element.scrollLeft).toBe(0);

    leftTable.element.scrollTop = 35;
    await triggerEvent(leftTable, 'scroll');
    expect(hTable.element.scrollTop).toBe(0);
    expect(hTable.element.scrollLeft).toBe(50);
    expect(bTable.element.scrollTop).toBe(35);
    expect(bTable.element.scrollLeft).toBe(50);
    expect(leftTable.element.scrollTop).toBe(35);
    expect(leftTable.element.scrollLeft).toBe(0);
    expect(rightTable.element.scrollTop).toBe(35);
    expect(rightTable.element.scrollLeft).toBe(0);

    rightTable.element.scrollTop = 45;
    await triggerEvent(rightTable, 'scroll');
    expect(hTable.element.scrollTop).toBe(0);
    expect(hTable.element.scrollLeft).toBe(50);
    expect(bTable.element.scrollTop).toBe(45);
    expect(bTable.element.scrollLeft).toBe(50);
    expect(leftTable.element.scrollTop).toBe(45);
    expect(leftTable.element.scrollLeft).toBe(0);
    expect(rightTable.element.scrollTop).toBe(45);
    expect(rightTable.element.scrollLeft).toBe(0);
  });
});
