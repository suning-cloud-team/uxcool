<template>
  <div ref="customRef"
       class="demo">
    <div style="position:absolute;width:100%;padding:20px;">
      <div style="height:800px;background: pink">
        <backtop :get-target="getTarget"
                 style="right:140px" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Backtop } from '@suning/uxcool';

  export default {
    components: {
      Backtop,
    },
    methods: {
      getTarget() {
        return this.$refs.customRef;
      },
    },
  };
</script>


<style lang="scss" scoped>
  .demo {
    position: relative;
    width: 200px;
    height: 200px;
    margin-top: 200px;
    padding: 0;
    background: skyblue;
    overflow: auto;
  }
</style>
