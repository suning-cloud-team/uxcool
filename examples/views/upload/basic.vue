<template>
  <div>
    <normal-demo/>
    <picture-demo />
    <avatar-demo />
    <preset-demo />
    <picture-card-demo />
    <multiple-demo />
    <control-demo />
    <limit-demo />
    <manual-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
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
      NormalDemo,
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
