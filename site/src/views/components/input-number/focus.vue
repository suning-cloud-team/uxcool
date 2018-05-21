<template>
  <ux-demo title="聚焦"
           :height="200">
    <div slot="demo">
      <ux-input-number ref="inputRef"
                       v-model="num"
                       @focus="onFocus"
                       @blur="onBlur" />
      <div class="my-xs-2">
        <ux-button class="mr-xs-2"
                   type="primary"
                   @click="focus">focus</ux-button>
        <ux-button type="primary"
                   @click="blur">blur</ux-button>
      </div>
    </div>
    <div slot="desc">
      可以通过focus()、blur()方法获取、移除焦点。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/focus.vue';

  export default {
    data() {
      return {
        code,
        num: 5,
      };
    },
    methods: {
      focus() {
        const { $refs: { inputRef } } = this;
        if (inputRef) {
          inputRef.focus();
        }
      },
      blur() {
        const { $refs: { inputRef } } = this;
        if (inputRef) {
          inputRef.blur();
        }
      },
      onFocus(e) {
        console.log('onFocus', e);
      },
      onBlur(e) {
        console.log('onBlur', e);
      },
    },
  };
</script>

