<template>
  <ux-demo title="偏移" anchor="offset">
    <div slot="demo">
      <ux-row class="demo-row bg">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                :offset="8"
                class="demo-col light">span: 8, offset: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row bg">
        <ux-col :span="12"
                :offset="6"
                class="demo-col">span: 12, offset: 6</ux-col>
      </ux-row>
      <ux-row class="demo-row bg">
        <ux-col :span="7"
                :offset="1"
                class="demo-col">span: 7, offset: 1</ux-col>
        <ux-col :span="7"
                :offset="1"
                class="demo-col light">span: 7, offset: 1</ux-col>
        <ux-col :span="7"
                :offset="1"
                class="demo-col">span: 7, offset: 1</ux-col>
      </ux-row>
    </div>
    <div slot="desc">
      可以通过<code>&lt;ux-col&gt;</code>的
      <code>offset</code>属性指定偏移。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/grid/offset';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
