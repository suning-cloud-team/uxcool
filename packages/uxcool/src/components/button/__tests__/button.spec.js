import { mountPickerFactory, waitTime } from '@suning/v-test-utils';
import Button from '../index';

describe('button', () => {
  const mountButton = mountPickerFactory(Button);
  // const mountButtonGroup = mountPickerFactory(Button.Group);
  it.each(['primary', 'ghost', 'dashed', 'danger', ''])(
    'render different buton types correctly',
    async (type) => {
      const wrapper = await mountButton({
        propsData: {
          type,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    }
  );

  it.each(['small', 'default', 'large'])('render different sizes correctly', async (size) => {
    const wrapper = await mountButton({
      propsData: {
        size,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('emit event correctly', async () => {
    const clickFn = jest.fn();
    const wrapper = await mountButton({
      listeners: {
        click: clickFn,
      },
    });
    wrapper.trigger('click');
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it('render loading correctly', async () => {
    const wrapper = await mountButton({
      propsData: {
        loading: { delay: 500 },
      },
      sync: false,
    });
    expect(wrapper.contains('.ux-btn-loading')).not.toBeTruthy();
    await waitTime(501);
    expect(wrapper.contains('.ux-btn-loading')).toBeTruthy();
    wrapper.destroy();
  });

  it('render loading changed correctly', async () => {
    const wrapper = await mountButton({
      propsData: {
        loading: { delay: 100 },
      },
      sync: false,
    });
    expect(wrapper.contains('.ux-btn-loading')).not.toBeTruthy();
    wrapper.setProps({ loading: { delay: 200 } });
    await waitTime(301);
    expect(wrapper.contains('.ux-btn-loading')).toBeTruthy();
    wrapper.destroy();
  });

  it.each(['submit', 'button', 'reset'])('render html type correctly', async (htmlType) => {
    const wrapper = await mountButton({
      propsData: {
        htmlType,
      },
    });
    expect(wrapper.find('button').element.getAttribute('type')).toBe(htmlType);
  });

  it('render link as button correctly', async () => {
    const wrapper = await mountButton({
      propsData: {
        href: 'http://www.suning.com',
      },
    });
    expect(wrapper.contains('button')).toBeFalsy();
    expect(wrapper.contains('a')).toBeTruthy();
    expect(wrapper.find('a').attributes('href')).toBe('http://www.suning.com');
    wrapper.setProps({ href: '' });
    await waitTime();
    expect(wrapper.contains('a')).toBeFalsy();
    expect(wrapper.contains('button')).toBeTruthy();
  });

  it('render button group correctly', async () => {
    const wrapper = await mountButton({
      render() {
        return (
          <Button.Group>
            <Button>a</Button>
            <Button>b</Button>
          </Button.Group>
        );
      },
    });
    const buttonGroup = wrapper.find('.ux-btn-group');
    expect(buttonGroup.findAll('button').length).toBe(2);
  });

  it('emit event correctly', async () => {
    const clickFn = jest.fn();
    const wrapper = await mountButton({
      listeners: {
        click: clickFn,
      },
    });
    wrapper.trigger('click');
    expect(clickFn).toHaveBeenCalledTimes(1);
    wrapper.destroy();
  });

  it('render button text is TwoCNChar correctly', async () => {
    const wrapper = await mountButton({
      render() {
        return (
          <div>
            <Button>中国</Button>
            <Button>
            <span>测试</span>
            </Button>
          <Button></Button>
          </div>
        );
      },
    });
    expect(wrapper.find('.ux-btn').text()).toBe('中 国');
    wrapper.destroy();
  });
});
