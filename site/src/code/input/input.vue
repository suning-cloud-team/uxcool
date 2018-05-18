<template>
  <div>
    <ux-input v-model="inputVal1"
              autofocus
              id="a1"
              placeholder="Normal Input" />
    <ux-input disabled
              autofocus
              id="a2"
              style="color:red"
              placeholder="Disabled Input" />
  </div>
</template>


<script>
  export default {};
</script>
