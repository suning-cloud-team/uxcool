import { mountPickerFactory, createWrapper, triggerEvent, mount, waitTime } from '@suning/v-test-utils';
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

describe('rate', () => {
  it('render correctly', async () => {
    const wrapper = mount(Rate);
    expect(wrapper.findAll('.ux-rate-star').length).toBe(5);
    expect(wrapper.findAll('.ux-rate-star-zero').length).toBe(5);
    wrapper.setProps({value: 3});
    await waitTime();
    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(3);
    expect(wrapper.findAll('.ux-rate-star-zero').length).toBe(2);
    expect(wrapper.findAll('li').at(2).classes('ux-rate-star-full')).toBe(true);
    expect(wrapper.findAll('li').at(3).classes('ux-rate-star-zero')).toBe(true);
    wrapper.setProps({allowHalf: true});
    wrapper.setProps({value: 2.5});
    await waitTime();
    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(2);
    expect(wrapper.findAll('.ux-rate-star-half').length).toBe(1);
    expect(wrapper.findAll('.ux-rate-star-zero').length).toBe(2);
    expect(wrapper.findAll('li').at(2).classes('ux-rate-star-half')).toBe(true);
    await triggerEvent(wrapper.findAll('li').at(2), 'click');
    console.log(wrapper.html());
  });

  it('event correctly', async () => {
    const changeFn = jest.fn();
    const focusFn = jest.fn();
    const blurFn = jest.fn();
    const hoverChangeFn = jest.fn();
    const wrapper = mount(Rate, {
      propsData: {
        autofocus: true
      },
      listeners: {
        change: changeFn,
        focus: focusFn,
        blur: blurFn,
      },
    });
    wrapper.vm.$on('hover-change', hoverChangeFn);
    expect(focusFn).toHaveBeenCalledTimes(1);
    await triggerEvent(wrapper, 'mouseenter');
    const targetStar = wrapper.findAll('li').at(1);
    await triggerEvent(targetStar, 'mousemove');
    expect(hoverChangeFn).toHaveBeenCalled();
    expect(wrapper.vm.$data.hoverValue).toBe(2);
    expect(wrapper.vm.$data.innerValue).toBe(0);
    await triggerEvent(targetStar, 'click');
    expect(wrapper.vm.$data.innerValue).toBe(2);
    await triggerEvent(wrapper, 'focus');
    expect(focusFn).toHaveBeenCalledTimes(2);
    await triggerEvent(wrapper, 'mouseleave');
    expect(wrapper.vm.$data.hoverValue).not.toBeDefined();
    await triggerEvent(wrapper, 'blur');
    expect(blurFn).toHaveBeenCalledTimes(1);
  });

  it('method correctly', async () => {
    const focusFn = jest.fn();
    const blurFn = jest.fn();
    const wrapper = mount(Rate, {
      listeners: {
        focus: focusFn,
        blur: blurFn,
      },
    });
    wrapper.vm.focus();
    expect(focusFn).toHaveBeenCalledTimes(1);
    wrapper.vm.blur();
    expect(blurFn).toHaveBeenCalledTimes(1);
  });

  it('render disabled correctly', async () => {
    const wrapper = mount(Rate, {
      propsData: {
        value: 3,
        disabled: true,
        autofocus: true
      }
    });

    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(3);
    await triggerEvent(wrapper.findAll('li').at(1), 'mousemove');
    expect(wrapper.emitted('hover-change')).toBeFalsy();
    await triggerEvent(wrapper.findAll('li').at(3), 'click');
    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(3);
    wrapper.setProps({disabled: false});
    await waitTime();
    await triggerEvent(wrapper.findAll('li').at(3), 'click');
    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(4);
    await triggerEvent(wrapper.findAll('li').at(3), 'click');
    expect(wrapper.findAll('.ux-rate-star-full').length).toBe(0);
  });

  it('slots', async () => {
    const character = 'test char';
    const mountRate = mountPickerFactory(Rate);
    const wrapper = await mountRate({
      props: {
        character: 'B',
      },
      scopedSlots: {
        character: `<span slot="character" slot-scope="useless">${character}</span>`,
      },
    });
    expect(wrapper.find('span').text()).toBe(character);
  });
});
