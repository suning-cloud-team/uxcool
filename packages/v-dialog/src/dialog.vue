<template>
  <div :class="`${prefixCls}-${theme}`">
    <template v-if="mask">
      <transition :name="maskTransition"
                  appear>
        <div v-show="value"
             :class="`${prefixCls}-mask`"
             :style="[maskStyle,zIndexStyle]"
             role="mask" />
      </transition>
    </template>
    <div v-show="showDialogWrap"
         ref="dialogWrapRef"
         :class="[wrapClasses, wrapClass]"
         :style="[wrapStyle, zIndexStyle]"
         role="dialog"
         tabindex="-1"
         @click="onMaskClose">
      <transition :name="dialogTransition"
                  appear
                  @before-enter="onDialogEnter"
                  @after-leave="onDialogLeave">
        <div v-show="value"
             :class="[`${prefixCls}`,dialogClass]"
             :style="[dialogStyle, styles]"
             @click.stop>
          <div :class="`${prefixCls}-content`">
            <div v-if="closable"
                 :class="`${prefixCls}-close`"
                 @click.stop="onClose">
              <span :class="`${prefixCls}-close-x`" />
            </div>

            <div v-if="$slots.title"
                 :class="`${prefixCls}-header`">
              <div :class="`${prefixCls}-title`">
                <slot name="title" />
              </div>
            </div>

            <div :class="`${prefixCls}-body`"
                 :style="bodyStyle">
              <slot/>
            </div>

            <div v-if="$slots.footer"
                 :class="`${prefixCls}-footer`">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
  import Mixin from './mixin';

  const $doc = document.body;
  let openModalCnt = 0;
  export default {
    name: 'Dialog',
    mixins: [Mixin],
    data() {
      return {
        showDialogWrap: false,
        lastFocusElement: null,
      };
    },
    computed: {
      maskTransition() {
        const { prefixCls, maskTransitionName, maskAnimation } = this;
        let name = maskTransitionName;
        if (!name && maskAnimation) {
          name = `${prefixCls}-${maskAnimation}`;
        }
        return name;
      },
      dialogTransition() {
        const { prefixCls, transitionName, animation } = this;
        let name = transitionName;
        if (!name && animation) {
          name = `${prefixCls}-${animation}`;
        }
        return name;
      },
      wrapClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-wrap`]: true,
        };
      },
      zIndexStyle() {
        const { zIndex } = this;
        const style = {};
        if (zIndex !== undefined) {
          style.zIndex = zIndex;
        }
        return style;
      },
      styles() {
        const { width, height } = this;
        const style = {};
        if (width) {
          style.width = width;
        }
        if (height) {
          style.height = height;
        }
        return style;
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.setDocOverflow(nVal);
        }
      },
    },
    created() {
      this.setDocOverflow(this.value);
    },
    methods: {
      focus() {
        const { $refs: { dialogWrapRef } } = this;
        if (dialogWrapRef) {
          dialogWrapRef.focus();
        }
      },
      blur() {
        const { $refs: { dialogWrapRef } } = this;
        if (dialogWrapRef) {
          dialogWrapRef.blur();
        }
      },
      setShowDialogWrap(flag) {
        const {
          mask, lastFocusElement, focus, blur
        } = this;
        this.showDialogWrap = flag;

        this.$nextTick(() => {
          if (flag) {
            this.lastFocusElement = document.activeElement;
            focus();
            this.$emit('enter');
          } else {
            blur();
            if (mask && lastFocusElement) {
              lastFocusElement.focus();
              this.lastFocusElement = null;
            }
          }
        });
      },
      setDocOverflow(flag) {
        if (flag) {
          openModalCnt += 1;
          if (openModalCnt > 1) {
            return;
          }
        } else {
          openModalCnt -= 1;
          if (openModalCnt > 0) {
            return;
          }
        }
        let overflow = '';
        if (flag) {
          overflow = 'hidden';
        }
        $doc.style.overflow = overflow;
      },
      onClose(e) {
        this.$emit('input', false);
        this.$emit('close', e);
      },
      onMaskClose(e) {
        if (!this.maskClosable) {
          return;
        }
        const { target, currentTarget } = e;
        if (target === currentTarget) {
          this.onClose(e);
        }
      },
      onDialogEnter() {
        this.setShowDialogWrap(true);
      },
      onDialogLeave(e) {
        this.setShowDialogWrap(false);
        this.setDocOverflow(false);
        this.$emit('after-close', e);
        this.blur();
      },
    },
  };
</script>
