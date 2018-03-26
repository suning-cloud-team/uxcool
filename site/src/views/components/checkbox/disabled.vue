<template>
  <ux-demo title="不可用"
           :height="200">
    <div slot="demo">
      <ux-checkbox v-model="disabledChecked"
                   disabled>disabled</ux-checkbox>

      <ux-checkbox-group disabled
                         :options="someDisabledOpts" />
    </div>
    <div slot="desc">
      禁用
      <code>Checkbox</code>或
      <code>Checkbox Group</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/disabled.vue';

  export default {
    data() {
      return {
        code,
        disabledChecked: true,
        someDisabledOpts: [
          { label: 'aa', value: 'aa' },
          'cc',
          'dd',
          { label: 'ee', value: 'ee', disabled: false },
        ],
        opts1: [
          { label: 'aa', value: 'aa' },
          'cc',
          'dd',
          { label: 'ee', value: 'ee', disabled: true },
        ],
      };
    },
  };
</script>
