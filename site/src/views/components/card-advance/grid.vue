<template>
  <ux-demo :height="200"
           title="内嵌型卡片">
    <div slot="demo">
      <ux-card-advance title="Grid Card">
        <ux-card-grid v-for="(v, i) in 10"
                      :key="i"
                      style="width:25%;text-align:center;">
          grid content
        </ux-card-grid>
      </ux-card-advance>
    </div>
    <div slot="desc">
      常见的内嵌卡片
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card-advance/grid.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
