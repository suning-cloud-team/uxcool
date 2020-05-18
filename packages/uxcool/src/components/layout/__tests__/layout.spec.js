import { mount } from '@cloud-sn/v-test-utils';
import UxLayout from '../index';

describe('UxLayout', () => {
  it('render correctly by default', () => {
    const wrapper = mount(UxLayout);
    expect(wrapper.classes('ux-layout')).toBe(true);
    expect(wrapper.classes('header-fixed')).toBe(true);
    expect(wrapper.classes('sidebar-fixed')).toBe(true);
    expect(wrapper.contains('.ux-layout-header')).toBe(true);
    expect(wrapper.contains('.ux-layout-sidebar')).toBe(true);
    expect(wrapper.contains('.ux-layout-main')).toBe(true);
    expect(wrapper.contains('.ux-layout-footer')).toBe(true);
  });

  it.each(['top', 'side'])('render type %s', (type) => {
    const wrapper = mount(UxLayout, {
      propsData: {
        type,
      },
    });

    expect(wrapper.classes(`ux-layout-${type}-navigation`)).toBe(true);
  });

  it('render slot correctly', () => {
    const wrapper = mount(UxLayout, {
      slots: {
        header: '<div class="header">header</div>',
        sidebar: '<div class="sidebar">sidebar</div>',
        footer: '<div class="footer">footer</div>',
        default: '<section class="main"></section>',
      },
    });

    expect(wrapper.find('.header').html()).toBe('<div class="header">header</div>');
    expect(wrapper.find('.sidebar').html()).toBe('<div class="sidebar">sidebar</div>');
    expect(wrapper.find('.footer').html()).toBe('<div class="footer">footer</div>');
    expect(wrapper.find('.main').html()).toBe('<section class="main"></section>');
  });

  it('hide header, sidebar and footer', () => {
    const wrapper = mount(UxLayout, {
      propsData: {
        noHeader: true,
        noSidebar: true,
        noFooter: true,
      },
      slots: {
        header: '<div class="header">header</div>',
        sidebar: '<div class="sidebar">sidebar</div>',
        footer: '<div class="footer">footer</div>',
        default: '<section class="main"></section>',
      },
    });

    expect(wrapper.find('.ux-layout-header').exists()).toBe(false);
    expect(wrapper.find('.ux-layout-sidebar').exists()).toBe(false);
    expect(wrapper.find('.ux-layout-footer').exists()).toBe(false);
  });

  it('fixed layout', () => {
    const wrapper = mount(UxLayout, {
      propsData: {
        headerFixed: true,
        sidebarFixed: true,
      },
    });

    expect(wrapper.classes('header-fixed')).toBe(true);
    expect(wrapper.classes('sidebar-fixed')).toBe(true);
  });
});
