<template>
  <div class="demo">
    <h4>control</h4>
    {{ checked }}
    <ux-switch v-model="checked"
               @click="onClick" />
  </div>

</template>

<script>
  import { Switch } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxSwitch: Switch,
    },
    data() {
      return {
        checked: false,
      };
    },
    methods: {
      onClick(checked) {
        this.$nextTick(() => {
          this.checked = false;
        });
      },
    },
  };
</script>
