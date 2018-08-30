<template>
  <article class="doc">
    <h1 class="ux-heading">Affix
      <span class="subtitle">固钉</span>
    </h1>
    <basic-demo/>
    <option-demo />
    <upper-demo />
    <category-demo />
    <uncertain-category-demo />
    <custom-demo />
    <disabled-demo />
    <hr>
    <doc/>
  </article>
</template>

<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import OptionDemo from './option.vue';
  import UpperDemo from './upper.vue';
  import CategoryDemo from './category.vue';
  import UncertainCategoryDemo from './uncertain-category.vue';
  import CustomDemo from './custom.vue';
  import DisabledDemo from './disabled.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      OptionDemo,
      UpperDemo,
      CategoryDemo,
      UncertainCategoryDemo,
      CustomDemo,
      DisabledDemo,
    },
  };
</script>
