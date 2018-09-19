<template>
  <div :class="classes">
    <template v-if="type === 'top'">
      <header v-if="!noHeader"
              :class="headerClass">
        <slot name="header" />
      </header>
      <aside v-if="!noSidebar"
             :class="sidebarClass">
        <slot name="sidebar" />
      </aside>
      <main :class="mainClass">
        <slot />
      </main>
      <footer v-if="!noFooter"
              :class="footerClass">
        <slot name="footer" />
      </footer>
    </template>
    <template v-else-if="type === 'side'">
      <aside v-if="!noSidebar"
             :class="sidebarClass">
        <slot name="sidebar" />
      </aside>
      <main :class="mainClass">
        <header v-if="!noHeader"
                :class="headerClass">
          <slot name="header" />
        </header>
        <slot />
      </main>
      <footer v-if="!noFooter"
              :class="footerClass">
        <slot name="footer" />
      </footer>
    </template>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Layout'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-layout',
      },
      type: {
        type: String,
        validator(type) {
          return ['top', 'side'].indexOf(type) > -1;
        },
        default: 'top',
      },
      headerFixed: {
        type: Boolean,
        default: true,
      },
      sidebarFixed: {
        type: Boolean,
        default: true,
      },
      sidebarCollapsed: {
        type: Boolean,
        default: false,
      },
      noHeader: {
        type: Boolean,
        default: false,
      },
      noSidebar: {
        type: Boolean,
        default: false,
      },
      noFooter: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        const {
          prefixCls,
          type,
          noHeader,
          noSidebar,
          noFooter,
          headerFixed,
          sidebarFixed,
          sidebarCollapsed,
        } = this;

        return [
          prefixCls,
          {
            'no-header': noHeader,
            'no-sidebar': noSidebar,
            'no-footer': noFooter,
            'header-fixed': !noHeader && headerFixed,
            'sidebar-fixed': !noSidebar && sidebarFixed,
            'sidebar-collapsed': !noSidebar && sidebarCollapsed,
          },
          `${prefixCls}-${type}-navigation`,
        ];
      },
      headerClass() {
        const { prefixCls } = this;

        return `${prefixCls}-header`;
      },
      sidebarClass() {
        const { prefixCls } = this;

        return `${prefixCls}-sidebar`;
      },
      mainClass() {
        const { prefixCls } = this;

        return `${prefixCls}-main`;
      },
      footerClass() {
        const { prefixCls } = this;

        return `${prefixCls}-footer`;
      },
    },
  };
</script>
