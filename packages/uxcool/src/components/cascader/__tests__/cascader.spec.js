import {
  mount, waitTime, $, removePopup
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
      dataSource: data,
      loadData,
    },
    attachToDocument: true,
    sync: false,
  });
  wrapper.trigger('focus');
  await waitTime(10);
  wrapper.trigger('click');
  await waitTime(100);
  $('[title="a"]').trigger('click');
  await waitTime(100);
  expect($('[title="a1"]').length).toBe(1);
  wrapper.destroy();
  removePopup();
});
