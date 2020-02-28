import { mountPickerFactory, triggerEvent, createWrapper } from '@suning/v-test-utils';
import { getData, getCols } from './utils';
import Table from '../table';

describe('Table.resizable', () => {
  jest.setTimeout(100000);
  const mountPicker = mountPickerFactory(Table);
  const columns = getCols();
  columns[0].resizable = true;
  const dataSource = getData();
  it('render resizable ', async () => {
    const wrapper = await mountPicker({
      propsData: {
        columns,
        value: dataSource,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('fire column-width-resize event', async () => {
    const onColumnResize = jest.fn();
    const wrapper = await mountPicker({
      propsData: {
        columns,
        value: dataSource,
      },
      listeners: {
        'column-width-resize': onColumnResize,
      },
    });

    const resizer = wrapper.find('.ux-table-th-resizer');

    await triggerEvent(resizer, 'mousedown');

    await triggerEvent(createWrapper(resizer.element.ownerDocument.body), 'mouseup');

    expect(onColumnResize).toHaveBeenCalled();
    expect(onColumnResize).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Object),
      expect.any(Object)
    );
  });
});
