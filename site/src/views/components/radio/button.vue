<template>
  <ux-demo title="Radio 按钮"
           :height="200">
    <div slot="demo">
      <ux-radio-group>
        <ux-radio-button label="abc"
                         value="1" />
        <ux-radio-button label="ded"
                         value="2" />
        <ux-radio-button label="aaa"
                         value="3" />
      </ux-radio-group>
      <br>
      <ux-radio-group type="button"
                      :options="opts2" />
      <br>
      <ux-radio-group type="button"
                      :options="opts3" />
      <br>
      <ux-radio-group type="button"
                      disabled
                      :options="opts4" />
      <br>
      <ux-radio-group type="button"
                      name="button"
                      :options="opts2" />
    </div>
    <div slot="desc">
      Radio Button
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/radio/button.vue';

  export default {
    data() {
      return {
        code,
        opts2: [{ label: '1', value: 'a1', checked: true }, 'b1', 'c1', '1'],
        opts3: [{ label: '1', value: 'a1' }, 'b1', 'c1', { label: '1', value: '1', disabled: true }],
        opts4: [
          { label: 'aa', value: 'a1' },
          'b1',
          'c1',
          { label: '1', value: 'd1', disabled: false },
        ],
      };
    },
  };
</script>
