<template>
  <ux-demo title="文字限制提示">
    <div slot="demo">
      <div>
        <ux-input v-model="val1"
                  maxlength="20"
                  show-word-limit
                  class="my-xs-2" />
        <ux-input v-model="val1"
                  maxlength="20"
                  show-word-limit
                  allow-clear
                  class="my-xs-2" />
        <ux-textarea v-model="val2"
                     show-word-limit
                     maxlength="20"
                     class="my-xs-2" />
      </div>
    </div>
    <div slot="desc">
      通过<code>showWordLimit</code>和<code>maxlength</code>属性指定是否显示字数限制。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/limit.vue';

  export default {
    data() {
      return {
        code,
        val1: '',
        val2: '',
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
