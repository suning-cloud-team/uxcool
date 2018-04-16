<template>
  <div>
    <div class="demo">
      <ux-slider :value="20"
                 :disabled="disabled" />
    </div>
    <div class="demo">
      <ux-slider range
                 :value="[20, 40]"
                 :disabled="disabled" />
    </div>
    Disabled:
    <ux-switch size="small"
               :checked="disabled"
               @change="onChange" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabled: true,
      };
    },
    methods: {
      onChange(flag) {
        this.disabled = flag;
      },
    },
  };
</script>
