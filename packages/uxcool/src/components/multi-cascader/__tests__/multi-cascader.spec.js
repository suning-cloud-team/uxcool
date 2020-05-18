import { mount, waitTime, getPortal } from '@cloud-sn/v-test-utils';
import MultiCascader from '../index';

const dataSource = [
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'xuanwu',
            label: '玄武',
          },
          {
            value: 'gulou',
            label: '鼓楼',
          },
          {
            value: 'qinhuai',
            label: '秦淮',
            disabled: true,
          },
          {
            value: 'jianye',
            label: '建邺',
          },
          {
            value: 'jiangning',
            label: '江宁',
            disabled: true,
          },
          {
            value: 'yuhua',
            label: '雨花',
          },
          {
            value: 'pukou',
            label: '浦口',
          },
          {
            value: 'qixia',
            label: '栖霞',
          },
          {
            value: 'liuhe',
            label: '六合',
          },
          {
            value: 'lishui',
            label: '溧水',
          },
          {
            value: 'gaochun',
            label: '高淳',
          },
        ],
      },
    ],
  },
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
          {
            value: 'binjiang',
            label: '滨江',
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
];

describe('MultiCascader', () => {
  it('renders popup correctly', async () => {
    const popupVisibleChangeFn = jest.fn();
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
      },
      listeners: {
        'popup-visible-change': popupVisibleChangeFn,
      },
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    expect(popupVisibleChangeFn).toBeCalled();
    expect(wrapper.vm.innerVisible).toBe(true);
    expect(portal.contains('[role="align-popup"]')).toBe(true);
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(popupVisibleChangeFn).toBeCalled();
    expect(wrapper.vm.innerVisible).toBe(false);
  });

  it('renders value correctly', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.innerValue).toEqual([]);
    expect(wrapper.find('.ux-multi-cascader-placeholder').text()).toBe('请选择');
    expect(wrapper.contains('.ux-multi-cascader-clear')).toBe(false);

    wrapper.setProps({
      value: [['jiangsu', 'nanjing', 'xuanwu']],
    });
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    expect(wrapper.text()).toBe('江苏 / 南京 / 玄武');
    expect(wrapper.contains('.ux-multi-cascader-clear')).toBe(true);
    expect(
      portal.find('[title="江苏"]').contains('.ux-multi-cascader-checkbox-indeterminate')
    ).toBe(true);
    portal.find('[title="江苏"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(
      portal.find('[title="南京"]').contains('.ux-multi-cascader-checkbox-indeterminate')
    ).toBe(true);
    portal.find('[title="南京"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(portal.find('[title="玄武"]').contains('.ux-multi-cascader-checkbox-checked')).toBe(
      true
    );
  });

  it('render value correctly when the value set is invalid', async () => {
    const enabledDistrictsOfNanJing = dataSource[0].children[0].children.filter(
      ({ disabled }) => !disabled
    );
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          dataSource,
          value: ['foo', ['bar'], ['jiangsu']],
        };
      },
      template: '<multi-cascader :data-source="dataSource" v-model="value"/>',
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(enabledDistrictsOfNanJing.length);

    wrapper.find('.ux-multi-cascader-tag-remove').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(
      enabledDistrictsOfNanJing.length - 1
    );
    expect(wrapper.vm.value.length).toBe(enabledDistrictsOfNanJing.length - 1);
  });

  it.each(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'])(
    'render the correct placement: %s',
    async (placement) => {
      const wrapper = mount(MultiCascader, {
        propsData: {
          dataSource,
          'popup-placement': placement,
        },
      });

      await wrapper.vm.$nextTick();
      wrapper.trigger('click');
      await wrapper.vm.$nextTick();
      const portal = await getPortal(wrapper);

      expect(portal.contains(`.ux-multi-cascader-panel-placement-${placement}`)).toBe(true);
    }
  );

  it('allows clearing the value', async () => {
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          dataSource,
          value: [['jiangsu', 'nanjing', 'xuanwu']],
        };
      },
      template: '<multi-cascader :data-source="dataSource" v-model="value"/>',
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(1);
    expect(wrapper.contains('.ux-multi-cascader-clear')).toBe(true);
    wrapper.find('.ux-multi-cascader-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value.length).toBe(0);
  });

  it('disabled component or item', async () => {
    const popupVisibleChangeFn = jest.fn();
    const changeFn = jest.fn();
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          dataSource,
          disabled: true,
          value: [
            ['jiangsu', 'nanjing', 'xuanwu'],
            ['jiangsu', 'nanjing', 'qinhuai'],
          ],
        };
      },
      methods: {
        onPopupVisibleChange() {
          popupVisibleChangeFn();
        },
        onChange() {
          changeFn();
        },
      },
      template: `<multi-cascader
          v-model="value"
          :data-source="dataSource"
          :disabled="disabled"
          @popup-visible-change="onPopupVisibleChange"
          @change="onChange"/>`,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(2);
    expect(wrapper.findAll('.ux-multi-cascader-tag-remove').length).toBe(0);

    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(popupVisibleChangeFn).not.toBeCalled();

    wrapper.setData({
      disabled: false,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag-remove').length).toBe(1);
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();

    expect(popupVisibleChangeFn).toBeCalled();
    const portal = await getPortal(wrapper);

    const province = portal.find('[title="江苏"]');
    province.trigger('click');
    await wrapper.vm.$nextTick();
    expect(province.contains('.ux-multi-cascader-menu-item-active')).toBe(true);
    const city = portal.find('[title="南京"]');
    city.trigger('click');
    await wrapper.vm.$nextTick();
    expect(city.contains('.ux-multi-cascader-menu-item-active')).toBe(true);
    const xw = portal.find('[title="玄武"]');
    const gl = portal.find('[title="鼓楼"]');
    const qh = portal.find('[title="秦淮"]');
    const jn = portal.find('[title="江宁"]');

    expect(xw.contains('.ux-multi-cascader-checkbox-checked')).toBe(true);
    expect(gl.contains('.ux-multi-cascader-checkbox-checked')).toBe(false);
    expect(qh.contains('.ux-multi-cascader-checkbox-checked')).toBe(true);
    expect(qh.contains('.ux-multi-cascader-checkbox-disabled')).toBe(true);
    expect(jn.contains('.ux-multi-cascader-checkbox-disabled')).toBe(true);
    expect(jn.contains('.ux-multi-cascader-checkbox-checked')).toBe(false);

    qh.find('.ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(changeFn).not.toBeCalled();
    expect(qh.contains('.ux-multi-cascader-menu-item-active')).toBe(false);
    gl.find('.ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(changeFn).toBeCalled();
    expect(gl.contains('.ux-multi-cascader-checkbox-checked')).toBe(true);
  });

  it('expands menu when hovered', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        expandTrigger: 'hover',
      },
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();

    const portal = await getPortal(wrapper);
    expect(portal.findAll('.ux-multi-cascader-menu').length).toBe(1);
    portal.find('.ux-multi-cascader-menu-item').trigger('mouseenter');
    await waitTime(200);
    expect(portal.findAll('.ux-multi-cascader-menu').length).toBe(2);
  });

  it('ancestors and descendants are associated', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [],
      },
    });
    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    portal.find('[title="江苏"]').trigger('click');
    await wrapper.vm.$nextTick();
    portal.find('[title="南京"] .ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(portal.find('[title="江苏"]').contains('.ux-multi-cascader-checkbox-checked')).toBe(
      true
    );
    expect(portal.find('[title="南京"]').contains('.ux-multi-cascader-checkbox-checked')).toBe(
      true
    );
    expect(
      portal
        .findAll('.ux-multi-cascader-menu')
        .at(2)
        .findAll('.ux-multi-cascader-checkbox-checked').length
    ).toBe(dataSource[0].children[0].children.filter(({ disabled }) => !disabled).length);
    portal.find('[title="江苏"] .ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(portal.contains('.ux-multi-cascader-checkbox-checked')).toBe(false);
    portal.find('[title="南京"]').trigger('click');
    await wrapper.vm.$nextTick();
    portal.find('[title="玄武"] .ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();
    expect(
      portal.find('[title="江苏"]').contains('.ux-multi-cascader-checkbox-indeterminate')
    ).toBe(true);
    expect(
      portal.find('[title="南京"]').contains('.ux-multi-cascader-checkbox-indeterminate')
    ).toBe(true);
  });

  it('check strictly', async () => {
    const onChange = jest.fn();
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [],
        checkStrict: true,
      },
      listeners: {
        change: onChange,
      },
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();

    const portal = await getPortal(wrapper);
    portal.find('.ux-multi-cascader-checkbox').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(1);
    expect(onChange).toBeCalled();
  });

  it('custom field names', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        value: [['jiangsu', 'nanjing', 'xuanwu']],
        fieldNames: {
          value: 'code',
          label: 'name',
          children: 'items',
        },
        dataSource: [
          {
            code: 'jiangsu',
            name: '江苏',
            items: [
              {
                code: 'nanjing',
                name: '南京',
                items: [
                  {
                    code: 'xuanwu',
                    name: '玄武',
                  },
                  {
                    code: 'jiangning',
                    name: '江宁',
                  },
                ],
              },
            ],
          },
          {
            code: 'shanghai',
            name: '上海',
          },
        ],
      },
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();

    const portal = await getPortal(wrapper);
    expect(portal.findAll('.ux-multi-cascader-menu-item').length).toBe(5);
  });

  it('custom trigger', async () => {
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          dataSource,
          value: [['jiangsu', 'nanjing', 'xuanwu']],
        };
      },
      template: `<multi-cascader :data-source="dataSource" v-model="value">
        <a>trigger</a>
      </multi-cascader>`,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toBe('<a tabindex="0">trigger</a>');
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    expect(portal.exists()).toBe(true);
  });

  it('custom render label', async () => {
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          dataSource,
          values: [['jiangsu', 'nanjing', 'xuanwu']],
        };
      },
      template: `<multi-cascader v-model="values" :data-source="dataSource">
      <template slot="renderLabel" slot-scope="{ value, label }">
        <div v-if="value === 'shanghai'">
          <a style="color:green">{{ label }}</a>
        </div>
        <span v-else>{{ label }}</span>
      </template>
    </multi-cascader>`,
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    expect(portal.find('a').element.style.color).toBe('green');
  });

  it('custom display label', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [['jiangsu', 'nanjing', 'xuanwu']],
        displayRender: (labels) => labels.join('|'),
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe('江苏|南京|玄武');
  });

  it('limits render count', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [
          ['jiangsu', 'nanjing', 'xuanwu'],
          ['jiangsu', 'nanjing', 'gulou'],
          ['jiangsu', 'nanjing', 'qinhuai'],
          ['jiangsu', 'nanjing', 'jiangning'],
        ],
        maxTagCount: 1,
        maxTagPlaceholder: (nodes) => `+${nodes.length}`,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(2);
    expect(
      wrapper
        .findAll('.ux-multi-cascader-tag')
        .at(0)
        .text()
    ).toBe('江苏 / 南京 / 玄武');
    expect(
      wrapper
        .findAll('.ux-multi-cascader-tag')
        .at(1)
        .text()
    ).toBe('+3');
  });

  it('loads async data', async () => {
    const mock = (cnt = 10, level = 2) => Array.from({ length: cnt }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
      isParent: level < 2,
    }));
    const wrapper = mount({
      components: {
        MultiCascader,
      },
      data() {
        return {
          data: mock(4, 0),
          value: [
            ['1', '1'],
            ['1', '1', '1'],
            ['1', '3'],
            ['1', '4'],
          ],
        };
      },
      methods: {
        loadData(node) {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (node) {
                resolve(mock(3, node.level));
              } else {
                resolve(mock(4, 0));
              }
            }, 500);
          });
        },
      },
      template: `<multi-cascader
        v-model="value"
        :data-source="data"
        :load-data="loadData"
        style="width: 300px"
      />`,
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);

    expect(portal.findAll('.ux-multi-cascader-menu').length).toBe(1);
    expect(portal.contains('.ux-multi-cascader-checkbox-checked')).toBe(false);
    expect(wrapper.vm.value).toEqual([
      ['1', '1'],
      ['1', '1', '1'],
      ['1', '3'],
      ['1', '4'],
    ]);

    portal.find('.ux-multi-cascader-menu-item').trigger('click');
    await waitTime(2000);
    expect(
      portal
        .findAll('.ux-multi-cascader-menu')
        .at(1)
        .find('[title="1"]')
        .contains('.ux-multi-cascader-checkbox-checked')
    ).toBe(true);

    portal
      .findAll('.ux-multi-cascader-menu')
      .at(1)
      .find('.ux-multi-cascader-checkbox')
      .trigger('click');
    await waitTime(2000);
    expect(wrapper.vm.value).toEqual([['1', '3']]);
  });

  it.each(['default', 'small', 'large'])('renader different size', async (size) => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        size,
        value: [],
      },
    });

    await wrapper.vm.$nextTick();
    if (size === 'small' || size === 'large') {
      expect(wrapper.classes(`ux-multi-cascader-${size === 'large' ? 'lg' : 'sm'}`)).toBe(true);
    } else {
      expect(wrapper.classes('ux-multi-cascader')).toBe(true);
    }
  });

  it('watches value', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [['jiangsu', 'nanjing', 'xuanwu']],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ux-multi-cascader-tag').length).toBe(1);
    wrapper.setProps({
      value: [['1']],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('.ux-multi-cascader-tag')).toBe(false);
  });

  it('watches datasource', async () => {
    const wrapper = mount(MultiCascader, {
      propsData: {
        dataSource,
        value: [['jiangsu', 'nanjing', 'xuanwu']],
      },
    });

    await wrapper.vm.$nextTick();
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const portal = await getPortal(wrapper);
    expect(portal.find('[title="江苏"]').classes('ux-multi-cascader-menu-item-active')).toBe(true);

    wrapper.setProps({
      dataSource: [
        {
          value: 'shenzhen',
          label: '深圳',
        },
        ...dataSource,
      ],
    });
    await wrapper.vm.$nextTick();
    expect(portal.find('[title="江苏"]').classes('ux-multi-cascader-menu-item-active')).toBe(true);
  });
});
