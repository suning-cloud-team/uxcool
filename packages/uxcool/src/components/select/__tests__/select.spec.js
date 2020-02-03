import {
  mount, createWrapper, waitTime, $, removePopup
} from '@suning/v-test-utils';
import { UxSelect } from '..';
import { UxInput } from '../../input';

describe('UxSelect', () => {
  const dataSource = [
    { label: 'first', value: 1 },
    { label: 'second', value: 2 },
  ];

  const propsDataOfNormal = {
    allowClear: true,
    showSearch: true,
    notFoundContent: 'empty content $',
    size: 'large',
    placeholder: 'A placeholder $',
    optionLabelProp: 'value',
  };
  const vmWrapper = mount(UxSelect, {
    propsData: propsDataOfNormal,
  });

  beforeAll(vmWrapper.vm.$nextTick);

  test('placeholder', () => {
    expect(vmWrapper.find('.ux-select-selection__placeholder').element.innerHTML).toBe(
      propsDataOfNormal.placeholder
    );
  });

  test('popup visible change', async () => {
    vmWrapper.trigger('click');
    await vmWrapper.vm.$nextTick();
    expect(vmWrapper.emitted()['popup-visible-change'].length).toBe(1);
  });

  test('Empty hints', () => {
    const virtualListWrapper = createWrapper(vmWrapper.vm.$refs.virtualListRef);
    expect(virtualListWrapper.find('li').element.innerHTML).toBe(propsDataOfNormal.notFoundContent);
  });

  test('Props Of Default', async () => {
    vmWrapper.setProps({ dataSource });
    await vmWrapper.vm.$nextTick();
    const virtualListWrapper = createWrapper(vmWrapper.vm.$refs.virtualListRef);
    expect(virtualListWrapper.findAll('li').length).toBe(dataSource.length);
  });

  test('select option', async () => {
    const virtualListWrapper = createWrapper(vmWrapper.vm.$refs.virtualListRef);
    virtualListWrapper.find('.ux-select-dropdown-menu-item').trigger('click');
    await waitTime(100);
    const emitted = vmWrapper.emitted();
    expect(emitted.change.length).toBe(1);
    expect(emitted.select.length).toBe(1);
    // expect(emitted['popup-visible-change'].length).toBe(2);
    expect(vmWrapper.vm.innerValue).toContain(dataSource[0].value);
  });

  test('watch change', async () => {
    vmWrapper.setProps({ value: 2 });
    await vmWrapper.vm.$nextTick();
    const { innerVisible } = vmWrapper.vm;
    expect(vmWrapper.vm.innerValue).toContain(dataSource[1].value);
    vmWrapper.setProps({ visible: !innerVisible });
    await waitTime(20);
    expect(vmWrapper.vm.innerVisible).toBe(!innerVisible);
  });
});

describe('UxSelect tag mode', () => {
  const propsData = {
    mode: 'tags',
    dataSource: [
      { label: 'labelA', value: 1 },
      { label: 'labelB', value: 'B' },
      { label: 'lalbeC', value: 3 },
    ],
    maxTagCount: 1,
    maxTagPlaceholder: 'extra $',
  };
  const vmWrapper = mount(UxSelect, {
    propsData,
  });

  beforeAll(async () => {
    vmWrapper.trigger('click');
    await waitTime(100);
    const virtualListWrapper = createWrapper(vmWrapper.vm.$refs.virtualListRef);
    const itemsWrapper = virtualListWrapper.findAll('.ux-select-dropdown-menu-item');
    itemsWrapper.at(0).trigger('click');
    itemsWrapper.at(1).trigger('click');
    await waitTime(100);
  });

  test('after select', () => {
    expect(vmWrapper.vm.innerValue).toContain(propsData.dataSource[0].value);
    expect(vmWrapper.vm.innerValue).toContain(propsData.dataSource[1].value);
    const extraElWrapper = vmWrapper.findAll('.ux-select-selection__choice__content');
    expect(extraElWrapper.length).toBe(2);
    expect(extraElWrapper.at(1).element.innerHTML).toBe(propsData.maxTagPlaceholder);
  });

  test('deselect event', async () => {
    expect(vmWrapper.emitted().deselect).toBeUndefined();
    vmWrapper.find('.ux-select-selection__choice__remove').trigger('click');
    await vmWrapper.vm.$nextTick();
    expect(vmWrapper.emitted().deselect.length).toBe(1);
  });
});

