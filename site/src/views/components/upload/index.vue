<template>
  <article class="doc">
    <h1 class="ux-heading">Upload
      <span class="subtitle">上传</span>
    </h1>
    <basic-demo />
    <picture-demo />
    <avatar-demo />
    <preset-demo />
    <picture-card-demo />
    <multiple-demo />
    <control-demo />
    <limit-demo />
    <manual-demo />
    <hr>
    <doc />
  </article>
</template>

<script>
  import Doc from './_doc.vue';
  import BasicDemo from './basic.vue';
  import PictureDemo from './picture.vue';
  import PictureCardDemo from './pictureCard.vue';
  import AvatarDemo from './avatar.vue';
  import PresetDemo from './preset.vue';
  import MultipleDemo from './multiple.vue';
  import ControlDemo from './control.vue';
  import LimitDemo from './limit.vue';
  import ManualDemo from './manual.vue';

  export default {
    components: {
      Doc,
      BasicDemo,
      PictureDemo,
      PictureCardDemo,
      AvatarDemo,
      PresetDemo,
      MultipleDemo,
      ControlDemo,
      LimitDemo,
      ManualDemo,
    },
  };
</script>
