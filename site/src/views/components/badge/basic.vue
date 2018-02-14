<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <div class="demo-badge-group">
        <ux-badge count="9"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="99"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="999"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
      </div>
      <div class="demo-badge-group">
        <ux-badge count="99"
                  overflow-count="10"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="1000"
                  overflow-count="999"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
      </div>
      <div class="demo-badge-group">
        <ux-badge count="0"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="0"
                  show-zero
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge count="0"
                  :show-zero="true"
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
      </div>
    </div>
    <div slot="desc">当消息十分重要并且需要让用户知道消息的具体数目时，采用有数字的徽标，一般分为三类：个位数、两位数、多位数。<br>可以通过
      <code>overflowCount</code>指定显示的数字上限，当数字大于该上限时只显示
      <code>`${overflowCount}+`</code> 字样。当
      <code>showZero</code>为true时，数字为0时也显示徽章。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/badge/basic';

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
