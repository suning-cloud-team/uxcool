export default `
<template>
  <ux-row class="demo-row"
    flex>
    <ux-col :span="6"
      :order="4"
      class="demo-col">1: order-4</ux-col>
    <ux-col :span="6"
      :order="3"
      class="demo-col light">2: order-3</ux-col>
    <ux-col :span="6"
      :order="2"
      class="demo-col">3: order-2</ux-col>
    <ux-col :span="6"
      :order="1"
      class="demo-col light">4: order-1</ux-col>
  </ux-row>
</template>
`;
