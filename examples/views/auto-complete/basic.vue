<template>
  <div>
    <value-demo />
    <normal-demo />
    <option-demo />
    <upper-demo />
    <category-demo />
    <uncertain-category-demo />
    <custom-demo />
    <disabled-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import OptionDemo from './option.vue';
  import UpperDemo from './upper.vue';
  import CategoryDemo from './category.vue';
  import UncertainCategoryDemo from './uncertain-category.vue';
  import CustomDemo from './custom.vue';
  import DisabledDemo from './disabled.vue';
  import ValueDemo from './value.vue';

  export default {
    components: {
      NormalDemo,
      OptionDemo,
      UpperDemo,
      CategoryDemo,
      UncertainCategoryDemo,
      CustomDemo,
      DisabledDemo,
      ValueDemo,
    },
  };
</script>
