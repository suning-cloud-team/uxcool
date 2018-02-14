<template>
  <div :class="wrapperClass">
    <template v-if="layout === 'default'">
      <ux-header></ux-header>
      <ux-sidebar :class="{'no-scrollbar': noScrollbar}"></ux-sidebar>
      <ux-main>
        <router-view></router-view>
      </ux-main>
      <ux-footer></ux-footer>
    </template>
    <template v-else>
      <ux-sidebar :class="{'no-scrollbar': noScrollbar}"></ux-sidebar>
      <ux-main>
        <ux-header slot="header"></ux-header>
        <router-view></router-view>
      </ux-main>
      <ux-footer></ux-footer>
    </template>
  </div>
</template>

<script>
  import uxHeader from '@/views/common/Header.vue';
  import uxSidebar from '@/views/common/Sidebar.vue';
  import uxMain from '@/views/common/Main.vue';
  import uxFooter from '@/views/common/Footer.vue';

  const prefixCls = 'ux-layout';

  function addClass(el, cls) {
    if (!cls || !cls.trim()) {
      return;
    }
    const nCls = cls.trim();

    if (el.classList) {
      if (nCls.indexOf(' ') > -1) {
        nCls.split(/\s+/).forEach(c => el.classList.add(c));
      } else {
        el.classList.add(nCls);
      }
    } else {
      const cur = ` ${el.getAttribute('class') || ''} `;
      if (cur.indexOf(` ${nCls} `) < 0) {
        el.setAttribute('class', (cur + nCls).trim());
      }
    }
  }

  function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !cls.trim()) {
      return;
    }

    const nCls = cls.trim();
    /* istanbul ignore else */
    if (el.classList) {
      if (nCls.indexOf(' ') > -1) {
        nCls.split(/\s+/).forEach(c => el.classList.remove(c));
      } else {
        el.classList.remove(nCls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      let cur = ` ${el.getAttribute('class') || ''} `;
      const tar = ` ${nCls} `;
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  export default {
    data() {
      return {
        headerFixed: true,
        sidebarFixed: true,
        sidebarCollapsed: false,
        noScrollbar: true,
        noFooter: false,
        layout: 'default', // 'default' | 'side
      };
    },
    computed: {
      wrapperClass() {
        return [
          `${prefixCls}`,
          // `${prefixCls}-${this.$store.state.theme}`,
          {
            [`${prefixCls}-header-fixed`]: this.headerFixed,
            [`${prefixCls}-sidebar-fixed`]: this.sidebarFixed,
            [`${prefixCls}-sidebar-collapsed`]: this.sidebarCollapsed,
            [`${prefixCls}-side-nav`]: this.layout === 'side',
            'no-layout-footer': this.noFooter,
          },
        ];
      },
      theme() {
        return this.$store.state.theme;
      },
    },
    watch: {
      theme: {
        handler(n, o) {
          if (n) {
            const $body = document.body;
            removeClass($body, `${prefixCls}-${o}`);
            addClass($body, `${prefixCls}-${n}`);
          }
        },
        immediate: true,
      },
    },
    components: {
      uxHeader,
      uxSidebar,
      uxMain,
      uxFooter,
    },
  };
</script>
