import Vue from 'vue';
import { mount } from '@suning/v-test-utils';
import UxBox from '../index';

describe('Uxbox', () => {
  it('renders the correct markup by default', async () => {
    const wrapper = mount(UxBox);

    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.ux-box')).toBe(true);
    expect(wrapper.contains('.ux-box-body')).toBe(true);
    expect(wrapper.find('.ux-box-header').exists()).toBe(false);
  });

  it('renders the correct header when both prop and slot are set', async () => {
    const wrapper1 = mount(UxBox, {
      propsData: {
        title: 'title from prop',
        icon: 'all-d',
      },
    });
    const wrapper2 = mount(UxBox, {
      slots: {
        title: 'title from slot',
        icon: '<i class="fa"></i>',
      },
    });
    const wrapper3 = mount(UxBox, {
      propsData: {
        title: 'title from prop',
        icon: 'all-d',
      },
      slots: {
        title: 'title from slot',
        icon: '<i class="fa"></i>',
      },
    });

    await Vue.nextTick();

    expect(wrapper1.contains('.ux-box-title')).toBe(true);
    expect(wrapper2.contains('.ux-box-title')).toBe(true);
    expect(wrapper3.contains('.ux-box-title')).toBe(true);
    expect(wrapper1.find('.ux-box-title').text()).toBe('title from prop');
    expect(wrapper2.find('.ux-box-title').text()).toBe('title from slot');
    expect(wrapper3.find('.ux-box-title').text()).toBe('title from slot');
    expect(wrapper1.contains('.ux-box-icon')).toBe(true);
    expect(wrapper1.contains('.fu-all-d')).toBe(true);
    expect(wrapper2.contains('.fa')).toBe(true);
    expect(wrapper3.contains('.fa')).toBe(true);
  });

  it('renders actions', async () => {
    const wrapper = mount(UxBox, {
      slots: {
        actions: '<button>action</button>',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.contains('button')).toBe(true);
  });

  it.each([
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
    'rgb(51, 51, 51)',
    'lightblue',
  ])('renders color %s correctly', async (color) => {
    const wrapper = mount(UxBox, {
      propsData: {
        title: color,
        color,
      },
    });
    await wrapper.vm.$nextTick();

    const builtInColors = [
      'pink',
      'red',
      'yellow',
      'orange',
      'cyan',
      'green',
      'blue',
      'purple',
      'geekblue',
      'magenta',
      'volcano',
      'gold',
      'lime',
    ];

    const isBuiltInColor = builtInColors.indexOf(color) > -1;
    expect(wrapper.classes(`ux-box-${color}`)).toBe(isBuiltInColor);
    expect(wrapper.classes('ux-box-solid')).toBe(!!color);
    expect(wrapper.find('.ux-box-header').element.style.background).toBe(
      isBuiltInColor ? '' : color
    );
  });

  it('render flex correctly', async () => {
    const wrapper = mount(UxBox, {
      propsData: {
        flex: false,
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes('ux-box-flex')).toBe(false);

    wrapper.setProps({
      flex: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('ux-box-flex')).toBe(true);
  });

  it('render body class correctly', async () => {
    const wrapper = mount(UxBox, {
      propsData: {
        bodyClass: 'foo',
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.contains('.foo')).toBe(true);
  });

  it('render body style correctly', async () => {
    const wrapper = mount(UxBox, {
      propsData: {
        bodyStyle: { padding: 0 },
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.ux-box-body').element.style.padding).toBe('0px');
  });
});
