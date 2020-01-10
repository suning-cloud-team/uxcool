import {
  mount,
  waitTime,
  $,
  triggerEvent,
  mountPickerFactory,
  createWrapper,
  destroyWrapper,
} from '@suning/v-test-utils';
import Modal from '../index';

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
      hideFooter: true,
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
    it('render correctly', async () => {
      const okFn = jest.fn();
      const cancelFn = jest.fn();
      Modal.info({
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
        })
        .catch(() => {
          cancelFn();
        });
      await waitTime(100);

      const wrapper = createWrapper(document.querySelector('.ux-modal-light'));
      expect(wrapper.html()).toMatchSnapshot();
      // expect(wrapper.find('.ux-confirm-title').text()).toBe('this is title');
      // expect(wrapper.find('.ux-confirm-content').html()).toBe('<p>content</p>');
      // const btns = wrapper.findAll('.ux-btn');
      // expect(btns.at(0).text()).toBe('CANCEL');
      // expect(btns.at(1).text()).toBe('OK');
      // expect($('.ux-btn-danger').length).toBe(1);
      // expect($('.ux-confirm').css('width')).toBe('600px');
      // expect($('.ux-modal-wrap').css('z-index')).toBe('999');
    });
  });
});
