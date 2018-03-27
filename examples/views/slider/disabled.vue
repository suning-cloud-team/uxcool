<template>
  <div>
    <h4>disabled</h4>
    <div class="demo">
      <Slider :disabled="disabled" />
    </div>
    <div class="demo">
      <Slider a="1"
              range
              :disabled="disabled" />
    </div>
    Disabled:
    <ux-switch size="small"
               :checked="disabled"
               @change="onChange" />
  </div>
</template>

<script>
  import { Slider, Switch } from '@suning/uxcool';

  export default {
    components: {
      Slider,
      UxSwitch: Switch,
    },
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
