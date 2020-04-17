import { TreeHandler } from '..';

// const mockGetTree = jest.fn();

// jest.mock('../TreeHandler', () => jest.fn().mockImplementation(() => ({ getTree: mockGetTree })));

// beforeEach(() => {
//   TreeHandler.mockClear();
// });

// it('The consumer should be able to call new() on SoundPlayer', () => {
//   const treeHandler = new TreeHandler();
//   // Ensure constructor created the object:
//   expect(treeHandler).toBeTruthy();
// });

// it('We can check if the consumer called the class constructor', () => {
//   const ss = new TreeHandler();
//   expect(TreeHandler).toHaveBeenCalledTimes(1);
// });

function getData() {
  return [
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
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          isChecked: true,
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                  disabled: true,
                  isChecked: false,
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
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
}

describe('treeHandler', () => {
  const treeHandler = new TreeHandler(getData());

  it('called treehandler', () => {
    expect(treeHandler.tree.length).toBe(2);
  });

  it('getCheckedNodes', () => {
    expect(treeHandler.getCheckedNodes()).not.toBeNull();
  });

  it('checked parent', () => {
    const nNode = treeHandler.tree[0];
    treeHandler.handle(nNode, true);
  });

  it('checked all child', () => {
    const nChildNode = treeHandler.tree[0].children[0];
    treeHandler.handle(nChildNode, true);
  });

  it('checked single child', () => {
    const nNode = treeHandler.tree[0];
    treeHandler.handle(nNode, false);
    const nChildNode = treeHandler.tree[0].children[0];
    treeHandler.handle(nChildNode, true);
    treeHandler.handle(nChildNode, false);
  });

  it('getTree', () => {
    expect(treeHandler.getTree()).toBe(treeHandler.tree);
  });

  it('setDataSource', () => {
    const newData = getData().forEach((item) => {
      const tmp = item;
      tmp.name = `${item.name} from yz`;
      return tmp;
    });
    treeHandler.setDataSource(newData);
    expect(treeHandler.tree.data).toBe(newData);
  });
});
