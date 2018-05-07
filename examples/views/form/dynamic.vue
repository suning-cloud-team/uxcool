<template>
  <div>
    <h4>dynamic</h4>
    <div class="demo">
      <ux-form ref="formRef"
               @submit="onSubmit">
        <ux-form-item v-for="(item,i) in items"
                      :key="i"
                      :label="`Field${i}`">
          <ux-field-decorator :name="`field${i}`"
                              rules="required">
            <ux-input v-model="item.value" />
          </ux-field-decorator>
        </ux-form-item>

        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button @click="addItem"
                     type="dashed"
                     style="width: 100%">
            <ux-icon type="add" />Add Field
          </ux-button>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     html-type="submit">
            Submit
          </ux-button>
          <ux-button @click="reset"
                     style="margin-left:10px">
            Reset
          </ux-button>
        </ux-form-item>
      </ux-form>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Button, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxForm: Form,
      UxFormItem: Form.Item,
      UxFieldDecorator: Form.FieldDecorator,
      UxInput: Input,
      UxButton: Button,
      UxIcon: Icon,
    },
    data() {
      return {
        items: [],
      };
    },
    methods: {
      addItem() {
        this.items.push({
          value: '2',
        });
      },
      removeItem(item) {
        this.items = this.items.filter(v => v !== item);
      },
      onSubmit() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            console.log('Receive values', values);
            if (!valid) {
              console.log('valid error');
            }
          });
        }
      },
      reset() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.resetFields();
        }
      },
    },
  };
</script>
