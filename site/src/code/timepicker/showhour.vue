<template>
  <div>
    <ux-timepicker v-model="value"
                   :show-second="false" />
    <ux-timepicker format="H:m"
                   @change="onChange" />
  </div>

</template>

<script>
  export default {
    data() {
      return {
        value: new Date(2018, 10, 10, 10, 20, 25),
      };
    },

    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
