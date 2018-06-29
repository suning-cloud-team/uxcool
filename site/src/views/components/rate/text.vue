<template>
  <ux-demo :height="200"
           title="自定义文案">
    <div slot="demo">
      <span>
        <ux-rate v-model="value"
                 allow-half/>
        <span>
          {{ value ? value : 0 }} stars
        </span>
      </span>
    </div>
    <div slot="desc">
      自定义文案
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/text.vue';

  export default {
    data() {
      return {
        code,
        value: 2,
      };
    },
  };
</script>
