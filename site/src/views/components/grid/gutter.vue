<template>
  <ux-demo title="间隔" anchor="gutter">
    <div slot="demo">
      <ux-row class="demo-row"
              :gutter="10">
        <ux-col :span="12">
          <div class="demo-col">span: 12</div>
        </ux-col>
        <ux-col :span="12">
          <div class="demo-col light">span: 12</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row"
              :gutter="10">
        <ux-col :span="12">
          <ux-row>
            <ux-col :span="12"
                    class="demo-col">span: 12</ux-col>
            <ux-col :span="12"
                    class="demo-col light">span: 12</ux-col>
          </ux-row>
        </ux-col>
        <ux-col :span="12">
          <div class="demo-col">span: 12</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row"
              :gutter="20">
        <ux-col :span="8">
          <div class="demo-col">span: 8</div>
        </ux-col>
        <ux-col :span="8">
          <div class="demo-col light">span: 8</div>
        </ux-col>
        <ux-col :span="8">
          <div class="demo-col">span: 8</div>
        </ux-col>
      </ux-row>
    </div>
    <div slot="desc">
      使用
      <code>&lt;ux-row&gt;</code>的
      <code>gutter</code>属性指定直接后代
      <code>&lt;ux-col&gt;</code>的间隔。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/grid/gutter';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
