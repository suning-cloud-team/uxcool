import { mount, waitTime, $ } from '@cloud-sn/v-test-utils';
import Tree from '../tree';
import VitrualTree from '../virtualTree';

function createWrapper(Cmp, opts) {
  return (options) => mount(Cmp, { ...opts, ...options });
}

const createTreeWrapper = createWrapper(Tree, { sync: false });
const createVirtualTreeWrapper = createWrapper(VitrualTree, { sync: false });

const dataSource = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', disabled: true },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      { title: '0-0-2', key: '0-0-2' },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0',
        key: '0-1-0',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0', selectable: true },
          { title: '0-1-0-1', key: '0-1-0-1', disabled: true },
          { title: '0-1-0-2', key: '0-1-0-2' },
        ],
      },
      {
        title: '0-1-1',
        key: '0-1-1',
        children: [
          { title: '0-1-1-0', key: '0-1-1-0' },
          { title: '0-1-1-1', key: '0-1-1-1' },
          { title: '0-1-1-2', key: '0-1-1-2' },
        ],
      },
      { title: '0-1-2', key: '0-1-2' },
    ],
  },
  { title: '0-2', key: '0-2' },
];

function getNodesCount(tree) {
  let count = 0;
  let leafCount = 0;
  let queue = [...tree];
  while (queue.length) {
    const node = queue.pop();
    count += 1;
    if (node.children) {
      queue = [...queue, ...node.children];
    } else {
      leafCount += 1;
    }
  }
  return { total: count, leafCount, parentNodeCount: count - leafCount };
}

function createNode(parentKey, key, longTitle) {
  const longMsg = 'Zinedine Yazid Zidane O.L.H., A.O.M.N. (French pronunciation: [zinedin zidan],'
    + ' born 23 June 1972), nicknamed "Zizou", is a French retired professional footballer and current '
    + 'manager of Real Madrid. He played as an attacking midfielder for the France national team, Cannes, '
    + 'Bordeaux, Juventus and Real Madrid.[3][4] An elite playmaker, renowned for his elegance, vision, ball '
    + 'control and technique, Zidane was named the best European footballer of the past 50 years in the UEFA '
    + 'Golden Jubilee Poll in 2004.[5] He is widely regarded as one of the greatest players of all time';
  const node = {
    title: longTitle ? `${parentKey}-${key}-${longMsg}` : `${parentKey}-${key}`,
    key: `${parentKey}-${key}`,
    dataValue: '',
  };
  return node;
}

function createBigDataSource(firstLevelCount = 100, secondLevelCount = 10, thirdLevelCount = 10, longTitle = false) {
  const dataSrc = [];
  for (let firstlevel = 0; firstlevel < firstLevelCount; firstlevel += 1) {
    const firstLevelNode = createNode('0', dataSrc.length);
    firstLevelNode.children = [];
    for (let sndLevel = 0; sndLevel < secondLevelCount; sndLevel += 1) {
      const sndNode = createNode(firstLevelNode.key, firstLevelNode.children.length, longTitle ? sndLevel % 2 : false);
      sndNode.children = [];
      for (let trdLevel = 0; trdLevel < thirdLevelCount; trdLevel += 1) {
        const trdNode = createNode(sndNode.key, sndNode.children.length);
        sndNode.children.push(trdNode);
      }
      firstLevelNode.children.push(sndNode);
    }
    dataSrc.push(firstLevelNode);
  }
  return dataSrc;
}

function loadData(node) {
  return new Promise((resolve) => {
    if (!node) {
      resolve([
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
              ],
            },
          ],
        },
        {
          title: '0-1',
          key: '0-1',
        },
        { title: '0-2', key: '0-2' },
      ]);
    } else if (node.level === 3) {
      resolve([]);
    } else {
      const { key } = node;
      resolve(
        Array(3)
          .fill(0)
          .map((_, i) => ({
            title: `child-${key}-${i}`,
            key: `${key}-${i}`,
            disabled: i === 2,
            isLeaf: node.key === '0-0-0-0' && node.level === 2,
          }))
      );
    }
  });
}

