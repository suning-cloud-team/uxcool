// 因为divider是一个纯样式组件，只会改变class去匹配外部样式文件中样式，而jest无法检测外部样式，所以只能判断class是否正确

import { mountPickerFactory, waitTime } from '@suning/v-test-utils';
import Divider from '../index';

const mountDivider = mountPickerFactory(Divider);
describe('divider', () => {
  it('render divider correctly', async () => {
    const wrapper = await mountDivider();
    expect(wrapper.classes('ux-divider-horizontal')).toBeTruthy();
    wrapper.setProps({ type: 'vertical' });
    await waitTime();
    expect(wrapper.classes('ux-divider-vertical')).toBeTruthy();
    wrapper.setProps({ dashed: true });
    await waitTime();
    expect(wrapper.classes('ux-divider-dashed')).toBeTruthy();
  });

  it('render text divider correctly', async () => {
    const wrapper = await mountDivider({
      slots: {
        default: 'this is text',
      },
    });
    expect(wrapper.find('.ux-divider-inner-text').text()).toBe('this is text');
    expect(wrapper.classes('ux-divider-with-text')).toBeTruthy();
    wrapper.setProps({ orientation: 'left' });
    await waitTime();
    expect(wrapper.classes('ux-divider-with-text-left')).toBeTruthy();
    wrapper.setProps({ orientation: 'right' });
    await waitTime();
    expect(wrapper.classes('ux-divider-with-text-right')).toBeTruthy();
  });
});
