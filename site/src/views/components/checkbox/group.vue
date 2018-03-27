<template>
  <ux-demo title="分组"
           :height="200">
    <div slot="demo">
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
    <div slot="desc">
      通过数组或直接子集组成 checkbox Group
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/group.vue';

  export default {
    data() {
      return {
        code,
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
