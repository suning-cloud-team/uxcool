<template>
  <div>
    <input-demo />
    <search-demo />
    <size-demo />
    <tooltip-demo />
    <textarea-demo />
    <group-demo />
  </div>
</template>


<script>
  import InputDemo from './input.vue';
  import TextareaDemo from './textarea.vue';
  import TooltipDemo from './tooltip.vue';
  import SizeDemo from './size.vue';
  import SearchDemo from './search.vue';
  import GroupDemo from './group.vue';

  export default {
    components: {
      InputDemo,
      TextareaDemo,
      TooltipDemo,
      SizeDemo,
      SearchDemo,
      GroupDemo,
    },
  };
</script>
