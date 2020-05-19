import { mountPickerFactory, waitTime, triggerEvent } from '@cloud-sn/v-test-utils';
import Transfer from '../transfer';

function mockData(cnt = 10, disbaled = true) {
  return Array(cnt)
    .fill(0)
    .map((v, i) => ({
      key: i,
      title: `title-${i}`,
      label: `label-${i}`,
      disabled: disbaled ? i % 3 === 0 : false,
      description: `description content ${i}`,
    }));
}

function getKey(data) {
  return data.map((v) => v.$$_key);
}

describe('transfer', () => {
  const mountTransfer = mountPickerFactory(Transfer);

  it('seleckedKeys', async () => {
    const wrapper = await mountTransfer({
      propsData: {
        selectedKeys: [1, 2, 4, 5],
      },
    });

    expect(wrapper.vm.leftSelectedKeys).toEqual([1, 2, 4, 5]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([]);

    wrapper.setProps({
      targetKeys: [4],
    });
    await waitTime();

    expect(wrapper.vm.leftSelectedKeys).toEqual([1, 2, 5]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([4]);

    wrapper.setProps({
      selectedKeys: [4, 7, 10],
    });
    await waitTime();
    expect(wrapper.vm.leftSelectedKeys).toEqual([7, 10]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([4]);

    wrapper.setProps({
      selectedKeys: [4, 7, 10],
      targetKeys: [10],
    });
    await waitTime();
    expect(wrapper.vm.leftSelectedKeys).toEqual([4, 7]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([10]);
  });

  it('targetKeys and leftDataSource, rightDataSource', async () => {
    const wrapper = await mountTransfer({
      propsData: {
        dataSource: mockData(5),
      },
    });

    const { left: l0, right: r0 } = wrapper.vm.normalizeDataSource;
    expect(getKey(l0)).toEqual([0, 1, 2, 3, 4]);
    expect(getKey(r0)).toEqual([]);

    wrapper.setProps({
      targetKeys: [1, 4],
    });
    await waitTime();
    const { left: l1, right: r1 } = wrapper.vm.normalizeDataSource;
    expect(getKey(l1)).toEqual([0, 2, 3]);
    expect(getKey(r1)).toEqual([1, 4]);

    // left: label0-disbaled label2  label3-disabled
    //  right: label1 label4
    const list = wrapper.findAll('.ux-transfer-list');
    const buttons = wrapper.find('.ux-transfer-operation').findAll('button');
    const leftButton = buttons.at(0);
    const rightButton = buttons.at(1);
    const leftList = list.at(0);
    const rightList = list.at(1);
    // 左侧全选
    await triggerEvent(leftList.find('.ux-checkbox-wrapper'), 'click');
    expect(leftList.findAll('.ux-checkbox-checked').length).toBe(2);
    const label2 = leftList.findAll('.ux-checkbox-checked').at(1);

    // 勾label2取消选择
    await triggerEvent(label2, 'click');
    expect(leftList.findAll('.ux-checkbox-checked').length).toBe(0);

    // 点击disable
    await triggerEvent(leftList.findAll('.ux-transfer-list-content-item').at(0), 'click');
    expect(leftList.findAll('.ux-checkbox-checked').exists()).toBe(false);

    // 再勾选label2
    await triggerEvent(label2, 'click');
    expect(leftList.findAll('.ux-checkbox-checked').length).toBe(2);
    //  移动到右边
    await triggerEvent(rightButton, 'click');
    expect(rightList.find('[title="title-2"]').exists()).toBeTruthy();
    // 右边全选，移动到左侧
    await triggerEvent(rightList.find('.ux-checkbox-wrapper'), 'click');
    await triggerEvent(leftButton, 'click');
    expect(rightList.find('.ux-transfer-list-header-selected').text()).toBe('0 项');
  });

  it('DataSource no key ,console.error', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await mountTransfer({
      propsData: {
        dataSource: [
          {
            title: 't1',
            label: 'l1',
          },
          {
            title: 't2',
            label: 'l2',
          },
        ],
      },
    });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Each record in dataSource of transfer should have a unique `key` prop'
      )
    );
  });

  it('rowKey', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = await mountTransfer({
      propsData: {
        dataSource: [
          {
            id: 'a1',
            title: 't1',
            label: 'l1',
          },
          {
            id: 'a2',
            title: 't2',
            label: 'l2',
          },
        ],
      },
    });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Each record in dataSource of transfer should have a unique `key` prop'
      )
    );

    wrapper.setProps({
      rowKey(record) {
        return record.id;
      },
    });
    await waitTime();
    const { left } = wrapper.vm.normalizeDataSource;
    expect(getKey(left)).toEqual(['a1', 'a2']);
  });

  it('search is correctly', async () => {
    const filterOption = (text, item) => item.description.indexOf(text) > -1;
    const dataSource = mockData(15, false);
    const wrapper = await mountTransfer({
      propsData: {
        dataSource,
        targetKeys: [0, 2, 5],
        showSearch: true,
      },
    });
    const list = wrapper.findAll('.ux-transfer-list');
    const leftList = list.at(0);

    await triggerEvent(leftList.find('.ux-transfer-list-content'), 'scroll');
    // 左搜索框搜索值为1
    leftList.find('.ux-transfer-list-search').setValue('1');
    await waitTime();
    expect(wrapper.emitted('search-change').length).toBe(1);
    expect(leftList.findAll('.ux-transfer-list-content-item').length).toBe(6);
    await triggerEvent(leftList.find('.fu-close_circle'), 'click');
    // expect(leftList.findAll('.ux-transfer-list-content-item').length).toBe(12);
    expect(wrapper.emitted('search-clear').length).toBe(1);
    expect(leftList.find('.ux-transfer-list-search').element.value).toBe('');

    wrapper.setProps({ filterOption });
    leftList.find('.ux-transfer-list-search').setValue('1');
    await waitTime();
    expect(leftList.findAll('.ux-transfer-list-content-item').length).toBe(6);
    await triggerEvent(leftList.find('.fu-close_circle'), 'click');
    // 部分勾选
    await triggerEvent(leftList.find('[title="title-1"]'), 'click');
    await triggerEvent(leftList.find('[title="title-3"]'), 'click');
    expect(leftList.find('.ux-transfer-list-header').find('.ux-checkbox').classes('ux-checkbox-indeterminate')).toBeTruthy();
    // 全部勾选
    await triggerEvent(leftList.find('.ux-checkbox-wrapper'), 'click');
    expect(leftList.findAll('.ux-checkbox-checked').length).toBe(9);

    await triggerEvent(leftList.find('.ux-checkbox-wrapper'), 'click');
    expect(leftList.findAll('.ux-checkbox-checked').length).toBe(0);
  });

  it('render item is correctly', async () => {
    const renderItem = (item) => {
      const { description, label } = item;
      return (`${label}-${description}-${label}`);
    };
    const dataSource = mockData(15, false);
    const wrapper = await mountTransfer({
      propsData: {
        dataSource,
        targetKeys: [0, 2, 5],
        renderItem
      },
    });
    expect(wrapper.find('[title="title-1"]').text()).toBe('label-1-description content 1-label-1');
  });
});
