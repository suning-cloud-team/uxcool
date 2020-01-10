import { mountPickerFactory, createWrapper, triggerEvent } from '@suning/v-test-utils';
import Rate from '../rate';

describe.skip('rate', () => {
  // TODO: 这个用例要重写 hw 2020-01-09
  const mountRate = mountPickerFactory(Rate);

  describe('props & events', () => {
    const propsData = {
      count: 6,
      allowHalf: true,
      allowClear: true,
      character: 'A',
    };
    let wrapper = null;
    beforeEach(async () => {
      wrapper = await mountRate({ propsData });
    });

    it('props', async () => {
      expect(wrapper.vm.$props.count).toBe(propsData.count);
      expect(wrapper.vm.$props.value).toBe(0);
      expect(wrapper.vm.$props.disabled).toBe(false);
      expect(wrapper.vm.$props.allowHalf).toBe(propsData.allowHalf);
      expect(wrapper.vm.$props.allowClear).toBe(propsData.allowClear);
      expect(wrapper.vm.$props.character).toBe(propsData.character);
      expect(wrapper.vm.$props.autofocus).toBe(false);
    });

    it('events', async () => {
      await triggerEvent(wrapper, 'click');
      expect(wrapper.emitted().change.length).toBe(1);
      const childWrapper = createWrapper(wrapper.vm.$el.lastElementChild);
      await triggerEvent(childWrapper, 'mouseover', 100);
      expect(wrapper.emitted()['hover-change'].length).toBe(1);
    });

    it('disabled', async () => {
      wrapper.setProps({ disabled: true });
      await triggerEvent(wrapper, 'click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().change.length).toBe(1);
    });
  });
  describe('slots', () => {
    const character = 'test char';
    let wrapper = null;

    beforeEach(async () => {
      wrapper = await mountRate({
        props: {
          character: 'B',
        },
        scopedSlots: {
          character: `<span slot="character" slot-scope="useless">${character}</span>`,
        },
      });
    });

    it('slots', () => {
      expect(wrapper.find('span').text()).toBe(character);
    });
  });
});
