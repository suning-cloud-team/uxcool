<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <br>
    <badge count="20"
           :theme="theme">
      <a class="demo-a"></a>
    </badge>
    <br>
    <badge count="99"
           :theme="theme">
      <a class="demo-a"></a>
    </badge>
    <badge count="999"
           :theme="theme">
      <a class="demo-a"></a>
    </badge>
    <badge :theme="theme"
           count="99"
           overflow-count="10">
      <a class="demo-a"></a>
    </badge>

    <badge :theme="theme"
           count="1000"
           overflow-count="999">
      <a class="demo-a"></a>
    </badge>
    <br>
    <badge :theme="theme"
           count="0"
           :show-zero="true">
      <a class="demo-a"></a>
    </badge>
    <badge :theme="theme"
           count="0">
      <a class="demo-a"></a>
    </badge>

    <br>

    <a href="http://www.baidu.com"
       target="blank">
      <badge count="5">
        <a class="demo-a"></a>
      </badge>
    </a>
    <br>
    <badge :theme="theme"
           status="success"></badge>
    <badge :theme="theme"
           status="error"></badge>
    <badge :theme="theme"
           status="default"></badge>
    <badge :theme="theme"
           status="processing"></badge>
    <badge :theme="theme"
           status="warning"></badge>
    <br>
    <badge :theme="theme"
           status="success"
           text="success"></badge>
    <br>
    <badge :theme="theme"
           status="error"
           text="error"></badge>
    <br>
    <badge :theme="theme"
           status="default"
           text="default"></badge>

    <br>
    <badge :theme="theme"
           status="processing"
           text="processing"></badge>
    <br>
    <badge :theme="theme"
           status="warning"
           text="warning"></badge>

    <br>
    <badge :theme="theme"
           count="25"></badge>
    <badge :theme="theme"
           count="4"
           :custom-style="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}"></badge>
    <badge :theme="theme"
           count="109"
           :custom-style="{background: 'green'}"></badge>

    <br>
    <badge :theme="theme"
           :dot="true">link</badge>
    <badge :theme="theme"
           :dot="true">
      <i class="fu fu-account"></i>
    </badge>
  </div>
</template>

<script>
  import '../../../src/components/badge/style/index.scss';
  import Badge from '../../../src/components/badge/index';

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
    },
    components: {
      Badge,
    },
  };
</script>

<style lang="scss" scoped>
  .demo-a {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #eee;
  }
  .ux-badge:not(.ux-badge-status) {
    margin-right: 20px;
  }
</style>
