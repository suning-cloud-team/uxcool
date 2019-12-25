import { shallowMount } from '@suning/v-test-utils';
import Transfer from '../transfer';

function mockData(cnt = 10) {
  return Array(cnt)
    .fill(0)
    .map((v, i) => ({
      key: i,
      title: `title-${i}`,
      label: `label-${i}`,
      disabled: i % 3 === 0,
    }));
}

function getKey(data) {
  return data.map((v) => v.$$_key);
}

describe.only('Transfer render', () => {
  it('seleckedKeys', () => {
    const wrapper = shallowMount(Transfer, {
      propsData: {
        selectedKeys: [1, 2, 4, 5],
      },
    });

    expect(wrapper.vm.leftSelectedKeys).toEqual([1, 2, 4, 5]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([]);

    wrapper.setProps({
      targetKeys: [4],
    });

    expect(wrapper.vm.leftSelectedKeys).toEqual([1, 2, 5]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([4]);

    wrapper.setProps({
      selectedKeys: [4, 7, 10],
    });

    expect(wrapper.vm.leftSelectedKeys).toEqual([7, 10]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([4]);

    wrapper.setProps({
      selectedKeys: [4, 7, 10],
      targetKeys: [10],
    });

    expect(wrapper.vm.leftSelectedKeys).toEqual([4, 7]);
    expect(wrapper.vm.rightSelectedKeys).toEqual([10]);
  });

  it('targetKeys and leftDataSource, rightDataSource', () => {
    const wrapper = shallowMount(Transfer, {
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

    const { left: l1, right: r1 } = wrapper.vm.normalizeDataSource;
    expect(getKey(l1)).toEqual([0, 2, 3]);
    expect(getKey(r1)).toEqual([1, 4]);
  });

  it('DataSource no key ,console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowMount(Transfer, {
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

  it.only('rowKey', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = shallowMount(Transfer, {
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
    const { left } = wrapper.vm.normalizeDataSource;
    expect(getKey(left)).toEqual(['a1', 'a2']);
  });
});
