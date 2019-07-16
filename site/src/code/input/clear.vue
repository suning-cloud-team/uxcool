<template>
  <div>
    <ux-input v-model="val1"
              allow-clear />

    <ux-input v-model="val2"
              allow-clear>
      <ux-icon slot="prefix"
               type="account_more" />
      <ux-icon slot="suffix"
               type="close_circle" />
    </ux-input>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        val1: '',
        val2: '',
      };
    },
  };
</script>
