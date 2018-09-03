<template>
  <div>
    <line-demo />
    <circle-demo />
    <size-demo />
    <format-demo />
    <operater-demo />
    <dashboard-demo />

  </div>
</template>


<script>
  import LineDemo from './line.vue';
  import CircleDemo from './circle.vue';
  import SizeDemo from './size.vue';
  import FormatDemo from './format.vue';
  import OperaterDemo from './operater.vue';
  import DashboardDemo from './dashboard.vue';

  export default {
    components: {
      LineDemo,
      CircleDemo,
      SizeDemo,
      FormatDemo,
      OperaterDemo,
      DashboardDemo,
    },
  };
</script>
