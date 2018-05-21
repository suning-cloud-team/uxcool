<template>
  <ux-demo title="自定义校验规则"
           :height="200">
    <div slot="demo">
      <ux-form>
        <ux-form-item label="myRule">
          <ux-field-decorator name="Field1"
                              rules="myRule">
            <ux-input v-model="input1" />
          </ux-field-decorator>
        </ux-form-item>
      </ux-form>
    </div>
    <div slot="desc">
      使用`Form.extendValidator`方法自定义校验规则
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/customRules.vue';
  import { UxForm } from '@suning/uxcool';

  UxForm.extendValidator('myRule', {
    validate(value) {
      return value === 'Name';
    },
    getMessage(field) {
      return `${field} 必须等于 Name`;
    },
  });
  export default {
    data() {
      return {
        code,
        input1: '',
      };
    },
  };
</script>
