import {
  mountPickerFactory, waitTime, getPortal, triggerEvent
} from '@cloud-sn/v-test-utils';
import TreeSelect from '../index';

const mountTreeSelect = mountPickerFactory(TreeSelect);
function getTreeData() {
  return [
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
          disabled: true,
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
}

describe('treeSelect', () => {
  it('render correctly', async () => {
    const value = ['0-0'];
    const treeData = getTreeData();
    const wrapper = await mountTreeSelect({
      propsData: {
        value,
        treeData,
        showSearch: true
      }
    });
    await waitTime();
    expect(wrapper.find('.ux-select-selection-selected-value').text()).toBe('0-0');
    const popup = await getPortal(wrapper);
    expect(popup.find('.ux-select-dropdown').attributes('style')).toEqual(expect.stringContaining('display: none'));
    await triggerEvent(wrapper.find('.ux-select-selection__rendered'), 'click');
    expect(popup.find('.ux-select-tree-node-selected').text()).toBe('0-0');
    expect(popup.find('.ux-select-dropdown').attributes('style')).toEqual(expect.not.stringContaining('display: none'));
    await triggerEvent(wrapper.find('.ux-select-selection__clear'), 'click');
    expect(wrapper.find('.ux-select-selection__rendered').text()).toBe('Please select');
    expect(popup.find('.ux-select-tree-node-selected').exists()).toBeFalsy();
  });

  it('render multiple correctly', async () => {
    const value = ['123', '0-0-1-0', '0-0-0-0', '0-111'];
    const treeData = getTreeData();
    const showCheckedStrategy = 'SHOW_ALL';
    const wrapper = await mountTreeSelect({
      propsData: {
        value,
        showSearch: true,
        multiple: true,
        treeCheckable: true,
        clearDisabled: false,
        showCheckedStrategy,
      }
    });
    wrapper.setProps({ treeData });
    await waitTime();
    wrapper.setProps({ value: ['0-1', '0-0-0-2'] });
    await waitTime(1000);
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(10);
    wrapper.setProps({ visible: true });
    await waitTime();
    const popup = await getPortal(wrapper);
    expect(popup.find('.ux-select-tree-treenode-checkbox-indeterminate').text()).toBe('0-0');
    expect(popup.find('.ux-select-tree-treenode-checkbox-checked').text()).toBe('0-1');

    await triggerEvent(wrapper.find('.ux-select-selection__choice__remove'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(9);
    await triggerEvent(popup.find('[title="0-2"]'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(10);
    await triggerEvent(wrapper.find('.ux-select-selection__clear'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(0);
  });

  it('event and search correctly', async () => {
    const treeData = getTreeData();
    const wrapper = await mountTreeSelect({
      propsData: {
        treeData,
        showSearch: true,
        visible: true
      }
    });
    const popup = await getPortal(wrapper);
    await triggerEvent(popup.find('[title="0-1"]'), 'click');
    expect(wrapper.emitted().change).toBeTruthy();
    await triggerEvent(wrapper.find('.ux-select-selection__rendered'), 'click');
    const searchInput = popup.find('.ux-select-dropdown-search').find('input');
    searchInput.setValue('0-0-0-1');
    await waitTime();
    expect(popup.findAll('.ux-select-tree-title').length).toBe(3);
    await triggerEvent(wrapper.find('.ux-select-selection__rendered'), 'click');
    await triggerEvent(popup.find('.ux-select-search__field__placeholder'), 'click');
    expect(searchInput.element.value).toBe('');
  });

  it('checkable correctly', async () => {
    const treeData = getTreeData();
    const wrapper = await mountTreeSelect({
      propsData: {
        treeData,
        showSearch: true,
        visible: true,
        treeDefaultExpandAll: true,
        treeCheckable: true,
        allowClear: false
      }
    });
    const popup = await getPortal(wrapper);
    const k000Node = popup.find('.ux-select-tree-child-tree').find('li');
    // 默认 SHOW_CHILD
    await triggerEvent(k000Node.find('.ux-select-tree-checkbox'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(2);
    expect(wrapper.findAll('.ux-select-selection__choice__content').at(0).text()).toBe('0-0-0-1');
    await triggerEvent(k000Node.find('.ux-select-tree-checkbox'), 'click');

    let showCheckedStrategy = 'SHOW_PARENT';
    wrapper.setProps({ showCheckedStrategy });
    await waitTime();
    await triggerEvent(k000Node.find('.ux-select-tree-checkbox'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(1);
    expect(wrapper.find('.ux-select-selection__choice__content').text()).toBe('0-0-0');
    await triggerEvent(wrapper.find('.ux-select-selection__choice__remove'), 'click');

    showCheckedStrategy = 'SHOW_ALL';
    wrapper.setProps({ showCheckedStrategy });
    await waitTime();
    await triggerEvent(k000Node.find('.ux-select-tree-checkbox'), 'click');
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(3);
  });
});
