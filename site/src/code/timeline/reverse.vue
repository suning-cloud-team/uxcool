<template>

  <div>
    <ux-timeline :reverse="reverse"
                 pending="loading">
      <ux-timeline-item>A</ux-timeline-item>
      <ux-timeline-item>B</ux-timeline-item>
      <ux-timeline-item>C</ux-timeline-item>
    </ux-timeline>
    <ux-button @click="toggle">toggle reverse</ux-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reverse: false,
      };
    },
    methods: {
      toggle() {
        this.reverse = !this.reverse;
      },
    },
  };
</script>
