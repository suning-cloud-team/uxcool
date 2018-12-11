<template>
  <div>
    <div class="demo">
      <tag :theme="theme">Tag 1</tag>
      <tag :theme="theme">
        <a href="https://www.suning.com"
           target="_blank">Link</a>
      </tag>
      <tag :theme="theme"
           closable>
        <a href="https://www.suning.com"
           target="_blank">Link closable</a>
      </tag>
      <tag :theme="theme"
           closable
           @close="onClose"
           @after-close="onAfterClose">Tag 2</tag>

      <tag :theme="theme"
           closable>Tag 3</tag>
      <tag :theme="theme"
           closable
           @after-close="onAfterClose">Tag 4</tag>
    </div>
    <color-demo />
    <checkable-demo />
    <before-close-demo />
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { Tag } from '@suning/uxcool';
  import CheckableDemo from './checkable.vue';
  import ColorDemo from './color.vue';
  import BeforeCloseDemo from './beforeClose.vue';

  export default {
    components: {
      Tag,
      CheckableDemo,
      ColorDemo,
      BeforeCloseDemo,
    },
    computed: mapState(['theme']),
    methods: {
      onClose(e) {
        console.log('close', e);
      },
      onAfterClose(e) {
        console.log('onAfterClose', e);
      },
    },
  };
</script>
