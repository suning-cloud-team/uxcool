<template>
  <div>
    <ux-checkbox v-model="disabledChecked"
                 disabled>
      disabled
    </ux-checkbox>
    <ux-checkbox-group disabled
                       :options="someDisabledOpts" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
