import { mountPickerFactory, waitTime, triggerEvent } from '@cloud-sn/v-test-utils';
import Alert from '../index';

describe('alert', () => {
  const mountAlert = mountPickerFactory(Alert);
  it('render banner alert correctly', async () => {
    const wrapper = await mountAlert({
      propsData: {
        banner: true,
      },
    });
    expect(wrapper.contains('.ux-alert-banner')).toBeTruthy();
  });

  it('render show icon correctly', async () => {
    const wrapper = await mountAlert({
      propsData: {
        showIcon: true,
      },
    });
    expect(wrapper.contains('.ux-alert-icon')).toBeTruthy();
    wrapper.setProps({ showIcon: false });
    await waitTime();
    expect(wrapper.contains('.ux-alert-icon')).not.toBeTruthy();
  });

  it('render closable and close correctly', async () => {
    const closeFn = jest.fn();
    const afterCloseFn = jest.fn();
    const wrapper = await mountAlert({
      propsData: {
        closable: false,
      },
      listeners: {
        close: closeFn,
        'after-close': afterCloseFn,
      },
    });
    expect(wrapper.contains('.ux-alert-close-icon')).not.toBeTruthy();
    wrapper.setProps({ closable: true });
    await waitTime();
    expect(wrapper.contains('.ux-alert-close-icon')).toBeTruthy();

    const closeBtn = wrapper.find('.ux-alert-close-icon');
    await triggerEvent(closeBtn, 'click');
    expect(closeFn).toHaveBeenCalledTimes(1);
    expect(wrapper.contains('.ux-alert')).not.toBeTruthy();

    wrapper.vm.onAfterClose();
    expect(afterCloseFn).toHaveBeenCalledTimes(1);
  });

  it('render with props or slots correctly', async () => {
    const closeText = 'close';
    const message = 'this is message';
    const description = 'this is desc';
    const propsWrapper = await mountAlert({
      propsData: {
        closeText,
        message,
        description,
      },
    });
    expect(propsWrapper.html()).toMatchSnapshot();
    const slotsWrapper = await mountAlert({
      slots: {
        closeText,
        message,
        description,
      },
    });
    expect(slotsWrapper.html()).toMatchSnapshot();
  });

  it('render default icon or custom icon correctly', async () => {
    const wrapper = await mountAlert({
      propsData: {
        type: 'warning',
        showIcon: true,
      },
    });
    expect(wrapper.contains('.fu-exclamation_circle')).toBeTruthy();

    wrapper.setProps({ iconType: 'happy-d' });
    await waitTime();
    expect(wrapper.contains('.fu-happy-d')).toBeTruthy();
  });
});
