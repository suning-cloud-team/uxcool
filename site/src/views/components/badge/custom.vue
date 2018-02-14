<template>
  <ux-demo title="自定义样式">
    <div slot="demo">
      <div class="demo-badge-group">
        <ux-badge count="25"
                  :theme="theme">
        </ux-badge>
        <ux-badge count="4"
                  :theme="theme"
                  :custom-style="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}"></ux-badge>
        <ux-badge count="109"
                  :theme="theme"
                  :custom-style="{background: 'green'}"></ux-badge>
      </div>
      <div class="demo-badge-group">
        <ux-badge count="25"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="4"
                  :custom-style="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="109"
                  :custom-style="{background: 'green'}"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
      </div>
    </div>
    <div slot="desc">可以通过
      <code>customStyle</code>来自定义徽章样式。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/badge/custom';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
