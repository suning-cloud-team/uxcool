<template>
  <article class="doc">
    <h1 class="ux-heading">Select
      <span class="subtitle">下拉框</span>
    </h1>

    <basic-demo />
    <disabled-demo />
    <group-demo />
    <multiple-demo />
    <tags-demo />
    <huge-demo />
    <max-tags-demo />

    <hr>
    <doc/>
  </article>
</template>


<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import DisabledDemo from './disabled.vue';
  import GroupDemo from './group.vue';
  import MultipleDemo from './multiple.vue';
  import TagsDemo from './tags.vue';
  import HugeDemo from './huge.vue';
  import MaxTagsDemo from './maxTags.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      DisabledDemo,
      GroupDemo,
      MultipleDemo,
      TagsDemo,
      HugeDemo,
      MaxTagsDemo,
    },
  };
</script>