function loadBigData(node) {
  return new Promise((resolve) => {
    if (!node) {
      const dataSrc = createBigDataSource(500, 0, 0);
      resolve(dataSrc);
    } else if (node.level === 3) {
      resolve([]);
    } else {
      const { key } = node;
      resolve(
        Array(3)
          .fill(0)
          .map((_, i) => ({
            title: `child-${key}-${i}`,
            key: `${key}-${i}`,
            disabled: i === 2,
            isLeaf: node.key === '0-0-0-0' && node.level === 2,
          }))
      );
    }
  });
}
describe('Tree Component Render', () => {
  describe('Tree Render', () => {
    describe('Tree Sync', () => {
      it('render tree and tree node', () => {
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
          },
        });
        expect(wrapper.isVueInstance()).toBe(true);
        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(3);
        expect(
          nodeArray
            .at(0)
            .find('.ux-tree-title')
            .html()
        ).toContain('0-0');
        expect(
          nodeArray
            .at(2)
            .find('.ux-tree-title')
            .html()
        ).toContain('0-2');
        expect(wrapper.contains('.ux-tree-checkbox')).toBeFalsy();
        expect(wrapper.contains('.ux-tree-node-selected')).toBeFalsy();

        wrapper.destroy();
      });

      it('expanded all nodes', async () => {
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
          },
        });
        const { total, parentNodeCount } = getNodesCount(dataSource);
        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(total);
        expect(wrapper.findAll('.ux-tree-treenode-switcher-open').length).toEqual(parentNodeCount);
        wrapper.find('.ux-tree-switcher').trigger('click');
        await waitTime();
        expect(wrapper.find('.ux-tree-switcher_close')).toBeDefined();
        wrapper.destroy();
      });

      it('test tree checked', async () => {
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
            checkable: true,
          },
        });
        const mockCheck = jest.fn();
        wrapper.vm.$on('check', mockCheck);
        const mockNodeClick = jest.fn();
        wrapper.vm.$on('node-click', mockNodeClick);
        const { total } = getNodesCount(dataSource);

        // 验证是否所以节点都渲染了checkbox
        expect(wrapper.findAll('.ux-tree-checkbox').length).toEqual(total);
        const checkedKeys = ['0-0-0', '0-0-1', '0-0-2'];
        wrapper.setProps({ checkedKeys });
        await waitTime(20);

        // 验证初始化节点本身及父节点是否都checked
        expect(wrapper.findAll('.ux-tree-checkbox-checked').length).toEqual(8);

        // 验证disabledCheckbox 节点是否生效
        const disabledCheckNodeTitle = wrapper.find('[title="0-0-0-0"]');
        expect(
          $(disabledCheckNodeTitle.element)
            .prev()
            .hasClass('ux-tree-checkbox-disabled')
        ).toBeTruthy();

        expect(mockCheck).not.toHaveBeenCalled();
        expect(mockNodeClick).not.toHaveBeenCalled();

        // 选择节点0-1-0-0作为触发checkbox试验节点
        const targetCheckbox = wrapper.find('[title="0-1-0"]+ul').find('.ux-tree-checkbox');
        targetCheckbox.trigger('click');

        // 验证回调的返回参数
        expect(mockCheck).toHaveBeenCalled();
        expect(mockCheck.mock.calls[0].length).toBe(2);
        const expecedArray = [
          '0-0',
          '0-0-0',
          '0-0-0-1',
          '0-0-0-2',
          '0-0-1',
          '0-0-1-1',
          '0-0-1-2',
          '0-0-2',
          '0-1-0-0',
        ];
        expect(expecedArray).toEqual(expect.arrayContaining(mockCheck.mock.calls[0][0]));

        // 验证0-1-0-0勾选， 0-1,0-1-0半勾选
        wrapper.vm.$nextTick(() => {
          expect(targetCheckbox.classes('ux-tree-checkbox-checked')).toBeTruthy();
          const rootNode = wrapper.findAll('ul.ux-tree > li');
          expect(rootNode.at(1).findAll('.ux-tree-checkbox-indeterminate').length).toBe(2);
        });

        expect(mockNodeClick).not.toHaveBeenCalled();
      });

      it('test tree selected', () => {
        const selectedKeys = ['0-0-2', '0-1-0'];
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
            checkable: true,
            selectedKeys,
          },
        });
        const mockSelect = jest.fn();
        wrapper.vm.$on('select', mockSelect);
        const selectedNodes = wrapper.findAll('.ux-tree-node-selected');
        expect(selectedNodes.length).toBe(1);
        expect(selectedNodes.at(0).attributes().title).toBe(selectedKeys[0]);

        const target = wrapper.find('[title="0-0-0-1"]');
        target.trigger('click');
        // 验证select回调函数
        expect(mockSelect).toHaveBeenCalled();
        // 验证选中是否由'0-0-2' 切换到 '0-0-0-1'
        wrapper.vm.$nextTick(() => {
          const newSelectedNodes = wrapper.findAll('.ux-tree-node-selected');
          expect(newSelectedNodes.length).toBe(1);
          expect(newSelectedNodes.at(0).attributes().title).toBe('0-0-0-1');
          target.trigger('click');
        });
      });

      it('test multiple selected', () => {
        const selectedKeys = ['0-0-2', '0-1-0'];
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
            checkable: true,
            selectedKeys,
            multiple: true,
          },
        });
        const selectedNodes = wrapper.findAll('.ux-tree-node-selected');
        expect(selectedNodes.length).toBe(selectedKeys.length);

        wrapper.find('[title="0-1-0-2"]').trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(wrapper.findAll('.ux-tree-node-selected').length).toBe(3);
        });
      });

      it('test drag ', async () => {
        // 构造drop元素0-0-0-0的视图坐标为(169, 0),宽高为(120, 64), drapover事件的y坐标值为174
        // 执行该拖拽后，drap元素0-0-0-2将在0-0-0-0之上
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
          width: 120,
          height: 24,
          top: 169,
          left: 0,
          bottom: 193,
          right: 0,
        }));
        const dataSrc = JSON.parse(JSON.stringify(dataSource));
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            draggable: true,
            defaultExpandAll: true,
          },
        });
        await waitTime();
        const mockDrag = jest.fn();
        wrapper.vm.$on('drop', mockDrag);
        // 将0-0-0-2拖到0-0-0-0之前
        const targetNodes = wrapper.find('.ux-tree-child-tree-open .ux-tree-child-tree-open').findAll('ul li');
        const dragNode = targetNodes.at(2);
        const dropNode = targetNodes.at(0);
        dragNode.find('.draggable').trigger('dragstart');
        dragNode.trigger('dragenter');
        await waitTime();
        dropNode.trigger('dragenter');
        dragNode.trigger('dragleave');
        dropNode.trigger('dragover', { clientY: 174 });
        await waitTime(510);
        dropNode.trigger('drop');
        dropNode.trigger('dragleave');
        dragNode.find('.draggable').trigger('dragend');
        await waitTime(100);

        expect(mockDrag).toHaveBeenCalledTimes(1);
        const {
          dragOverGap,
          dragNode: { key },
        } = mockDrag.mock.calls[0][0];
        expect(dragOverGap).toBe('top');
        expect(key).toBe('0-0-0-2');

        // tree的dom结构已重新生成,需重新查找 hw 2019-01-10 fixed
        const afterDraggedNodes = wrapper.find('.ux-tree-child-tree-open .ux-tree-child-tree-open').findAll('ul li>.ux-tree-node-content-wrapper');
        expect(afterDraggedNodes.length).toBe(3);
        expect(afterDraggedNodes.at(0).text()).toBe('0-0-0-2');
        expect(afterDraggedNodes.at(1).text()).toBe('0-0-0-0');
        expect(afterDraggedNodes.at(2).text()).toBe('0-0-0-1');
        wrapper.destroy();
      });

      it('test drop position', async () => {
        // 构造drop元素0-0-0-0的视图坐标为(169, 0),宽高为(120, 64), drapover事件的y坐标值为174
        // [175, 187] 为中间区域
        // 执行该拖拽后，drap元素0-0-0-2将在0-0-0-0之上
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
          width: 120,
          height: 24,
          top: 169,
          left: 0,
          bottom: 193,
          right: 0,
        }));
        const dataSrc = JSON.parse(JSON.stringify(dataSource));
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            draggable: true,
            defaultExpandAll: true,
          },
        });

        const mockDrag = jest.fn();
        wrapper.vm.$on('drop', mockDrag);
        // 将0-0-0-2拖到0-0的mid,使其变为0-0的子节点，0-0-0-1拖到0-0的mid位置，使其为子节点
        const targetNodes = wrapper.find('.ux-tree-child-tree-open .ux-tree-child-tree-open').findAll('ul li');
        const dragNode = targetNodes.at(2);
        dragNode.find('.draggable').trigger('dragstart');
        dragNode.trigger('dragover', { clientY: 174 });
        dragNode.trigger('drop');
        dragNode.find('.draggable').trigger('dragend');
        await waitTime();
        const nodes = wrapper.find('.ux-tree-child-tree-open .ux-tree-child-tree-open').findAll('ul li');
        expect(nodes.at(2).find('.ux-tree-title').text()).toBe('0-0-0-2');
        // 拖0-0-0-2 到 0-0
        const dropNode = wrapper.find('ul li');
        dragNode.find('.draggable').trigger('dragstart');
        dropNode.trigger('dragenter');
        dragNode.trigger('dragleave');
        dropNode.trigger('dragover', { clientY: 180 }); // mid
        dropNode.trigger('drop');
        dropNode.trigger('dragleave');
        dragNode.find('.draggable').trigger('dragend');
        await waitTime(50);
        const childrenNodes = dropNode.findAll('ul li');
        expect(childrenNodes.at(childrenNodes.length - 1).find('.ux-tree-title').text()).toBe('0-0-0-2');
        // 拖0-0-0-1 到 0-0 bottom
        const dragToBottomNode = wrapper.find('.ux-tree-child-tree-open .ux-tree-child-tree-open').findAll('ul li').at(1);
        dragToBottomNode.find('.draggable').trigger('dragstart');
        dropNode.trigger('dragenter');
        dragToBottomNode.trigger('dragleave');
        dropNode.trigger('dragover', { clientY: 189 }); // bottom
        dropNode.trigger('drop');
        dropNode.trigger('dragleave');
        dragToBottomNode.find('.draggable').trigger('dragend');
        await waitTime(50);
        expect(wrapper.find('.ux-tree-treenode-switcher-open').find('.ux-tree-child-tree .ux-tree-title').text()).toBe('0-0-0-1');
      });

      it('test watch func', async () => {
        const selectedKeys = ['0-0-2'];
        const expandedKeys = ['0-0'];
        const wrapper = createTreeWrapper({
          propsData: {
            checkable: true,
            selectedKeys,
            expandedKeys
          },
        });
        const newDataSource = [...dataSource, { title: '0-3', key: '0-3' }];
        wrapper.setProps({ dataSource: { title: '0-3', key: '0-3' } });
        await waitTime();
        wrapper.setProps({ dataSource: newDataSource });
        await waitTime();
        expect(wrapper.find('span[title="0-3"]')).toBeDefined();
        wrapper.setProps({ expandedKeys: ['0-0', '0-1'] });
        await waitTime();
        expect(wrapper.find('span[title="0-1-0"]')).toBeDefined();
        wrapper.setProps({ selectedKeys: ['0-0-2'] });
        await waitTime();
        expect(wrapper.find('.ux-tree-node-selected').attributes('title')).toBe('0-0-2');
        wrapper.setProps({ selectedKeys: ['0-1-0'] });
        await waitTime();
        expect(wrapper.find('span[title="0-1-0"]').classes()).toContain('ux-tree-node-selected');
      });
    });
    describe('Tree Async', () => {
      it('async load node', async () => {
        const mockLoadFn = jest.fn(loadData);
        const wrapper = createTreeWrapper({
          propsData: {
            loadData: mockLoadFn,
            showIcon: true,
            lazy: true,
            checkable: true,
          },
        });
        await waitTime(20);

        expect(wrapper.isVueInstance()).toBe(true);
        expect(mockLoadFn).toHaveBeenCalledTimes(1);

        const mockExpand = jest.fn();
        wrapper.vm.$on('expand', mockExpand);

        // 触发 0-1 的展开
        const rootNode = wrapper.findAll('ul.ux-tree > li');
        rootNode
          .at(1)
          .find('.ux-tree-switcher')
          .trigger('click');
        expect(mockLoadFn).toHaveBeenCalledTimes(2);
        await waitTime(1200);
        expect(mockExpand).toHaveBeenCalled();
        expect(wrapper.findAll('.ux-tree-node-content-wrapper').length).toBe(6);

        // 验证过滤'0-2'
        wrapper.vm.filter('0-2');
        await waitTime(500);
        expect(wrapper.findAll('.ux-tree-node-content-wrapper').length).toBe(4);
      });
    });

    describe('Tree Slot', () => {
      it('test render slot scope', () => {
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
            selectedKeys: ['0-0-0'],
          },
          scopedSlots: {
            renderContent: '<span slot-scope="{node}">{{node.title}}-level-{{node.level}}</span>',
          },
        });
        const { total } = getNodesCount(dataSource);
        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(total);
        const selectedNode = wrapper.find('.ux-tree-node-selected');
        expect(selectedNode.text()).toBe('0-0-0-level-1');
      });

      it('test render function', () => {
        const mockRenderContentFn = jest.fn(({ node }) => `${node.title}-level-fn-${node.level}`);
        const wrapper = createTreeWrapper({
          propsData: {
            dataSource,
            defaultExpandAll: true,
            selectedKeys: ['0-0-0'],
            renderContent: mockRenderContentFn,
          },
        });
        const { total } = getNodesCount(dataSource);
        expect(mockRenderContentFn).toHaveBeenCalledTimes(total);
        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(total);
        const selectedNode = wrapper.find('.ux-tree-node-selected');
        expect(selectedNode.text()).toBe('0-0-0-level-fn-1');
      });
    });
  });
  describe('Vitural Tree Render', () => {
    describe('Virtual Tree Sync', () => {
      it('render virtual tree node', async () => {
        const dataSrc = createBigDataSource();
        const viewCount = 20;
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            checkable: true,
            multiple: true,
            viewCount,
            checkedKeys: ['0-0-0', '0-0-1', '0-0-2'],
            selectedKeys: ['0-0-2'],
          },
        });
        const mockNodeClick = jest.fn();
        wrapper.vm.$on('node-click', mockNodeClick);

        expect(wrapper.isVueInstance()).toBe(true);

        // 展示的节点个数为viewCount + beach, beach 默认为viewCount
        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(viewCount + viewCount);
        expect(nodeArray.at(0).text()).toBe('0-0');
        expect(nodeArray.at(nodeArray.length - 1).text()).toBe('0-39');

        // 0-0节点半选
        expect(
          wrapper
            .find('.ux-tree-treenode-checkbox-indeterminate .ux-tree-node-content-wrapper')
            .text()
        ).toBe('0-0');
        // 展开 0-0
        wrapper.find('ul li:first-child .ux-tree-switcher').trigger('click');
        expect(mockNodeClick).not.toHaveBeenCalled();
        await waitTime(20);
        const after1stChangedNodes = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(after1stChangedNodes.at(0).text()).toBe('0-0');
        expect(after1stChangedNodes.at(after1stChangedNodes.length - 1).text()).toBe('0-29');
        expect(wrapper.findAll('.ux-tree-treenode-checkbox-checked').length).toBe(3);

        // click是否响应
        wrapper.find('ul li:first-child .ux-tree-node-content-wrapper').trigger('click');
        expect(mockNodeClick).toHaveBeenCalled();

        // check
        const nodes = wrapper.findAll('ul li');
        nodes.at(1).find('.ux-tree-switcher').trigger('click');
        await waitTime();
        nodes.at(0).find('.ux-tree-checkbox').trigger('click');
        await waitTime();
        expect(wrapper.findAll('ul li').at(0).find('.ux-tree-checkbox-checked')).toBeDefined();
      });

      it('test viewCount and beach', async () => {
        const dataSrc = createBigDataSource();
        const bench = 20;
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            checkable: true,
            multiple: true,
            bench,
          },
        });
        expect(wrapper.findAll('.ux-tree-node-content-wrapper').length).toBe(30 + bench);
      });
    });

    describe('Virtual Tree Async', () => {
      it('async load virtual node ', async () => {
        const mockLoadFn = jest.fn(loadBigData);
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            loadData: mockLoadFn,
            showIcon: true,
            lazy: true,
            checkable: true,
          },
        });
        await waitTime(20);

        expect(wrapper.isVueInstance()).toBe(true);
        expect(mockLoadFn).toHaveBeenCalledTimes(1);

        const mockExpand = jest.fn();
        wrapper.vm.$on('expand', mockExpand);
        wrapper.find('ul li:first-child .ux-tree-switcher').trigger('click');
        expect(mockLoadFn).toHaveBeenCalledTimes(2);
        await waitTime(500);

        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(60);
        expect(nodeArray.at(0).text()).toBe('0-0');
        expect(nodeArray.at(nodeArray.length - 1).text()).toBe('0-56');

        // 验证过滤'0-2'
        wrapper.vm.filter('0-2');
        wrapper.vm.$nextTick(() => {
          const afterChangeNodes = wrapper.findAll('.ux-tree-node-content-wrapper');
          expect(afterChangeNodes.length).toBe(60);
          expect(afterChangeNodes.at(0).text()).toBe('0-0');
          expect(afterChangeNodes.at(nodeArray.length - 1).text()).toBe('0-246');
        });
      });
    });

    describe('Virtual Tree Slot', () => {
      it('test render virtual node slot scope', () => {
        const dataSrc = createBigDataSource(100, 10, 10);
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            defaultExpandAll: true,
            selectedKeys: ['0-0-0'],
            viewCount: 20,
          },
          scopedSlots: {
            renderContent: '<span slot-scope="{node}">{{node.title}}-level-{{node.level}}</span>',
          },
        });
        const { total } = getNodesCount(dataSrc);

        const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
        expect(nodeArray.length).toEqual(40);
        expect(nodeArray.at(0).text()).toBe('0-0-level-0');
        expect(nodeArray.at(nodeArray.length - 1).text()).toBe('0-0-3-4-level-2');
        expect(nodeArray.length).toBeLessThanOrEqual(total);
      });

      it('test render virtual node auto height', async () => {
        const dataSrc = createBigDataSource(10, 10, 0, true);
        const expandedKeys = ['0-0'];
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            defaultExpandAll: false,
            selectedKeys: ['0-0-0'],
            expandedKeys,
            showLine: true,
            autoHeight: true,
            viewCount: 20,
          },
        });
        const nodeArray = wrapper.findAll('li');
        expect(nodeArray.length).toBe(20);
        wrapper.setProps({ expandedKeys: ['0-1'] });
        await waitTime();
        expect(wrapper.findAll('li').length).toBe(20);
        wrapper.findAll('li').at(0).find('.ux-tree-switcher').trigger('click');
        await waitTime();
        expect(wrapper.findAll('li').length).toBe(30);
      });
    });

    describe('Virtual Tree Scroll', () => {
      it('virtual scroll ', async () => {
        const dataSrc = createBigDataSource(10, 10, 0);
        const wrapper = createVirtualTreeWrapper({
          propsData: {
            dataSource: dataSrc,
            defaultExpandAll: true,
            selectedKeys: ['0-0-0'],
            viewCount: 20,
          },
          scopedSlots: {
            renderContent: '<span slot-scope="{node}">{{node.title}}-level-{{node.level}}</span>',
          },
        });
        const vslRef = wrapper.find('.virtual-wrap');
        wrapper.vm.$refs.vtl.$refs.vsl.scrollTop = 1500;
        vslRef.trigger('scroll');
        await waitTime(500);
        wrapper.vm.$nextTick(() => {
          const nodeArray = wrapper.findAll('.ux-tree-node-content-wrapper');
          expect(nodeArray.length).toEqual(40);
          expect(nodeArray.at(0).text()).not.toBe('0-0-level-0');
        });
      });
    });
  });
});
