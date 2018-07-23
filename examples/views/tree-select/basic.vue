<template>
  <div>
    <normal-demo />
    <async-demo />
    <search-demo />
    <multiple-demo />
    <checkable-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import AsyncDemo from './async.vue';
  import SearchDemo from './search.vue';
  import MultipleDemo from './multiple.vue';
  import CheckableDemo from './checkable.vue';

  export default {
    components: {
      NormalDemo,
      AsyncDemo,
      SearchDemo,
      MultipleDemo,
      CheckableDemo,
    },
  };
</script>
