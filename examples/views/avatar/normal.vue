<template>
  <div>
    <h4>normal</h4>
    <div class="demo">
      <avatar icon="account"
              size="large" />
      <avatar icon="account" />
      <avatar icon="account"
              size="small" />
    </div>
    <div class="demo">
      <avatar icon="account"
              size="large"
              shape="square" />
      <avatar icon="account"
              shape="square" />
      <avatar icon="account"
              size="small"
              shape="square" />
    </div>
  </div>
</template>


<script>
  import { Avatar } from '@cloud-sn/uxcool';

  export default {
    components: {
      Avatar,
    },
  };
</script>
<style scoped>
  .ux-avatar {
    margin: 10px 10px 0 0;
  }
</style>
