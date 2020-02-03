import {
  mount, waitTime, $, removePopup, createWrapper
} from '@suning/v-test-utils';
import UxCascader from '../index';

const dataSource = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        disabled: true,
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'shanghai',
        label: '上海',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
describe('cascader', () => {
  it('render popup correctly', async () => {
    const popupVisbleChangeFn = jest.fn();
    const wrapper = mount(UxCascader, {
      propsData: { dataSource },
      listeners: { 'popup-visible-change': popupVisbleChangeFn },
      attachToDocument: true,
      sync: false,
    });
    wrapper.trigger('focus');
    await waitTime(10);
    wrapper.trigger('click');
    await waitTime(100);
    expect(popupVisbleChangeFn).toBeCalled();
    expect($('[role="popup"]').length).toBe(1);
    wrapper.trigger('click');
    await waitTime(20);
    expect(wrapper.vm.innerVisible).toBe(false);
    wrapper.setProps({ popupVisible: true });
    await waitTime(100);
    expect(wrapper.vm.innerVisible).toBe(true);
    wrapper.destroy();
    removePopup();
  });

  it('different trigger methods', async () => {
    const wrapper = mount(UxCascader, {
      propsData: { dataSource, expandTrigger: 'click' },
      attachToDocument: true,
      sync: false,
    });
    wrapper.trigger('focus');
    await waitTime(10);
    wrapper.trigger('click');
    await waitTime(100);
    $('[title="Zhejiang"]:first').trigger('mouseenter');
    await waitTime(100);
    expect($('ul').length).toBe(1);
    $('[title="Zhejiang"]:first').trigger('click');
    await waitTime(100);
    expect($('ul').length).toBe(2);
    wrapper.destroy();
    removePopup();
  });

  it('allow clear', async () => {
    const value = ['shanghai', 'shanghai'];
    const wrapper = mount(
      {
        template: `
      <ux-cascader :dataSource="dataSource" v-model="value"></ux-cascader>
    `,
        components: { UxCascader },
        data() {
          return {
            value,
            dataSource,
          };
        },
      },
      { attachToDocument: true, sync: false }
    );
    await waitTime(100);
    wrapper.find('.ux-cascader-picker-clear').trigger('click');
    expect(wrapper.vm.value.length).toBe(0);
    wrapper.destroy();
    removePopup();
  });

  it('load data', async () => {
    const loadData = () => new Promise((resolve) => {
      resolve([
        {
          label: 'a1',
          value: 'a1',
        },
      ]);
    });
    const data = [
      {
        label: 'a',
        value: 'a',
      },
      {
        label: 'b',
        value: 'b',
      },
    ];
    const wrapper = mount(UxCascader, {
      propsData: {
        loadData,
      },
      attachToDocument: true,
      sync: false,
    });
    wrapper.trigger('focus');
    await waitTime(10);
    wrapper.setProps({ dataSource: {} });
    await waitTime(20);
    wrapper.setProps({ dataSource: data });
    wrapper.trigger('click');
    await waitTime(100);
    $('[title="a"]').trigger('click');
    await waitTime(100);
    expect($('[title="a1"]').length).toBe(1);
    wrapper.destroy();
    removePopup();
  });

  it('focus function', async () => {
    const value = ['zhejiang', 'hangzhou', 'xihu'];
    const wrapper = mount(UxCascader, {
      propsData: {
        dataSource,
        size: 'large',
        value,
      },
      attachToDocument: true,
      sync: false,
    });
    wrapper.vm.focus();
    wrapper.trigger('click');
    await waitTime(100);
    expect(wrapper.classes('ux-cascader-picker-lg')).toBe(true);
    wrapper.vm.blur();
    await waitTime(20);
    expect(wrapper.vm.inputFocus).toBe(false);
    wrapper.destroy();
    removePopup();
  });

  it('search input', async () => {
    const wrapper = mount(UxCascader, {
      propsData: {
        size: 'large',
        showSearch: true,
        expandTrigger: 'hover'
      },
      attachToDocument: true,
      sync: false,
    });
    await waitTime();
    wrapper.setProps({ dataSource });
    const searchvalue = 'zhengjiang';
    wrapper.trigger('focus');
    const inputElement = wrapper.find('input');
    inputElement.trigger('click');
    await waitTime(100);
    expect(wrapper.vm.inputFocus).toBe(true);
    inputElement.element.value = searchvalue;
    inputElement.trigger('input');
    expect(wrapper.vm.searchValue).toBe(searchvalue);
    // console.log(wrapper.html());
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    const firstMenuItem = popupWrapper.find('.ux-cascader-menu-item');
    firstMenuItem.trigger('mouseenter');
    await waitTime(200);
    expect(popupWrapper.findAll('.ux-cascader-menu').length).toBe(2);
    firstMenuItem.trigger('mouseleave');
    inputElement.trigger('blur');
    removePopup();
  });
});
describe('change on select', () => {
  it('true', async () => {
    const wrapper = mount(
      {
        template: `
        <ux-cascader :dataSource="dataSource" v-model="value" change-on-select></ux-cascader>
      `,
        components: { UxCascader },
        data() {
          return {
            value: [],
            dataSource,
          };
        },
      },
      { attachToDocument: true, sync: false }
    );
    wrapper.trigger('focus');
    await waitTime(10);
    wrapper.trigger('click');
    await waitTime(100);
    $('[title="上海"]')[0].click();
    await waitTime(100);
    expect(wrapper.vm.value.length).toBe(1);
    expect(wrapper.vm.value).toContain('shanghai');
    wrapper.destroy();
    removePopup();
  });

  it('false', async () => {
    const wrapper = mount(
      {
        template: `
        <ux-cascader :dataSource="dataSource" v-model="value"></ux-cascader>
      `,
        components: { UxCascader },
        data() {
          return {
            value: [],
            dataSource,
          };
        },
      },
      { attachToDocument: true, sync: false }
    );
    wrapper.trigger('focus');
    await waitTime(10);
    wrapper.trigger('click');
    await waitTime(100);
    $('[title="上海"]')[0].click();
    await waitTime(100);
    expect(wrapper.vm.value.length).toBe(0);
    wrapper.destroy();
    removePopup();
  });
});
