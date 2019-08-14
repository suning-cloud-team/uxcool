<template>
  <ux-upload v-model="fileList"
             action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
             list-type="picture-card">
    <span v-if="fileList.length<3">
      <ux-icon type="add" />Upload
    </span>
  </ux-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
      };
    },
  };
</script>

<style scoped>
  .fu-add {
    font-size: 48px;
    color: #ccc;
  }
</style>
