<template>
  <ux-demo title="内置验证规则"
           :height="200">
    <div slot="demo">
      <ux-form>
        <ux-form-item label="alpha:en">
          <ux-field-decorator name="Field1"
                              rules="alpha:en">
            <ux-input v-model="input1" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="in:1,2,3,4">
          <ux-field-decorator name="Field2"
                              rules="in:1,2,3,4">
            <ux-input v-model="input2" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="between:10,20">
          <ux-field-decorator name="Field3"
                              rules="between:10,20">
            <ux-input v-model="input3" />
          </ux-field-decorator>
        </ux-form-item>
      </ux-form>
    </div>
    <div slot="desc">
      内置规则的使用示例
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/rules.vue';

  export default {
    data() {
      return {
        code,
        input1: '',
        input2: '',
        input3: '',
      };
    },
  };
</script>
