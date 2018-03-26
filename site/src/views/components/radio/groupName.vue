<template>
  <ux-demo title="命名分组"
           :height="200">
    <div slot="demo">
      <ux-radio-group name="a"
                      :options="opts5" />
    </div>
    <div slot="desc">
      设置
      <code>name</code>属性, 使浏览器将RadioGroup下的radio识别为一个真正的组,以利用浏览器的原生功能
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/groupName.vue';

  export default {
    data() {
      return {
        code,
        opts5: ['aa', 'bb', 'cc'],
      };
    },
  };
</script>
