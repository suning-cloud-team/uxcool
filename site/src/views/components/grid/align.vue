<template>
  <ux-demo title="对齐" anchor="align">
    <div slot="demo">
      <ux-row class="demo-row bg"
              flex
              justify="start">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              justify="center">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              justify="end">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              justify="space-between">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              justify="space-around">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              align="top">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              align="middle">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row bg"
              flex
              align="bottom">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
    </div>
    <div slot="desc">
      在Flex布局中，通过
      <code>&lt;ux-row&gt;</code>的
      <code>justify</code>属性指定栅格的水平对齐方式，
      <code>align</code>属性指定垂直对齐方式。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/grid/align';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
