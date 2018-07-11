<template>
  <ux-demo title="flex布局"
           anchor="flex">
    <div slot="demo">
      <ux-row class="demo-row"
              flex>
        <ux-col :span="24"
                class="demo-col">span: 24</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex>
        <ux-col :span="12"
                class="demo-col">span: 12</ux-col>
        <ux-col :span="12"
                class="demo-col light">span: 12</ux-col>
      </ux-row>
      <ux-row :flex="true"
              class="demo-row">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col light">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
      </ux-row>
      <ux-row :flex="true"
              class="demo-row">
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
      </ux-row>
    </div>
    <div slot="desc">通过设置
      <code>&lt;ux-row&gt;</code>的
      <code>flex</code>属性，可以使用flex布局（现代浏览器才支持）。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/grid/flex';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
