export default `
<template>
  <div style="width: 400px">
    <ux-progress></ux-progress>
    <ux-progress percentage="30"></ux-progress>
    <ux-progress percentage="30" status="error"></ux-progress>
    <ux-progress percentage="100" status="success"></ux-progress>
    <ux-progress percentage="100" hide-info></ux-progress>
  </div>
</template>
`;
