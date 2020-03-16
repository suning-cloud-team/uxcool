import { mountPickerFactory, waitTime, triggerEvent } from '@suning/v-test-utils';
import Avatar from '../index';

describe('avatar', () => {
  const mountAvatar = mountPickerFactory(Avatar);
  it('render string correctly', async () => {
    const TEST_STRING = 'test string';
    const wrapper = await mountAvatar({
      slots: {
        default: TEST_STRING,
      },
    });
    expect(wrapper.element.children.length).toBe(1);
    expect(wrapper.element.children[0].innerHTML).toBe(TEST_STRING);
  });

  it('use fallback string corectly on get img fail', async () => {
    const TEST_STRING = 'IMG_FAIL';
    const CORRECT_URL = 'https://image4.suning.cn/uimg/cms/img/155540698836163295.png';
    const ERROR_URL = 'http://error.url';
    const wrapper = await mountAvatar({
      propsData: {
        src: CORRECT_URL,
      },
      slots: {
        default: TEST_STRING,
      },
    });
    expect(wrapper.element.children.length).toBe(1);
    expect(wrapper.element.children[0].tagName).toBe('IMG');
    expect(wrapper.element.children[0].getAttribute('src')).toBe(CORRECT_URL);
    wrapper.setProps({ src: ERROR_URL });
    await waitTime();
    await triggerEvent(wrapper.find('img'), 'error');
    expect(wrapper.element.children.length).toBe(1);
    expect(wrapper.element.children[0].tagName).toBe('SPAN');
    expect(wrapper.element.children[0].innerHTML).toBe(TEST_STRING);
  });

  it.each(['small', 'default', 'large'])('render different sizes correctly', async (size) => {
    const wrapper = await mountAvatar({
      propsData: {
        size,
        icon: 'account'
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render scale correctly', async () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      x: 260,
      y: 106,
      width: 40,
      height: 40,
      top: 106,
      right: 300,
      bottom: 146,
      left: 260,
    }));

    Object.defineProperty(HTMLSpanElement.prototype, 'offsetWidth', {
      get: () => 34
    });

    const wrapper = await mountAvatar({
      data() {
        return {
          name: 'Abcde'
        };
      },
      render() {
        const { name } = this;
        return <Avatar>{name}</Avatar>;
      },
    });
    wrapper.setData({ name: 'Abcde' });
    expect(wrapper.element).toMatchSnapshot();
    // wrapper.vm.$children[0].$refs.avatarTextRef
    //  wrapper.vm.$children[0].$refs.avatarWrapref
  });
});
