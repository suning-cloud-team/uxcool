<template>
  <v-step v-bind="$props"
          v-on="$listeners">
    <template slot="icon">
      <slot name="icon"></slot>
    </template>
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="desc">
      <slot name="desc"></slot>
    </template>
  </v-step>
</template>


<script>
  import { VStep } from '@cloud-sn/v-steps';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Step'),
    props: {
      icon: String,
      title: String,
      desc: String,
    },
    components: {
      VStep,
    },
  };
</script>
