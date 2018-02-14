export default `
<template>
  <div >
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
</template>

<script>

  export default {
    data() {
      return {
      };
    },
    methods: {
      getSeparatorJSX() {
        // 使用jsx
        return <ux-icon type="bells" />;
      },
      getSeparatorVNode() {
        // 使用$createElement
        const h = this.$createElement;
        return h('ux-icon', {
          props: {
            type: 'star',
          },
        });
      },
    },
  };
</script>
`;
