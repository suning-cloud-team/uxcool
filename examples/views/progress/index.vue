<template>
  <div>
    <ux-progress percentage="20"></ux-progress>
    <ux-progress percentage="50" status="error"></ux-progress>
    <ux-progress percentage="100" status="success"></ux-progress>
    <ux-progress percentage="20" stroke-width="2"></ux-progress>
    <ux-progress percentage="20" status="error" stroke-width="2"></ux-progress>
    <ux-progress percentage="20" status="success" stroke-width="2"></ux-progress>
    <ux-progress percentage="20" status="success" stroke-width="20"></ux-progress>
    <ux-progress percentage="20" hide-info></ux-progress>
    <ux-progress percentage="20" status="error" hide-info></ux-progress>
    <ux-progress percentage="20" status="success" hide-info></ux-progress>
  </div>
</template>


<script>
import UxProgress from '@suning/uxcool/src/components/progress';
import '@suning/uxcool/src/components/progress/style/index.scss';

export default {
  components: { UxProgress },
};
</script>
