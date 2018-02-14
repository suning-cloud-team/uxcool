<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{ theme }}</button>
    <br>
    <badge count="20"
           :theme="theme">
      <a class="demo-a" />
    </badge>
    <br>
    <badge count="99"
           :theme="theme">
      <a class="demo-a" />
    </badge>
    <badge count="999"
           :theme="theme">
      <a class="demo-a" />
    </badge>
    <badge :theme="theme"
           count="99"
           overflow-count="10">
      <a class="demo-a" />
    </badge>

    <badge :theme="theme"
           count="1000"
           overflow-count="999">
      <a class="demo-a" />
    </badge>
    <br>
    <badge :theme="theme"
           count="0"
           :show-zero="true">
      <a class="demo-a" />
    </badge>
    <badge :theme="theme"
           count="0">
      <a class="demo-a" />
    </badge>

    <br>

    <a href="http://www.baidu.com"
       target="blank">
      <badge count="5">
        <a class="demo-a" />
      </badge>
    </a>
    <br>
    <badge :theme="theme"
           status="success" />
    <badge :theme="theme"
           status="error" />
    <badge :theme="theme"
           status="default" />
    <badge :theme="theme"
           status="processing" />
    <badge :theme="theme"
           status="warning" />
    <br>
    <badge :theme="theme"
           status="success"
           text="success" />
    <br>
    <badge :theme="theme"
           status="error"
           text="error" />
    <br>
    <badge :theme="theme"
           status="default"
           text="default" />

    <br>
    <badge :theme="theme"
           status="processing"
           text="processing" />
    <br>
    <badge :theme="theme"
           status="warning"
           text="warning" />
    <br>
    <badge :theme="theme"
           count="25" />
    <badge :theme="theme"
           count="4"
           :custom-style="customStyle" />
    <badge :theme="theme"
           count="109"
           :custom-style="{background: 'green'}" />

    <br>
    <badge :theme="theme"
           :dot="true">link</badge>
    <badge :theme="theme"
           :dot="true">
      <i class="fu fu-account" />
    </badge>
  </div>
</template>

<script>
  import '@suning/uxcool/src/components/badge/style/index.scss';
  import Badge from '@suning/uxcool/src/components/badge/index';

  export default {
    components: {
      Badge,
    },
    data() {
      return {
        theme: 'light',
        customStyle: {
          backgroundColor: '#fff',
          color: '#999',
          boxShadow: '0 0 0 1px #d9d9d9 inset',
        },
      };
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
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
