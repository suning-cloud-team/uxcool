<template>
  <ux-demo title="不可用"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-switch disabled/>
      <ux-switch disabled
                 checked/>
      <br>
      <ux-switch :disabled="disabled"
                 checked/>
      <ux-button @click="toggleDisabled">
        toggle disabled
      </ux-button>
    </div>
    <div slot="desc">
      失效状态
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/switch/disabled';

  export default {
    data() {
      return {
        code,
        disabled: true,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      toggleDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>


