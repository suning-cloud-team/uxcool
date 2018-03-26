<template>
  <ux-demo title="单选"
           :height="200">
    <div slot="demo">
      <ux-radio-group>
        <ux-radio value="1"
                  label="1" />
        <ux-radio value="2"
                  label="2" />
      </ux-radio-group>
    </div>
    <div slot="desc">
      radio互斥, 同一时间只能选中一个radio
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/single.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
