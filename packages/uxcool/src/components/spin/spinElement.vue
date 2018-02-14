<template>
  <div>
    <slot name="indicator">
    </slot>
    <slot name="tip">
    </slot>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('SpinElement'),
  };
</script>
