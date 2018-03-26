<template>
  <ux-demo title="不可用"
           :height="200">
    <div slot="demo">
      <ux-radio disabled
                label="disabled" />
      <br>
      <ux-radio :disabled="tDisabled"
                label="disabled" />
      <ux-radio :disabled="tDisabled"
                checked
                label="disabled" />
      <ux-button @click="toggleDisabled">toggle disabled</ux-button>
    </div>
    <div slot="desc">
      Radio 不可用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/disabled.vue';

  export default {
    data() {
      return {
        code,
        tDisabled: false,
      };
    },
    methods: {
      toggleDisabled() {
        this.tDisabled = !this.tDisabled;
      },
    },
  };
</script>
