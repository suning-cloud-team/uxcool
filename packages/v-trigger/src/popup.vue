<script>
  import Align from '@suning/v-align';

  export default {
    components: {
      Align,
    },
    props: {
      prefixCls: {
        type: String,
        default: '',
      },
      className: {
        type: [String, Array, Object],
        default: '',
      },
      styles: {
        type: Object,
        default: null,
      },
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
      rootDomNode: {
        type: HTMLElement,
        default: null,
      },
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
      animation: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        innerAlign: {},
      };
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
        const { innerAlign, getClassNameFromAlign } = this;
        return getClassNameFromAlign(innerAlign);
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
    watch: {
      align(nVal) {
        if (nVal) {
          this.setInnerAlign(nVal);
        }
      },
    },
    created() {
      this.setInnerAlign(this.align);
    },
    methods: {
      setInnerAlign(align) {
        this.innerAlign = align;
      },
      getTarget() {
        return this.rootDomNode;
      },
      onAlign(element, align) {
        this.setInnerAlign(align);
        this.$emit('on-align', element, align);
      },
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
            // 使用原始align
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
  };
</script>
