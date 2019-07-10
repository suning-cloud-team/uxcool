<template>
  <div :class="classes">
    <a :class="titleClasses"
       :href="href"
       @click.prevent="onClickAnchor"
    >
      {{ title }}
    </a>
    <slot />
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('AnchorLink'),
    inject: ['anchor'],
    props: {
      href: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    },
    created() {
      this.anchor.titles.push(this.href);
    },
    computed: {
      prefixCls() {
        return `${this.anchor.prefixCls}-link`;
      },
      isActive() {
        return this.anchor.currentLink === this.href;
      },
      classes() {
        const { prefixCls, isActive } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-active`]: isActive,
        };
      },
      titleClasses() {
        const { prefixCls, isActive } = this;
        return {
          [`${prefixCls}-title`]: true,
          [`${prefixCls}-title-active`]: isActive,
        };
      },
    },
    methods: {
      onClickAnchor() {
        if (this.anchor.beforeHashChange(this.href)) {
          const isRoute = this.$router;
          if (isRoute) {
            this.$router.push(this.href);
          } else {
            window.location.href = this.href;
          }
          this.anchor.handleHashChange();
        } else {
          this.anchor.handleHashChange(this.href);
        }
        if (this.anchor.beforeScroll(this.href)) {
          this.anchor.handleScrollTo();
        }
      },
    },
  };
</script>
