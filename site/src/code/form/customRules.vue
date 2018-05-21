<template>
  <div>
    <ux-form>
      <ux-form-item label="myRule">
        <ux-field-decorator name="Field1"
                            rules="myRule">
          <ux-input v-model="input1" />
        </ux-field-decorator>
      </ux-form-item>
    </ux-form>
  </div>
</template>

<script>
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
        input1: '',
      };
    },
  };
</script>
