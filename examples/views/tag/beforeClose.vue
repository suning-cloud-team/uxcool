<template>

  <div class="demo">
    <h6>before close</h6>
    <ux-tag v-for="(color, i) in tags"
            :key="i"
            :on-before-close="onBeforeClose"
            closable
            @close="onClose"
            @after-close="onAfterClose">
      {{ color }}
    </ux-tag>
  </div>
</template>
<script>
  import { Tag } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTag: Tag,
    },
    data() {
      return {
        tags: [
          'pink',
          'magenta',
          'red',
          'volcano',
          'orange',
          'yellow',
          'gold',
          'cyan',
          'lime',
          'green',
          'blue',
          'geekblue',
          'purple',
        ],
      };
    },
    methods: {
      onBeforeClose(e) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1500);
        });
      },
      onClose(e) {
        console.log('close', e);
      },
      onAfterClose(e) {
        console.log('onAfterClose', e);
      },
    },
  };
</script>
