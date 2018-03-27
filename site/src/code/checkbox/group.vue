<template>
  <div>
    <ux-checkbox-group v-model="checkedList"
                       @change="onGroupChange">
      <ux-checkbox label="123"
                   value="1" />
      <ux-checkbox label="321"
                   value="2" />
    </ux-checkbox-group>

    <ux-checkbox-group v-model="checkedOpts"
                       :options="options" />

    <ux-checkbox-group :options="opts1"
                       @change="onGroupChange" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkedList: [],
        checkedOpts: ['a'],
        options: ['a', 'b', 'c'],
        opts1: [
          { label: 'aa', value: 'aa' },
          'cc',
          'dd',
          { label: 'ee', value: 'ee', disabled: true },
        ],
      };
    },
    methods: {
      onGroupChange(e, prevCheckedList) {
        console.log('onGroupChange', e, prevCheckedList);
      },
    },
  };
</script>
