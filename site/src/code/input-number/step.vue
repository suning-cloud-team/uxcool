<template>
  <div>
    <ux-input-number novalidate
                     :value="num"
                     :step="0.1"
                     :min="min"
                     :max="max"
                     name="abc"
                     class="mr-xs-2" />
    <ux-input-number novalidate
                     :value="num"
                     :step="0.2"
                     :min="min"
                     :max="max"
                     name="def" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
        min: 1,
        max: 10,
      };
    },
  };
</script>
