<template>
  <div>
    <disabled-date-demo />
    <render-demo />
    <card-demo />
    <month-demo />
    <event-demo />
    <valid-range-demo />
  </div>
</template>

<script>
  import RenderDemo from './render.vue';
  import MonthDemo from './month.vue';
  import CardDemo from './card.vue';
  import EventDemo from './event.vue';
  import ValidRangeDemo from './validRange.vue';
  import DisabledDateDemo from './disabledDate.vue';

  export default {
    components: {
      DisabledDateDemo,
      RenderDemo,
      MonthDemo,
      CardDemo,
      EventDemo,
      ValidRangeDemo,
    },
  };
</script>