describe('select', () => {
  it('lazy prop is object correctly', async () => {
    const dataSource = [
      { label: 'first', value: 1 },
      { label: 'second', value: 2 },
      { label: 'third', value: 3 },
      { label: 'four', value: 4 },
    ];

    const propsData = {
      allowClear: true,
      showSearch: true,
      notFoundContent: 'empty content $',
      size: 'large',
      placeholder: 'A placeholder $',
      dataSource,
      lazy: { remain: 2 },
      visible: true
    };
    const vmWrapper = mount(UxSelect, {
      propsData,
    });
    await waitTime(20);
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    expect(popupWrapper.html()).toContain('height: 64px');
    vmWrapper.destroy();
    removePopup();
  });

  it('lazy prop is false correctly', async () => {
    const dataSource = [
      { label: 'firstq', value: 1 },
      { label: 'second', value: 2 },
      { label: 'third', value: 3 },
      { label: 'four', value: 4 },
    ];

    const propsData = {
      allowClear: true,
      size: 'large',
      dataSource,
      lazy: false,
      visible: true
    };
    const vmWrapper = mount(UxSelect, {
      propsData,
    });
    await waitTime(20);
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    expect(popupWrapper.findAll('.ux-select-dropdown-menu-item').length).toBe(dataSource.length);
    vmWrapper.destroy();
    removePopup();
  });

  it('SECRET_COMBOBOX_MODE_DO_NOT_USE mode ', async () => {
    const wrapper = mount({
      template: `
      <ux-select v-model="value"
               :visible="true"
               mode="SECRET_COMBOBOX_MODE_DO_NOT_USE"
               style="width:200px;">
      <ux-option v-for="(item,i) in list"
                 :key="i"
                 :value="item.value"
                 :label="item.label">
        <div>
          <span> {{ item.value }}- {{item.label}}</span>
        </div>
      </ux-option>
    </ux-select>
    `,
      components: {
        UxSelect,
        UxOption: UxSelect.Option,
      },
      data() {
        return {
          value: 'B',
          list: [],
          visible: true
        };
      },
      created() {
        this.list = [
          { value: 'A', label: 'AA_1' },
          { value: 'B', label: 'BB_1' },
          { value: 'C', label: 'CC_1' },
        ];
      },
    });
    await waitTime(20);
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    expect(popupWrapper.findAll('.ux-select-dropdown-menu-item').length).toBe(1);
    wrapper.destroy();
    removePopup();
  });

  it('render option group', async () => {
    const wrapper = mount({
      template: `
    <ux-select :render-group-label="renderGroupLabel"
               ref="uxSelectRef"
               option-label-prop="children"
               style="width:200px;"
               mode="multiple"
               :visible="true"
               allow-clear
               :clear-disabled="false"
               v-model="value">
      <ux-option-group id="1" label="abc">
        <ux-option value="A">A1</ux-option>
        <ux-option value="B"
                   label="B2" />
      </ux-option-group>
      <ux-option id="2" value="C" label="C3">{{ option2 }}</ux-option>
      <ux-option value="D" label="D4" disabled/>
    </ux-select>
    `,
      components: {
        UxSelect,
        UxOption: UxSelect.Option,
        UxOptionGroup: UxSelect.Group,
      },
      data() {
        return {
          option2: 'c31',
          value: ['D', 'F']
        };
      },
      methods: {
        renderGroupLabel(option) {
          return <span>{ option.label } </span>;
        }
      }
    });
    await waitTime(20);
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    expect(popupWrapper.findAll('.ux-select-dropdown-menu-item').length).toBe(4);
    popupWrapper.find('.ux-select-dropdown-menu-item').trigger('click');
    await waitTime(20);
    wrapper.find('.ux-select-selection__rendered').trigger('mouseenter');
    await waitTime(100);
    wrapper.find('.ux-select-selection__clear').trigger('click');
    wrapper.find('.ux-select-selection__clear').trigger('mousedown');
    await waitTime(100);
    expect(wrapper.findAll('.ux-select-selection__choice').length).toBe(1);
    wrapper.destroy();
    removePopup();
  });
});


describe('Uxselect with search', () => {
  it('test for searchinput', async () => {
    const searchFn = jest.fn();
    const deselectFn = jest.fn();

    const dataSource = [
      { label: 'first', value: 1 },
      { label: 'second', value: 2 },
    ];

    const propsData = {
      showSearch: true,
      size: 'large',
      dataSource,
    };
    const wrapper = mount(UxSelect, {
      propsData,
      listeners: {
        search: searchFn,
        deselect: deselectFn,
      },
      attachToDocument: true,
      sync: false,
    });

    const inputElement = wrapper.find('input');
    inputElement.element.value = 'a';
    inputElement.trigger('input');
    // inputElement.trigger('change');
    expect(searchFn).toHaveBeenCalledTimes(1);
    await waitTime(20);
    wrapper.setProps({ mode: 'tags' });
    wrapper.setProps({ tokenSeparators: [',', '.'] });
    inputElement.element.value = 'bb.c';
    inputElement.trigger('input');
    wrapper.find('.ux-select-search').trigger('blur');
    await waitTime(20);
    expect(wrapper.find('.ux-select-selection__choice__content').text()).toBe('bb');
    wrapper.find('.ux-select-selection__choice__remove').trigger('click');
    expect(deselectFn).toHaveBeenCalledTimes(1);
    wrapper.vm.onSelectorBlur();
    expect(wrapper.vm.searchInputValue).toBe('');
    wrapper.destroy();
  });

  it('test for onMenuDeselect', async () => {
    removePopup();
    const dataSource = [
      { label: 'first', value: 1 },
      { label: 'second', value: 2 },
    ];

    const propsData = {
      showSearch: true,
      size: 'large',
      dataSource,
      value: 1,
      visible: true,
      mode: 'multiple'
    };
    mount(UxSelect, {
      propsData,
      attachToDocument: true,
      sync: false,
    });
    await waitTime(20);
    const popupWrapper = createWrapper($('[role=align-popup]')[0]);
    expect(popupWrapper.find('.ux-select-dropdown-menu-item-selected').text()).toBe('first');
    popupWrapper.find('.ux-select-dropdown-menu-item-selected').trigger('click');
    await waitTime(100);
    expect(popupWrapper.find('.ux-select-dropdown-menu-item-selected').exists()).toBeFalsy();
    removePopup();
  });

  it('mode is SECRET_COMBOBOX_MODE_DO_NOT_USE', async () => {
    const searchFn = jest.fn();
    const getInputElementFn = jest.fn(() => UxInput);

    const dataSource = [
      { label: 'first', value: 1 },
      { label: 'second', value: 2 },
    ];

    const propsData = {
      showSearch: true,
      size: 'large',
      dataSource,
      mode: 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
      getInputElement: getInputElementFn,
      optionLabelProp: 'label',
    };
    mount(UxSelect, {
      propsData,
      listeners: {
        search: searchFn,
      },
      attachToDocument: true,
      sync: false,
    });
    expect(getInputElementFn).toHaveBeenCalledTimes(1);
    await waitTime(20);
  });
});
