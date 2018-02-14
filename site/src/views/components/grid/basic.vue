<template>
  <ux-demo title="基础用法">
    <div slot="desc">
      <p>
        <code>&lt;ux-row&gt;</code>
        作为容器，使用
        <code>span</code>指定
        <code>&lt;ux-col&gt;</code>的格数，每行总格数不超过24。
      </p>
    </div>
    <div slot="demo">
      <ux-row class="demo-row">
        <ux-col :span="12"
                class="demo-col">span: 12</ux-col>
        <ux-col :span="12"
                class="demo-col light">span: 12</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col light">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="10"
                class="demo-col">span: 10</ux-col>
        <ux-col :span="7"
                class="demo-col light">span: 7</ux-col>
        <ux-col :span="7"
                class="demo-col">span: 7</ux-col>
      </ux-row>
    </div>

    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/grid/basic';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
