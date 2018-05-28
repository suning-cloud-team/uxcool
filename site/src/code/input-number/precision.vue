<template>
  <div>
    <ux-input-number novalidate
                     :value="num"
                     :min="0"
                     :max="10"
                     :precision="1"
                     class="mr-xs-2" />
    <ux-input-number novalidate
                     :value="num"
                     :min="0"
                     :max="10"
                     :precision="2" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
  };
</script>
