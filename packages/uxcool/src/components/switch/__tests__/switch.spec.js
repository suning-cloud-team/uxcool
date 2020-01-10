import { mount } from '@suning/v-test-utils';
import Vue from 'vue';
import UxSwitch from '..';

describe('UxSwitch', () => {
  const propsData = {
    checked: false,
    loading: true,
    disabled: false,
    checkedChildren: 'checked $',
    uncheckedChildren: 'unchecked $'
  };
  const vmWrapper = mount(Vue.extend({
    components: { UxSwitch },
    data() {
      return { ...propsData };
    },
    template: `<ux-switch
      v-model="checked"
      ref="switch"
      :loading="loading"
      :disabled="disabled"
      :checked-children="checkedChildren"
      :unchecked-children="uncheckedChildren"
    />`
  }));

  beforeAll(vmWrapper.vm.$nextTick);

  it('props', async () => {
    expect(vmWrapper.vm.$refs.switch.innerChecked).toBe(propsData.checked);
    expect(vmWrapper.find('.ux-switch-inner').element.innerHTML.trim()).toBe(propsData.uncheckedChildren);
    vmWrapper.trigger('click');

    await vmWrapper.vm.$nextTick();

    expect(vmWrapper.vm.$refs.switch.innerChecked).toBe(vmWrapper.vm.checked);
    expect(vmWrapper.find('.ux-switch-inner').element.innerHTML.trim()).toBe(propsData.checkedChildren);
  });

  it('events', async () => {
    const switchWrapper = mount(UxSwitch);
    switchWrapper.trigger('click');
    const { click, change } = switchWrapper.emitted();

    expect(click.length).toBe(1);
    expect(change.length).toBe(1);

    switchWrapper.setProps({ disabled: true });
    switchWrapper.trigger('click');
    expect(switchWrapper.vm.innerChecked).toBe(true);
  });
});
