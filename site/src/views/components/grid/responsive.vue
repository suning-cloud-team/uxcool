<template>
  <ux-demo title="响应式布局" anchor="responsive">
    <div slot="demo">
      <ux-row class="demo-row">
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24<br> sm: 12<br> md: 8<br> lg: 6<br> xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24<br> sm: 12<br> md: 8<br> lg: 6<br> xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24<br> sm: 12<br> md: 8<br> lg: 6<br> xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24<br> sm: 12<br> md: 8<br> lg: 6 <br> xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24<br> sm: 12<br> md: 8<br> lg: 6 <br> xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24<br> sm: 12<br> md: 8<br> lg: 6<br> xl: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :xs="{span: 24}"
                :sm="{span: 11, offset: 1}"
                :md="{span: 8, offset: 8}"
                :lg="{span: 6, offset: 6}"
                :xl="{span: 4, offset: 0}"
                class="demo-col">xs: {span: 24}<br> sm: {span: 11, offset: 1} <br> md: {span: 8, offset: 8}<br> lg: {span: 6, offset: 6}<br> xl: {span: 4, offset: 0}</ux-col>
        <ux-col :xs="{span: 24}"
                :sm="{span: 11, offset: 1}"
                :md="{span: 8, offset: 8}"
                :lg="{span: 6, offset: 6}"
                :xl="{span: 4, offset: 0}"
                class="demo-col light">xs: {span: 24}<br> sm: {span: 11, offset: 1} <br> md: {span: 8, offset: 8}<br> lg: {span: 6, offset: 6}<br> xl: {span: 4, offset: 0}</ux-col>
      </ux-row>
    </div>
    <div slot="desc">
      通过
      <code>xs</code>、
      <code>sm</code>、
      <code>md</code>、
      <code>lg</code>、
      <code>xl</code>属性可以指定在不同屏幕下的
      <code>span</code>、
      <code>offset</code>、
      <code>order</code>。(可以调整浏览器窗口大小观察在不同宽度下的布局。)
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<style lang="scss" scoped>
.demo-col {
  margin-bottom: 10px;
}
</style>


<script>
import code from '@/code/grid/responsive';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
