<template>
  <div :class="`${prefixCls}-${theme}`">
    <template v-if="mask">
      <transition :name="maskTransition"
                  appear>
        <div role="mask"
             v-show="value"
             :class="`${prefixCls}-mask`"
             :style="[maskStyle,zIndexStyle]">
        </div>
      </transition>
    </template>
    <div v-show="showDialogWrap"
         tabindex="-1"
         role="dialog"
         :class="[wrapClasses, wrapClass]"
         :style="[wrapStyle, zIndexStyle]"
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
            <div :class="`${prefixCls}-close`"
                 v-if="closable"
                 @click.stop="onClose">
              <span :class="`${prefixCls}-close-x`"></span>
            </div>

            <div :class="`${prefixCls}-header`"
                 v-if="$slots.title">
              <div :class="`${prefixCls}-title`">
                <slot name="title"></slot>
              </div>
            </div>

            <div :class="`${prefixCls}-body`"
                 :style="bodyStyle">
              <slot></slot>
            </div>

            <div :class="`${prefixCls}-footer`"
                 v-if="$slots.footer">
              <slot name="footer"></slot>
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
      };
    },
    created() {
      this.setDocOverflow(this.value);
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
    methods: {
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
        this.showDialogWrap = true;
      },
      onDialogLeave(e) {
        this.showDialogWrap = false;
        this.setDocOverflow(false);
        this.$emit('after-close', e);
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.setDocOverflow(nVal);
        }
      },
    },
  };
</script>