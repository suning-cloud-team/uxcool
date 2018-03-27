<template>
  <ux-demo title="大小"
           :height="200">
    <div slot="demo">
      <ux-radio-group type="button"
                      size="large"
                      :options="opts2" />
      <br>
      <br>
      <ux-radio-group type="button"
                      :options="opts2" />
      <br>
      <br>
      <ux-radio-group type="button"
                      size="small"
                      :options="opts2" />
    </div>
    <div slot="desc">
      支持 大中小 三种尺寸
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/size.vue';

  export default {
    data() {
      return {
        code,
        opts2: [{ label: '1', value: 'a1', checked: true }, 'b1', 'c1', '1'],
      };
    },
  };
</script>
