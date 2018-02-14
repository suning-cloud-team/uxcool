<template>
  <ux-demo title="圆点">
    <div slot="demo">
      <div class="demo-badge-group">
        <ux-badge dot
                  :theme="theme">
          <div class="demo-badge"></div>
        </ux-badge>
        <ux-badge :dot="true"
                  :theme="theme">text</ux-badge>
        <ux-badge :dot="true"
                  :theme="theme">
          <i class="fu fu-account"></i>
        </ux-badge>
      </div>
    </div>
    <div slot="desc">用于提醒用户存在未处理的新消息，一般放置在与新消息相关的内容的右上角。需要指定
      <code>dot</code>属性</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/badge/dot';

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
