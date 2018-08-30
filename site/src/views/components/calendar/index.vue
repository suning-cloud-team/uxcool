<template>
  <article class="doc">
    <h1 class="ux-heading">Calendar
      <span class="subtitle">日历</span>
    </h1>
    <basic-demo/>
    <disabled-date-demo />
    <render-demo />
    <card-demo />
    <event-demo />
    <valid-range-demo />
    <hr>
    <doc/>
  </article>
</template>

<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import RenderDemo from './render.vue';
  import CardDemo from './card.vue';
  import EventDemo from './event.vue';
  import ValidRangeDemo from './validRange.vue';
  import DisabledDateDemo from './disabledDate.vue';

  export default {
    components: {
      Doc,
      DisabledDateDemo,
      RenderDemo,
      BasicDemo,
      CardDemo,
      EventDemo,
      ValidRangeDemo,
    },
  };
</script>

