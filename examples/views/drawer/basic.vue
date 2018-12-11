<template>
  <div>
    <normal-demo />
    <form-demo />
    <multiple-demo />
    <placement-demo />
    <destroy-demo />
    <close-demo />
    <title-demo />
    <style-demo />
    <width-demo />
    <modal-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import FormDemo from './form.vue';
  import MultipleDemo from './multiple.vue';
  import PlacementDemo from './placement.vue';
  import DestroyDemo from './destroy-on-close.vue';
  import CloseDemo from './close.vue';
  import TitleDemo from './title.vue';
  import StyleDemo from './style.vue';
  import WidthDemo from './width.vue';
  import ModalDemo from './modal.vue';

  export default {
    components: {
      NormalDemo,
      FormDemo,
      MultipleDemo,
      PlacementDemo,
      DestroyDemo,
      CloseDemo,
      TitleDemo,
      StyleDemo,
      WidthDemo,
      ModalDemo,
    },
  };
</script>
