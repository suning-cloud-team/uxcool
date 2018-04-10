<template>
  <div>
    <h4>badge</h4>
    <div class="demo">
      <badge count="11">
        <avatar icon="account"
                shape="square" />
      </badge>

      <badge dot>
        <avatar icon="account"
                shape="square" />
      </badge>

    </div>
  </div>
</template>


<script>
  import { Avatar, Badge } from '@suning/uxcool';

  export default {
    components: {
      Avatar,
      Badge,
    },
  };
</script>
<style scoped>
  .ux-badge {
    margin: 10px 20px 0 0;
  }
</style>
