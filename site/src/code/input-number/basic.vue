<template>
  <div>
    <ux-input-number :min="0"
                     :max="10"
                     @change="onChange"
                     class="mr-xs-2" />
    <ux-input-number novalidate
                     v-model="num"
                     :min="1"
                     :max="10"
                     @change="onChange" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
    methods: {
      onChange(val) {
        console.log('changed', val);
      },
    },
  };
</script>

