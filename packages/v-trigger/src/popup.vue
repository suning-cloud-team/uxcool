<script>
  import Align from '@suning/v-align';

  export default {
    props: {
      prefixCls: {
        type: String,
        default: '',
      },
      className: [String, Array, Object],
      styles: Object,
      visible: {
        type: Boolean,
        default: false,
      },
      getClassNameFromAlign: {
        type: Function,
        default() {
          return '';
        },
      },
      rootDomNode: HTMLElement,
      align: {
        type: Object,
        default() {
          return {};
        },
      },
      destroyPopupOnHide: {
        type: Boolean,
        default: false,
      },
      transition: {
        type: String,
        default: '',
      },
      animation: String,
    },
    render(h) {
      const {
        prefixCls,
        destroyPopupOnHide,
        visible,
        $slots,
        classes,
        className,
        styles,
        getTarget,
        align,
        onAlign,
      } = this;
      const subElements = [];
      const alignElement = h(
        'align',
        {
          ref: 'alignRef',
          props: {
            target: getTarget,
            align,
            disabled: !visible,
            monitorWinResize: true,
          },
          on: {
            'on-align': onAlign,
          },
        },
        [
          h(
            'div',
            {
              class: [classes, className],
              style: styles,
              on: {
                mousedown(e) {
                  e.stopPropagation();
                },
              },
            },
            [h('div', { class: `${prefixCls}-content` }, $slots.default)]
          ),
        ]
      );

      if (destroyPopupOnHide) {
        if (visible) {
          subElements.push(alignElement);
        }
      } else {
        subElements.push(alignElement);
      }
      return h('transition', {}, [
        h(
          'div',
          {
            attrs: {
              role: 'popup',
            },
          },
          subElements
        ),
      ]);
    },
    computed: {
      transitionName() {
        const { prefixCls, transition, animation } = this;
        let transitionName = transition;
        if (!transition && animation) {
          transitionName = `${prefixCls}-${animation}`;
        }
        return transitionName;
        // return '';
      },
      target() {
        return this.rootDomNode;
      },
      alignClass() {
        const { align, getClassNameFromAlign } = this;
        return getClassNameFromAlign(align);
      },
      classes() {
        const {
          prefixCls, alignClass, destroyPopupOnHide, visible
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-hidden`]: !destroyPopupOnHide && !visible,
          [alignClass]: !!alignClass,
        };
      },
    },
    methods: {
      getTarget() {
        return this.rootDomNode;
      },
      onAlign(element, align) {
        this.$emit('on-align', element, align);
      },
    },
    components: {
      Align,
    },
  };
</script>
