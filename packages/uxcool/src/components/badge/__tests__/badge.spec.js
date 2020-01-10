import { mountPickerFactory, waitTime } from '@suning/v-test-utils';
import UxBadge from '../index';

const mountBadge = mountPickerFactory(UxBadge);
describe('badge', () => {
  it('render correctly', async () => {
    const wrapper = await mountBadge({
      propsData: {
        count: 9,
      },
      slots: {
        default: '<div style="width: 60px; height: 60px;"></div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render correctly on overflowed', async () => {
    const wrapper = await mountBadge({
      propsData: {
        overflowCount: 99,
        count: 99,
      },
    });
    const innerElement = wrapper.find('.ux-badge-count').find('span');
    expect(innerElement.element.innerHTML).toBe('99');
    wrapper.setProps({ count: 100 });
    await waitTime();
    expect(innerElement.element.innerHTML).toBe('99+');
  });

  it('render dot correctly', async () => {
    const wrapper = await mountBadge({
      propsData: {
        dot: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render show-zero correctly', async () => {
    const wrapper = await mountBadge({
      propsData: {
        count: 0,
      },
    });
    expect(wrapper.contains('.ux-badge-count')).not.toBeTruthy();
    wrapper.setProps({ showZero: true });
    await waitTime();
    expect(wrapper.contains('.ux-badge-count')).toBeTruthy();
    expect(wrapper.find('.ux-badge-count').find('span').element.innerHTML).toBe('0');
  });

  it('render text correctly', async () => {
    const wrapper = await mountBadge({
      propsData: {
        text: 'test text',
        dot: true,
      },
    });
    expect(wrapper.find('.ux-badge-status-text').element.innerHTML).toBe('test text');
  });

  it.each(['success', 'error', 'default', 'processing', 'warning'])(
    'render status correctly',
    async (status) => {
      const wrapper = await mountBadge({
        propsData: {
          status,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    }
  );
});
