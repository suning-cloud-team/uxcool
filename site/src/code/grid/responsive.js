export default `
<template>
  <div>
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
</template>

<style lang="scss" scoped>
  .demo-col {
    margin-bottom: 10px;
  }
</style>`;
