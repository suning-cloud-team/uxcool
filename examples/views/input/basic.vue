<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{ theme }}</button>

    <ux-textarea novalidate
                 :theme="theme"
                 placeholder="测试用"
                 class="custom-class"
                 style="resize:none"
                 :auto-size="{minRows:2, maxRows:6}" />

    <ux-textarea spellcheck="false"
                 :theme="theme"
                 :value="value"
                 :auto-size="true" />

    <ux-textarea :value="value"
                 :theme="theme" />
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/input/style/index.scss';
  import { UxTextarea } from '@suning/uxcool/src/components/input';

  export default {
    data() {
      return {
        value: 'abc',
        theme: 'light',
      };
    },
    created() {
      setTimeout(() => {
        this.value = 'c\nggggggggg';
      }, 1500);
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
    },
    components: {
      UxTextarea,
    },
  };
</script>
