<template>
  <div>
    <h4>type</h4>
    <div class="demo">
      <avatar icon="account" />
      <avatar>U</avatar>
      <avatar>user</avatar>
      <avatar :src="imgSrc" />
      <avatar style="background:#fde3cf;color:#f56a00">U</avatar>
      <avatar style="background:#87d068;"
              icon="account" />
    </div>
  </div>
</template>


<script>
  import { Avatar } from '@suning/uxcool';

  export default {
    components: {
      Avatar,
    },
    data() {
      return {
        imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmavfO0SftVjdMIyXTZH1o2I4w-FP5ETIQlKMA8hG7Z_f2UYQugw',
      };
    },
  };
</script>
<style scoped>
  .ux-avatar {
    margin: 10px 10px 0 0;
  }
</style>
