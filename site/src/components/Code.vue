<template>
  <div :class="clazz">
    <pre><code :class="lang" ref="code"><slot></slot></code></pre>
      <ux-tooltip :content="copyTooltip"
                  placement="top"
                  @visible-change="onTooltipVisibleChange" v-if="!nonCopyable">
        <span class="copy">
            复制代码
        </span>
      </ux-tooltip>
  </div>
</template>

<script>
import hljs from 'highlightjs';
import Clipboard from 'clipboard';

export default {
  props: {
    lang: String,
    nonCopyable: Boolean,
  },
  data() {
    return {
      code: '',
      copyTooltip: '点击复制',
      clipboard: null,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    clazz() {
      return ['code-wrapper', this.theme];
    },
  },
  methods: {
    onTooltipVisibleChange() {
      this.copyTooltip = '点击复制';
    },
  },
  mounted() {
    this.$nextTick(() => {
      const Code = this.$refs.code;
      this.code = Code.innerHTML.trim();
      Code.innerHTML = this.code;
      hljs.highlightBlock(Code);

      if (!this.nonCopyable) {
        const code = this.code
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/&amp;/g, '&');

        const clipboard = new Clipboard(this.$el.querySelector('.copy'), {
          text() {
            return code;
          },
        });

        clipboard.on('success', e => {
          e.clearSelection();
          this.copyTooltip = '复制成功';
        });

        this.clipboard = clipboard;
      }
    });
  },
  beforeDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }
  },
};
</script>
