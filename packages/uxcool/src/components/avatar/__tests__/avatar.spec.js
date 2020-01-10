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
});
