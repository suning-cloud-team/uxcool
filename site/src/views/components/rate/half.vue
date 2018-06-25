<template>
  <ux-demo :height="200"
           title="半选">
    <div slot="demo">
      <ux-rate :value="1.5"
               allow-half />
    </div>
    <div slot="desc">
      半选
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/half.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
