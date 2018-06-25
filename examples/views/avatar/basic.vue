<template>
  <div>
    <div class="demo">
      <normal-demo />
      <scale-demo />
      <type-demo />
      <badge-demo />
      <string-demo />
    </div>
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import ScaleDemo from './scale.vue';
  import TypeDemo from './type.vue';
  import BadgeDemo from './badge.vue';
  import StringDemo from './string.vue';

  export default {
    components: {
      NormalDemo,
      ScaleDemo,
      TypeDemo,
      BadgeDemo,
      StringDemo,
    },
  };
</script>
