import {
  mount,
  waitTime,
  $,
  triggerEvent,
  mountPickerFactory,
  createWrapper,
  destroyWrapper,
  removePopup
} from '@suning/v-test-utils';
import Modal from '../index';
import { getPortal } from '../../../../../v-test-utils/src';

const mountModal = mountPickerFactory(Modal);

describe('modal', () => {
  it('render correctly', async () => {
    const wrapper = await mountModal({
      propsData: {
        value: true,
      },
      slots: {
        title: 'this is title',
      },
    });
    expect($('.ux-modal-close-x').length).toBe(1);
    expect($('.ux-modal-mask').css('display')).toBe('block');
    expect($('.ux-modal-title')[0].innerHTML).toBe('this is title');
    expect(
      $('.ux-modal-footer')[0]
        .children[0].innerHTML.replace(/[\r\n]/, '')
        .trim()
    ).toBe('取消');
    expect(
      $('.ux-modal-footer')[0]
        .children[1].innerHTML.replace(/[\r\n]/, '')
        .trim()
    ).toBe('确定');
    expect($('.ux-modal-footer').find('.ux-btn-primary').length).toBe(1);
    wrapper.setProps({
      closable: false,
      okType: 'danger',
      okText: 'OK',
      cancelText: 'CANCEL',
      zIndex: 999,
      mask: false,
    });
    await waitTime(50);
    expect($('.ux-modal-close-x').length).toBe(0);
    expect($('.ux-modal-mask').length).toBe(0);
    expect(
      $('.ux-modal-footer')[0]
        .children[0].innerHTML.replace(/[\r\n]/, '')
        .trim()
    ).toBe('CANCEL');
    expect(
      $('.ux-modal-footer')[0]
        .children[1].innerHTML.replace(/[\r\n]/, '')
        .trim()
    ).toBe('OK');
    expect($('.ux-modal-footer').find('.ux-btn-danger').length).toBe(1);
    expect($('.ux-modal-wrap').css('z-index')).toBe('999');
    wrapper.setProps({
      hideFooter: true
    });
    await waitTime(50);
    expect($('.ux-modal-footer').length).toBe(0);
    destroyWrapper(wrapper);
  });

  it('mask closable correctly', async () => {
    const Test = {
      props: {
        closeable: {
          type: Boolean,
          default: false,
        },
      },
      data() {
        return {
          innerVisible: true,
        };
      },
      methods: {
        onInput(visible) {
          this.innerVisible = visible;
        },
      },
      render() {
        const { closeable, innerVisible, onInput } = this;
        const props = {
          value: innerVisible,
          title: 'this is test closable modal',
          maskClosable: closeable,
          transitionName: '',
          maskTransitionName: '',
        };
        const on = {
          input: onInput,
        };
        return (
          <div>
            <Modal {...{ props, on }} />
          </div>
        );
      },
    };
    const wrapper = mount(Test, {
      propsData: {
        closeable: false,
      },
      // attachToDocument: true,
    });

    await waitTime();

    const bodyWrapper = createWrapper(wrapper.element.ownerDocument.body);
    expect(bodyWrapper.find('.ux-modal-wrap').exists()).toBeTruthy();

    await triggerEvent(bodyWrapper.find('.ux-modal-wrap'), 'click');
    expect(bodyWrapper.find('.ux-modal-wrap').element.style.display).not.toBe('none');
    expect(bodyWrapper.classes()).toContain('ux-modal-doc-open');

    // allow mask close
    wrapper.setProps({
      closeable: true,
    });
    await waitTime();

    await triggerEvent(bodyWrapper.find('.ux-modal-wrap'), 'click', 100);
    expect(bodyWrapper.find('.ux-modal-wrap').element.style.display).toBe('none');
    expect(bodyWrapper.classes()).not.toContain('ux-modal-doc-open');
    destroyWrapper(wrapper);
  });

  it('render in custom container correctly', async () => {
    const Test = {
      methods: {
        getPopupContainer() {
          return this.$refs.wrapRef;
        },
      },
      render() {
        const { getPopupContainer } = this;
        return (
          <div ref="wrapRef">
            <Modal value={false} getContainer={getPopupContainer} />
          </div>
        );
      },
    };

    const wrapper = await mount(Test);
    const modalWrapper = wrapper.find(Modal);

    modalWrapper.setProps({ value: true });
    await waitTime();
    expect(wrapper.find('.ux-modal-wrap').exists()).toBeTruthy();
    destroyWrapper(wrapper);
  });

  describe('methods', () => {
    it('render confirm correctly', async () => {
      removePopup();
      const okFn = jest.fn();
      const cancelFn = jest.fn();
      Modal.confirm({
        title: 'this is info title',
        content: '<p>info content</p>',
        dangerouslySetInnerHTML: true,
        okCancel: true,
        cancelText: 'CANCEL',
        okText: 'OK',
        okType: 'danger',
        width: '600px',
        zIndex: 999,
        transitionName: '',
        maskTransitionName: '',
      })
        .then(() => {
          okFn();
        },() => {
          cancelFn();
        });
      await waitTime(300);

      const wrapper = createWrapper(document.querySelector('.ux-modal-light'));
      await triggerEvent(wrapper.find('.ux-btn-danger'), 'click');
      expect(okFn).toHaveBeenCalled();
      Modal.confirm({
        title: 'this is confirm title',
        content: '<p>confirm content</p>',
        dangerouslySetInnerHTML: true,
        okCancel: true,
        cancelText: 'CANCEL',
        okText: 'OK',
        okType: 'danger',
      })
        .then(() => {
          okFn();
        },() => {
          cancelFn();
        });
      await waitTime();
      const buttonsWrapper = createWrapper(document.querySelector('.ux-modal-light')).findAll('.ux-btn');
      await triggerEvent(buttonsWrapper.at(0), 'click', 150);
      // expect(cancelFn).toHaveBeenCalled();
      removePopup();
    });
    it('render modal correctly', async () => {
      const okFn = jest.fn();
      const cancelFn = jest.fn();
      const inputFn = jest.fn();
      removePopup();
      await mountModal({
        propsData: {
          value: true,
        },
        slots: {
          title: 'this is title',
        },
        listeners: {
          input: inputFn,
          cancel: cancelFn,
          ok: okFn
        }
      });

      const modalwrapper = createWrapper(document.querySelector('.ux-modal-light'));
      await waitTime();
      const buttonWrapper = modalwrapper.findAll('.ux-btn');
      await triggerEvent(buttonWrapper.at(1), 'click');
      await triggerEvent(buttonWrapper.at(0), 'click');
      expect(okFn).toHaveBeenCalled();
      expect(inputFn).toHaveBeenCalled();
      removePopup();
    });
  });

  describe('render message notice correctly', () => {
    it.each([
      'success',
      'info',
      'error',
      'warning',
      'warn',
      'confirm',
    ])('render %s correctly', async (message) => {
      if (message === 'info') {
        Modal.info();
      } else {
        Modal[message]({
          title: `This is ${message} Message Title`,
          content: 'content'
        });
      }
      await waitTime();
      const wrapper = createWrapper(document.body);
      expect(wrapper.find(`.ux-confirm-${message}`).exists()).toBeTruthy();
    });

    it('config is correctly', async () => {
      removePopup();
      Modal.config({ theme: 'dark' });
      Modal.confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some Descriptions',
      });
      await waitTime();
      const wrapper = createWrapper(document.body);
      expect(wrapper.find('.ux-modal-dark').exists()).toBeTruthy();
      Modal.destroy();
    });
  });
});
