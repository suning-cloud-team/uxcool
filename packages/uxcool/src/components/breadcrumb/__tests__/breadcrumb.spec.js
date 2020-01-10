import { mount } from '@suning/v-test-utils';
import Vue from 'vue';
import { UxBreadcrumb, UxBreadcrumbItem } from '../index';

describe('use custom separator', () => {
  it('use string', () => {
    const wrapper = mount({
      render() {
        return (
          <UxBreadcrumb separator="A">
            <UxBreadcrumbItem>item1</UxBreadcrumbItem>
            <UxBreadcrumbItem>item2</UxBreadcrumbItem>
          </UxBreadcrumb>
        );
      },
    });
    const saperatorElement = wrapper.find('.ux-breadcrumb-separator');
    expect(saperatorElement.element.innerHTML).toBe('A');
  });
  it('use vnode', async () => {
    const { $createElement } = new Vue();
    const getCustomVNodeSeparator = (h) => h('span', 'sss');
    const wrapper = mount({
      render() {
        return (
          <UxBreadcrumb separator={() => getCustomVNodeSeparator($createElement)}>
            <UxBreadcrumbItem>item1</UxBreadcrumbItem>
            <UxBreadcrumbItem>item2</UxBreadcrumbItem>
          </UxBreadcrumb>
        );
      },
    });
    const saperatorElement = wrapper.find('.ux-breadcrumb-separator');
    expect(saperatorElement.element.children[0].tagName).toBe('SPAN');
    expect(saperatorElement.element.children[0].innerHTML).toBe('sss');
  });
});
