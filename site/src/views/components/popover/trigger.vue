<template>
  <ux-demo title="三种触发方式">
    <div slot="demo">
      <ux-popover trigger="hover"
                  :theme="theme"
                  content="hover激活">
        <button class="ux-btn">
          hover激活
        </button>
      </ux-popover>
      <ux-popover trigger="click"
                  :theme="theme"
                  content="click激活">
        <button class="ux-btn">
          click激活
        </button>
      </ux-popover>
      <ux-popover trigger="focus"
                  :theme="theme"
                  content="focus激活">
        <button class="ux-btn">
          focus激活
        </button>
      </ux-popover>
    </div>
    <div slot="desc">
      <code>hover</code>
      <code>click</code>
      <code>focus</code>
      触发
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popover/trigger';

  export default {
    data() {
      return { code };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
