<template>
  <ux-demo title="链接">
    <div slot="demo">
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item href="https://www.suning.com"
                            target="_blank">苏宁
        </ux-breadcrumb-item>
        <ux-breadcrumb-item href="https://www.baidu.com">百度</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <a href="http://uxcool.cnsuning.com">uxcool</a>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>
    <div slot="desc">
      自定义面包屑链接
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/breadcrumb/link';

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
