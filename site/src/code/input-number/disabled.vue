<template>
  <div>
    <ux-input-number v-model="num"
                     :readonly="readonly"
                     :disabled="disabled" />
    <div class="my-xs-2">
      <ux-button class="mr-xs-2"
                 type="primary"
                 @click="toggleReadonly">readonly = {{ readonly }}</ux-button>
      <ux-button type="primary"
                 @click="toggleDisabled">disabled = {{ disabled }}</ux-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 5,
        readonly: false,
        disabled: false,
      };
    },
    methods: {
      toggleReadonly() {
        this.readonly = !this.readonly;
      },
      toggleDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>
