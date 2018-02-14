export default `
<template>
  <div>
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
</template>`;
