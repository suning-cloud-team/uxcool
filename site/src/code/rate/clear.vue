<template>
  <div>
    <ux-rate :value="3"
             :allow-clear="false" />
    <span>allow-clear: false</span>
    <br>
    <ux-rate :value="2" />
    <span>allow-clear: true</span>
  </div>
</template>

<script>
  export default {};
</script>

