import { mountPickerFactory, triggerEvent } from '@suning/v-test-utils';
import Table from '../table';
import { getData, getCols } from './utils';

describe('Table.drag', () => {
  jest.setTimeout(100000);
  const mountPicker = mountPickerFactory(Table);
  const dataSource = getData();
  const columns = getCols();
  function getDataTransfer() {
    return {
      data: {},
      setData(type, val) {
        this.data[type] = val;
      },
      getData(type) {
        return this.data[type];
      },
      dropEffect: 'move',
    };
  }

  function recursiveRows(data = [], cb, childColName = 'children') {
    const ret = [];
    for (let i = 0, l = data.length; i < l; i += 1) {
      const item = data[i];

      const nItem = typeof cb === 'function' ? cb({ ...item }) : { ...item };
      if (Array.isArray(item[childColName]) && item[childColName].length > 0) {
        nItem[childColName] = recursiveRows(item[childColName], cb, childColName);
      }
      ret.push(nItem);
    }

    return ret;
  }
  it('render draggable', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        draggable: true,
      },
    });

    const trs = wrapper.findAll('tr[draggable]');

    await triggerEvent(trs.at(0), 'dragstart', {
      clientX: 0,
      clientY: 0,
      dataTransfer: getDataTransfer(),
    });
    await triggerEvent(trs.at(2), 'dragover', { clientX: 0, clientY: 1 });
    await triggerEvent(trs.at(2), 'drop');

    expect(wrapper.find('.ux-table-body').html()).toMatchSnapshot();
  });
  it('render draggable to bottom', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        draggable: true,
      },
    });

    const trs = wrapper.findAll('tr[draggable]');

    await triggerEvent(trs.at(0), 'dragstart', {
      clientX: 0,
      clientY: 0,
      dataTransfer: getDataTransfer(),
    });
    await triggerEvent(trs.at(2), 'dragover', { clientX: 0, clientY: 20 });
    await triggerEvent(trs.at(2), 'drop');

    expect(wrapper.find('.ux-table-body').html()).toMatchSnapshot();
  });

  it('expandrow', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        draggable: true,
        expandedRowRender(record) {
          return `test expand row ${record.name}`;
        },
      },
    });
    const trs = wrapper.findAll('.ux-table-tbody tr');

    await triggerEvent(trs.at(0), 'dragstart', {
      clientX: 0,
      clientY: 0,
      dataTransfer: getDataTransfer(),
    });
    await triggerEvent(trs.at(3), 'dragenter');
    await triggerEvent(trs.at(3), 'dragover', { clientX: 0, clientY: 20 });
    await triggerEvent(trs.at(3), 'drop');
    expect(wrapper.find('.ux-table-body').html()).toMatchSnapshot();
  });

  it('expand row keys', async () => {
    const wrapper = await mountPicker({
      propsData: {
        value: dataSource,
        columns,
        draggable: true,
        expandedRowKeys: ['2'],
        expandedRowRender(record) {
          return `test expand row ${record.name}`;
        },
      },
    });
    const trs = wrapper.findAll('.ux-table-tbody tr');

    await triggerEvent(trs.at(0), 'dragstart', {
      clientX: 0,
      clientY: 0,
      dataTransfer: getDataTransfer(),
    });
    await triggerEvent(trs.at(3), 'dragenter');
    await triggerEvent(trs.at(3), 'dragover', { clientX: 0, clientY: 20 });
    await triggerEvent(trs.at(3), 'drop');
    expect(wrapper.find('.ux-table-body').html()).toMatchSnapshot();
  });

  describe('drag and drop events', () => {
    it('dragstart', async () => {
      const onDragstart = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          dragstart: onDragstart,
        },
      });

      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(0), 'dragstart', {
        dataTransfer: getDataTransfer(),
      });
      expect(onDragstart).toHaveBeenCalled();
      expect(onDragstart.mock.calls[0][0].dragKey).toBe('1');
    });

    it('dragenter', async () => {
      const onDragenter = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          dragenter: onDragenter,
        },
      });

      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(1), 'dragstart', {
        dataTransfer: getDataTransfer(),
      });
      await triggerEvent(trs.at(1), 'dragenter');
      expect(onDragenter).toHaveBeenCalled();
      expect(onDragenter.mock.calls[0][0].dragKey).toBe('2');
    });

    it('dragleave', async () => {
      const onDragleave = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          dragleave: onDragleave,
        },
      });
      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(2), 'dragstart', {
        dataTransfer: getDataTransfer(),
      });
      await triggerEvent(trs.at(2), 'dragleave', 120);

      expect(onDragleave).toHaveBeenCalled();
      expect(onDragleave.mock.calls[0][0].dragKey).toBe('3');
    });

    it('dragend', async () => {
      const onDragend = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          dragend: onDragend,
        },
      });
      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(0), 'dragstart', {
        dataTransfer: getDataTransfer(),
      });

      await triggerEvent(trs.at(0), 'dragend', {
        dataTransfer: { ...getDataTransfer(), clearData() {} },
      });
      expect(onDragend).toHaveBeenCalled();
      expect(onDragend.mock.calls[0][0].dragKey).toBe('1');
    });

    it('drop', async () => {
      const onDrop = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          drop: onDrop,
        },
      });

      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(0), 'dragstart', {
        clientX: 0,
        clientY: 0,
        dataTransfer: getDataTransfer(),
      });

      await triggerEvent(trs.at(1), 'drop');
      expect(onDrop).toHaveBeenCalled();
      expect(onDrop.mock.calls[0][0].dragKey).toBe('1');
    });

    it('drop getValue', async () => {
      const onDrop = jest.fn();
      const wrapper = await mountPicker({
        propsData: {
          value: dataSource,
          columns,
          draggable: true,
        },
        listeners: {
          drop: onDrop,
        },
      });

      const trs = wrapper.findAll('tr[draggable]');
      await triggerEvent(trs.at(0), 'dragstart', {
        clientX: 0,
        clientY: 0,
        dataTransfer: getDataTransfer(),
      });
      await triggerEvent(trs.at(2), 'drop');
      const getDropValue = onDrop.mock.calls[0][0].getValue;
      expect(typeof getDropValue === 'function').toBeTruthy();
      const keys = recursiveRows(getDropValue(), ({ key }) => ({
        key,
      }));
      expect(keys).toEqual([{ key: '2' }, { key: '3', children: [{ key: '1' }] }]);
    });
  });
});
