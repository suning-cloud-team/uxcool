<template>
  <ux-affix :offset-bottom="30"
            @change="onChange">
    <ux-button>event</ux-button>
  </ux-affix>
</template>

<script>
  export default {
    methods: {
      onChange(flag) {
        console.log('是否浮动', flag);
      },
    },
  };
</script>

