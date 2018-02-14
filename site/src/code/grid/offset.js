export default `
<template>
  <div>
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
</template>
`;
