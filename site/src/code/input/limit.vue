<template>
  <div>
    <ux-input v-model="val1"
              maxlength="20"
              show-word-limit />
    <ux-input v-model="val1"
              maxlength="20"
              show-word-limit
              allow-clear />
    <ux-textarea v-model="val2"
                 show-word-limit
                 maxlength="20" />
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
