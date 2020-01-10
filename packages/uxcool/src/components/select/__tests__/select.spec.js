import { mount, createWrapper, waitTime } from '@suning/v-test-utils';
import { UxSelect } from '..';

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
