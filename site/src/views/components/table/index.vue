<template>
  <article class="doc">
    <h1 class="ux-heading">Table<span class="subtitle">表格</span></h1>

    <ux-heading level="2" id="overview">概览</ux-heading>
    <p>目前表格组件只提供了几种简单的样式，后期会扩展功能并封装成组件。</p>

    <demo-basic></demo-basic>
    <demo-strip></demo-strip>
    <demo-merge></demo-merge>
    <demo-tree></demo-tree>
  </article>
</template>

<script>
import demoBasic from './basic.vue';
import demoStrip from './strip.vue';
import demoMerge from './merge.vue';
import demoTree from './tree.vue';

export default {
  components: {
    demoBasic,
    demoStrip,
    demoMerge,
    demoTree,
  },
};
</script>
