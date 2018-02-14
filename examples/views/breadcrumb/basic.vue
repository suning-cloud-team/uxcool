<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <div class="demo">
      <h6>basic</h6>
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item>首页</ux-breadcrumb-item>
        <ux-breadcrumb-item>活动管理</ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
        <ux-breadcrumb-item> </ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>

    <div class="demo">
      <h6>link</h6>
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item href="https://www.suning.com"
                            target="_blank">苏宁</ux-breadcrumb-item>
        <ux-breadcrumb-item href="https://www.baidu.com">百度</ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <a href="http://uxcool.cnsuning.com">uxcool</a>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>

    <div class="demo">
      <h6>router link</h6>
      <ux-breadcrumb :theme="theme">
        <ux-breadcrumb-item>
          <router-link to="/modal">Modal</router-link>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>
          <router-link to="/message">Message</router-link>
        </ux-breadcrumb-item>
        <ux-breadcrumb-item>列表页</ux-breadcrumb-item>
      </ux-breadcrumb>
    </div>

    <div class="demo">
      <h6>customIcon</h6>
      <ux-breadcrumb :theme="theme">
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

    <div class="demo">
      <h6>custom separator</h6>
      <ux-breadcrumb separator="/"
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
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/breadcrumb/style/index.scss';
  import UxIcon from '@suning/uxcool/src/components/icon';
  import { UxBreadcrumb, UxBreadcrumbItem } from '@suning/uxcool/src/components/breadcrumb';

  export default {
    data() {
      return {
        theme: 'light',
      };
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      getSeparatorJSX() {
        return <ux-icon type="bells" />;
      },
      getSeparatorVNode() {
        const h = this.$createElement;
        return h('ux-icon', {
          props: {
            type: 'star',
          },
        });
      },
    },
    components: {
      UxBreadcrumb,
      UxBreadcrumbItem,
      UxIcon,
    },
  };
</script>
