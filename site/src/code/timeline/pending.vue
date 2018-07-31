<template>
  <ux-timeline>
    <span slot="pending"
          style="green">this is slot pending</span>
    <ux-icon slot="pendingDot"
             type="horn_o" />
    <ux-timeline-item>A</ux-timeline-item>
    <ux-timeline-item>B</ux-timeline-item>
    <ux-timeline-item>C</ux-timeline-item>
  </ux-timeline>
</template>

<script>
  export default {};
</script>
