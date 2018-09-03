<template>
  <ux-demo :height="200"
           title="圆形进度条">
    <div slot="demo">
      <ux-progress type="circle"
                   percentage="40" />
      <ux-progress type="circle"
                   percentage="10"
                   stroke-color="skyblue" />
      <ux-progress type="circle"
                   percentage="100"
                   status="error" />
      <ux-progress type="circle"
                   percentage="30"
                   status="active" />
    </div>
    <div slot="desc">
      圆形进度条
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/circle.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>


