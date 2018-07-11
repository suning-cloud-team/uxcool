export default `
<template>
  <div>
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
</template>`;
