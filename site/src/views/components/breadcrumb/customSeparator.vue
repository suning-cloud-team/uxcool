<template>
  <ux-demo title="分割符">
    <div slot="demo">
      <ux-breadcrumb separator=">"
                     :theme="theme">
        <ux-breadcrumb-item>
          <ux-icon type="home"></ux-icon>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <ux-icon type="account"></ux-icon>
          用户管理
        </ux-breadcrumb-item>
      </ux-breadcrumb>

      <ux-breadcrumb :separator="getSeparatorJSX"
                     :theme="theme">
        <ux-breadcrumb-item>
          <ux-icon type="home"></ux-icon>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <ux-icon type="account"></ux-icon>
          用户管理
        </ux-breadcrumb-item>
      </ux-breadcrumb>

      <ux-breadcrumb :separator="getSeparatorVNode"
                     :theme="theme">
        <ux-breadcrumb-item>
          <ux-icon type="home"></ux-icon>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <ux-icon type="account"></ux-icon>
          用户管理
        </ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>
    <div slot="desc">使用
      <code>separator</code>属性,可自定义分隔符;<br> 使用
      <code>jsx</code>时,需要编译环境支持
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/breadcrumb/customSeparator';

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
    methods: {
      getSeparatorJSX() {
        return <ux-icon type="bells" />;
      },
      getSeparatorVNode() {
        const h = this.$createElement;
        return h('ux-icon', {
          props: {
            type: 'filter',
          },
        });
      },
    },
  };
</script>
