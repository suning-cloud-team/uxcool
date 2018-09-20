<template>
  <ux-layout class="ux-doc">
    <ux-header slot="header" />
    <ux-sidebar slot="sidebar" />
    <ux-footer slot="footer" />
    <ux-main>
      <router-view />
    </ux-main>
  </ux-layout>
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
    components: {
      uxHeader,
      uxSidebar,
      uxMain,
      uxFooter,
    },
    computed: {
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
  };
</script>
