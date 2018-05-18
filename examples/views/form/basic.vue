<template>
  <div>
    <normal-demo />
    <login-demo />
    <login-horizontal-demo />
    <register-demo />
    <search-demo />
    <modal-demo />
    <dynamic-demo />
    <method-demo />
    <vuex-demo />

  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import LoginDemo from './login.vue';
  import LoginHorizontalDemo from './login-horizontal.vue';
  import RegisterDemo from './register.vue';
  import SearchDemo from './search.vue';
  import ModalDemo from './modal.vue';
  import DynamicDemo from './dynamic.vue';
  import MethodDemo from './method.vue';
  import VuexDemo from './vuex.vue';

  export default {
    components: {
      NormalDemo,
      LoginDemo,
      LoginHorizontalDemo,
      RegisterDemo,
      SearchDemo,
      ModalDemo,
      MethodDemo,
      DynamicDemo,
      VuexDemo,
    },
  };
</script>

<style scoped>
  /deep/ .demo {
    width: 600px;
  }
</style>
