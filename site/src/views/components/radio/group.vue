<template>
  <ux-demo title="分组"
           :height="200">
    <div slot="demo">

      <ux-radio-group v-model="checkedOpts1"
                      :options="opts1"
                      @change="onOpts1Change" />
      <br>
      <ux-radio-group :options="opts2" />
      <br>
      <ux-radio-group :options="opts3"
                      @change="onOpts1Change" />
      <br>
      <ux-radio-group disabled
                      :options="opts4"
                      @change="onOpts1Change" />

    </div>
    <div slot="desc">
      通过
      <code>options</code>属性或
      <code>ux-radio</code>组件, 组成Radio Group
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/group.vue';

  export default {
    data() {
      return {
        code,
        checkedOpts1: 'c',
        opts1: ['a', 'b', 'c', 'd'],
        opts2: [{ label: '1', value: 'a1', checked: true }, 'b1', 'c1', '1'],
        opts3: [{ label: '1', value: 'a1' }, 'b1', 'c1', { label: '1', value: '1', disabled: true }],
        opts4: [
          { label: 'aa', value: 'a1' },
          'b1',
          'c1',
          { label: '1', value: 'd1', disabled: false },
        ],
        opts5: ['aa', 'bb', 'cc'],
      };
    },
    methods: {
      onOpts1Change(e, prevVal) {
        console.log('onOpts1Change1', e, prevVal);
      },
    },
  };
</script>
