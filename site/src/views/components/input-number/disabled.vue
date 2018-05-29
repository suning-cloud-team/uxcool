<template>
  <ux-demo title="禁用"
           :height="200">
    <div slot="demo">
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
    <div slot="desc">
      设置
      <code>readonly</code>、
      <code>disabled</code>属性可以改变状态。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/disabled.vue';

  export default {
    data() {
      return {
        code,
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

