<script>
  export default {
    name: 'Notice',
    props: {
      prefixCls: String,
      duration: {
        type: [Number, String],
        // ms
        default: 1500,
      },
      content: [String, Object],
      dangerouslySetInnerHTML: Boolean,
      closable: Boolean,
      noticeClass: [String, Array, Object],
      noticeStyle: Object,
      onClose: {
        type: Function,
        default() {},
      },
    },
    data() {
      return {
        timer: null,
        isClose: false,
      };
    },
    computed: {
      noticePrefixCls() {
        return `${this.prefixCls}-notice`;
      },
      classes() {
        const { noticePrefixCls, closable } = this;
        return {
          [noticePrefixCls]: true,
          [`${noticePrefixCls}-closable`]: closable,
        };
      },
    },
    render() {
      const {
        noticePrefixCls,
        classes,
        noticeClass,
        noticeStyle,
        closable,
        dangerouslySetInnerHTML,
        content,
        clearTimer,
        startTimer,
        close,
      } = this;
      const noticeContent = dangerouslySetInnerHTML ? (
        <div
          class={`${noticePrefixCls}-content`}
          {...{
            domProps: {
              innerHTML: content,
            },
          }}
        />
      ) : (
        <div class={`${noticePrefixCls}-content`}>{content}</div>
      );

      return (
        <div
          class={[classes, noticeClass]}
          style={noticeStyle}
          on-mouseenter={clearTimer}
          on-mouseleave={startTimer}
        >
          {noticeContent}
          {closable ? (
            <div class={`${noticePrefixCls}-close`} on-click={close}>
              <span class={`${noticePrefixCls}-close-x`} />
            </div>
          ) : null}
        </div>
      );
    },
    created() {
      this.startTimer();
    },
    beforeDestroy() {
      const { clearTimer } = this;
      clearTimer();
    },
    methods: {
      close(from) {
        this.clearTimer();
        this.$emit('close');
      },
      startTimer() {
        const {
          duration, close, clearTimer, timer
        } = this;
        if (timer) {
          clearTimer();
        }
        if (duration) {
          this.timer = setTimeout(() => {
            close();
          }, duration);
        }
      },
      clearTimer() {
        const { timer } = this;
        if (timer) {
          clearTimeout(timer);
          this.timer = null;
        }
      },
    },
  };
</script>

