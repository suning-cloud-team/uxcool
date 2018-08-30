<template>
  <ux-calendar :disabled-date="disabledDate"
               @change="onChange" />
</template>

<script>
  import { isSameDay, setDate } from 'date-fns';

  export default {
    methods: {
      disabledDate(current) {
        return isSameDay(current, setDate(new Date(), 4));
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
