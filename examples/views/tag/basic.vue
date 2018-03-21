<template>
  <div>
    <div class="demo">
      <tag>Tag 1</tag>
      <tag>
        <a href="https://www.suning.com"
           target="_blank">Link</a>
      </tag>
      <tag closable>
        <a href="https://www.suning.com"
           target="_blank">Link closable</a>
      </tag>
      <tag closable
           @close="onClose"
           @after-close="onAfterClose">Tag 2</tag>

      <tag closable>Tag 3</tag>
      <tag closable
           @after-close="onAfterClose">Tag 4</tag>
    </div>
    <color-demo/>
    <checkable-demo/>
  </div>
</template>
<script>
  import { Tag } from '@suning/uxcool';
  import CheckableDemo from './checkable.vue';
  import ColorDemo from './color.vue';

  export default {
    components: {
      Tag,
      CheckableDemo,
      ColorDemo,
    },
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
