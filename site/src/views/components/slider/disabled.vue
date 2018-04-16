<template>
  <ux-demo title="不可用"
           :height="200">
    <div slot="demo">
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
    <div slot="desc">
      Slider不可用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/disabled.vue';

  export default {
    data() {
      return {
        code,
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
