<template>
  <div>
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
</template>

<script>
  export default {
    data() {
      return {
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
