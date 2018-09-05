<template>
  <ux-card-advance title="Grid Card">
    <ux-card-grid v-for="(v, i) in 10"
                  :key="i"
                  style="width:25%;text-align:center;">
      grid content
    </ux-card-grid>
  </ux-card-advance>
</template>

<script>
  export default {};
</script>
