<template>
  <ux-demo title="可清除内容">
    <div slot="demo">
      <div>
        <ux-input v-model="val1"
                  allow-clear
                  class="my-xs-2" />

        <ux-input v-model="val2"
                  allow-clear>
          <ux-icon slot="prefix"
                   type="account_more" />
          <ux-icon slot="suffix"
                   type="close_circle" />
        </ux-input>
      </div>
    </div>
    <div slot="desc">
      通过<code>allowClear</code>属性指定是否可清除内容。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/clear.vue';

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
