import { getPortal, triggerEvent } from '@cloud-sn/v-test-utils';
import Dropdown from '../../dropdown';

export function getCols(cols = []) {
  return [
    ...[
      {
        key: 'name',
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
      },
    ],
    ...cols,
  ];
}
export function getData() {
  return [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
}

export async function getCheckboxDropdownPortal(wrapper) {
  await triggerEvent(wrapper.find('.ux-table-selection-down'), 'mouseenter');
  const dropdown = wrapper.find(Dropdown);
  const portal = await getPortal(dropdown);

  return portal;
}

export async function getFilterDropdownPortal(wrapper) {
  await triggerEvent(wrapper.find('.ux-table-filter-icon'), 'click');
  const dropdown = wrapper.find(Dropdown);
  const portal = await getPortal(dropdown);

  return portal;
}

export function getScrollCols(l = 20) {
  const cols = [];

  for (let i = 0; i < l; i += 1) {
    cols.push({
      key: `k-${i}`,
      title: `title-${i}`,
      dataIndex: i % 2 === 0 ? 'd1' : 'd2',
    });
  }

  return cols;
}

export function getScrollData(l = 30) {
  const d = [];
  for (let i = 0; i < l; i += 1) {
    d.push({
      key: `kk-${i}`,
      d1: `k1111-${i}`,
      d2: `k2222-${i}`,
    });
  }
  return d;
}

export function getSortRowName(wrapper) {
  const rows = wrapper.findAll('.ux-table-row td:nth-child(1)');
  return (rows.wrappers || []).map((row) => row.text());
}
