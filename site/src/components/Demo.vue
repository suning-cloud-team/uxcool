<template>
  <div :class="['demo', theme]">
    <ux-heading level="2" :id="anchorId">{{title}}</ux-heading>
    <div class="demo-desc" v-if="$slots.desc">
      <slot name="desc"></slot>
    </div>
    <div class="demo-example">
      <slot name="demo"></slot>
    </div>
    <div class="demo-code" ref="code" :style="codeStyle">
      <slot name="code"></slot>
      <div :class="['demo-code-more', { fixed }]"
            @click="toggleCode"
            ref="more"
            v-if="showMore">
        <template v-if="collapsed">
          <ux-icon type="down"></ux-icon> 展开代码
        </template>
        <template v-else>
          <ux-icon type="up"></ux-icon> 收起代码
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    anchor: {
      validator(value) {
        return /^\w+([-]?\w+)*$/.test(value);
      },
    },
    height: Number,
  },
  data() {
    return {
      collapsed: true,
      showMore: false,
      fixed: false,
      codeHeight: 0,
      anchorId: this.anchor || this.title,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    codeStyle() {
      const style = {};
      if (this.showMore) {
        style.height = this.collapsed ? `${this.height}px` : `${this.codeHeight + 29}px`;
      }
      return style;
    },
  },
  watch: {
    collapsed(value) {
      if (value) {
        this.fixed = false;
        Object.assign(this.$refs.more.style, { left: 0, width: '100%' });
        this.removeScrollHandler();
      } else {
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
        // 等代码块展开后再计算一下当前坐标
        setTimeout(() => {
          this.scrollHandler();
        }, 200);
      }
    },
  },
  methods: {
    toggleCode() {
      this.collapsed = !this.collapsed;
    },
    scrollHandler() {
      const { left, right, top, bottom } = this.$refs.code.getBoundingClientRect();
      const { clientHeight } = document.documentElement;

      this.fixed = bottom > clientHeight && top + this.height <= clientHeight;

      Object.assign(this.$refs.more.style, {
        left: this.fixed ? `${left}px` : 0,
        width: this.fixed ? `${right - left}px` : '100%',
      });
    },
    removeScrollHandler() {
      window.removeEventListener('scroll', this.scrollHandler);
      window.removeEventListener('resize', this.scrollHandler);
    },
  },
  mounted() {
    this.$nextTick(() => {
      const codeHeight = this.$refs.code.clientHeight;
      this.codeHeight = codeHeight;

      if (codeHeight > this.height) {
        this.showMore = true;
      }
    });
  },
  beforeDestroy() {
    this.removeScrollHandler();
  },
};
</script>
