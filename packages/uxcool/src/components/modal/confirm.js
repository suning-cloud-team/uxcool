import Vue from 'vue';
import omit from 'object.omit';
import Icon from '../icon';
import Modal from './modal.vue';

const confirms = new Set();
let defaultProps = {
  type: 'success',
  prefixCls: 'ux-confirm',
  okType: 'primary',
  iconType: 'question_circle',
  maskClosable: false,
  closable: false,
  width: '416px',
  okCancel: true,
  okText: '确定',
  cancelText: '取消',
  theme: 'light',
  dangerouslySetInnerHTML: false,
};

function modalConfrim(props) {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const vm = new Vue({
      components: {
        Modal,
        Icon,
      },
      data() {
        return {
          attrs: null,
          listeners: null,
        };
      },
      created() {
        confirms.add(this);
      },
      destroyed() {
        confirms.delete(this);
        const { parentNode } = container;
        if (parentNode) {
          parentNode.removeChild(container);
        }
      },
      methods: {
        onModalEnter() {
          const { $refs: { okBtnRef } } = this;
          if (okBtnRef) {
            okBtnRef.focus();
          }
        },
      },
      render() {
        const { attrs, listeners, onModalEnter } = this;
        if (!attrs) {
          return null;
        }
        const {
          prefixCls,
          type,
          iconType,
          title,
          content,
          okCancel,
          cancelText,
          okType,
          okText,
          dangerouslySetInnerHTML,
        } = attrs;

        const bindProps = omit(attrs, [
          'prefixCls',
          'type',
          'iconType',
          'okCancel',
          'title',
          'content',
          'okType',
          'okText',
          'dangerouslySetInnerHTML',
        ]);
        bindProps.dialogClass = [prefixCls, `${prefixCls}-${type}`, bindProps.dialogClass];

        const cancelBtn = okCancel ? (
          <button htmlType="button" class="ux-btn" on-click={listeners.cancel}>
            {cancelText}
          </button>
        ) : null;

        const modalContent = dangerouslySetInnerHTML ? (
          <div class={`${prefixCls}-content`} {...{ domProps: { innerHTML: content } }} />
          ) : (
          <div class={`${prefixCls}-content`}>{content}</div>
        );
        return (
          <modal {...{ props: bindProps, on: { ...listeners } }}>
            <div class={`${prefixCls}-body-wrapper`}>
              <div class={`${prefixCls}-body`}>
                <icon type={iconType} />
                <span class={`${prefixCls}-title`}>{title}</span>
                {modalContent}
              </div>
              <div class={`${prefixCls}-btns`}>
                {cancelBtn}
                <button
                  ref="okBtnRef"
                  htmlType="button"
                  class={['ux-btn', `ux-btn-${okType}`]}
                  on-click={listeners.ok}
                >
                  {okText}
                </button>
              </div>
            </div>
          </modal>
        );
      },
    }).$mount();

    const attrs = {
      ...defaultProps,
      ...props,
      value: true,
      hideFooter: true,
      getContainer() {
        return container;
      },
    };

    function close() {
      attrs.value = false;
    }

    const listeners = {
      'after-close': function afterClose() {
        vm.$destroy();
      },
      cancel() {
        close();
        reject();
      },
      ok() {
        close();
        resolve();
      },
    };

    vm.attrs = attrs;
    vm.listeners = listeners;
  });
}

modalConfrim.config = (props = {}) => {
  defaultProps = { ...defaultProps, ...props };
};

modalConfrim.destroy = () => {
  confirms.forEach((vm) => {
    const nVm = vm;
    nVm.attrs.value = false;
  });
};
export default modalConfrim;
