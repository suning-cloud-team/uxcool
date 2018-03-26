export default `

<template>
  <div>
    <ux-tag>Tag 1</ux-tag>
    <ux-tag>
      <a href="https://www.suning.com"
         target="_blank">Link</a>
    </ux-tag>
    <ux-tag closable>
      <a href="https://www.suning.com"
         target="_blank">Link closable</a>
    </ux-tag>
    <ux-tag closable
            @close="onClose"
            @after-close="onAfterClose">Tag 2</ux-tag>
    <ux-tag closable>Tag 3</ux-tag>
    <ux-tag closable
            @after-close="onAfterClose">Tag 4</ux-tag>
  </div>
</template>
<script>
  import code from '@/code/tag/basic';

  export default {
    data() {
      return {
        code,
      };
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
`;
