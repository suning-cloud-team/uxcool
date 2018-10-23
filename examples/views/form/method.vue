<template>
  <div class="demo">
    <h4>form method</h4>
    <ux-form ref="formRef"
             @form-flags="validateFormFlags">
      <ux-form-item label="text"
                    class="ux-form-item-plain-text">
        text
      </ux-form-item>
      <ux-form-item label="名称">
        <ux-field-decorator name="name"
                            :validator="{initial:false}"
                            rules="required|numeric"
                            value-path="form.name">
          <ux-input :value="form.name"
                    @input="(e)=>form.name = e" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="名称2">
        <ux-field-decorator name="name1"
                            rules="required">
          <ux-input v-model="form.name1" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="日期">
        <ux-field-decorator name="date1">
          <ux-date-picker v-model="form.date1" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="日期范围">
        <ux-field-decorator name="date2">
          <ux-range-date-picker v-model="form.date2"
                                :placeholder="['start time', 'end time']"
                                show-time />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="select">
        <ux-field-decorator name="select">
          <ux-select v-model="form.select">
            <ux-option value="1"
                       label="A" />
            <ux-option value="2"
                       label="B" />
            <ux-option value="3"
                       label="C" />
          </ux-select>
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item :colon="false">
        <ux-field-decorator name="protocol"
                            value-path="form.protocol"
                            rules="required">
          <ux-checkbox :checked="form.protocol"
                       label
                       @input="(val)=>form.protocol = val">
            I have read
            <a href="###">the agreement</a>
          </ux-checkbox>
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item :colon="false">
        <ux-button type="primary"
                   :disabled="isDisabled"
                   @click="submit">submit</ux-button>
      </ux-form-item>
    </ux-form>
    <!-- pristine: {{pristine}} -->
    <ux-button @click="getFieldsValue">getFieldsValue</ux-button>
    <ux-button @click="resetFields">resetFields</ux-button>
    <ux-button @click="getFieldError">getFieldError</ux-button>
    <ux-button @click="getFieldsError">getFieldsError</ux-button>
    <ux-button @click="clearErrors">clearErrors</ux-button>
  </div>
</template>


<script>
  import { Form, Input, Datepicker, Modal, Button, Checkbox, Radio, Select } from '@suning/uxcool';

  export default {
    components: {
      UxForm: Form,
      UxFormItem: Form.Item,
      UxFieldDecorator: Form.FieldDecorator,
      UxInput: Input,
      UxTextarea: Input.Textarea,
      UxDatePicker: Datepicker,
      UxModal: Modal,
      UxButton: Button,
      UxCheckbox: Checkbox,
      UxRadio: Radio,
      UxSelect: Select,
      UxOption: Select.Option,
      UxRangeDatePicker: Datepicker.Range,
    },
    data() {
      return {
        form: {
          name: '123',
          name1: '333',
          protocol: true,
          date1: null,
          date2: null,
          select: '',
        },
        formFlags: {},
      };
    },
    computed: {
      isDisabled() {
        const { formFlags } = this;
        return formFlags.invalid;
      },
    },
    methods: {
      validateFormFlags(flags) {
        this.formFlags = flags;
        console.log('flags', flags);
      },
      getForm() {
        return this.$refs.formRef;
      },
      getFieldsValue() {
        const { getForm } = this;
        console.log('getFieldsValue', getForm().getFieldsValue(['date1', 'name1']));
        console.log('getFieldsValue [name1, date1]', getForm().getFieldsValue(['date1', 'name1']));
        console.log('getFieldValue', getForm().getFieldValue('name1'));
        getForm().resetFields();
      },
      resetFields() {
        const { getForm } = this;
        getForm().resetFields();
      },

      getFieldError() {
        const { getForm } = this;
        console.log('field error', getForm().getFieldError('name'));
        console.log('field error name required', getForm().getFieldError('name:required'));
      },
      getFieldsError() {
        const { getForm } = this;
        console.log('field error', getForm().getFieldsError('name'));
        console.log('field error name required', getForm().getFieldsError());
      },
      clearErrors() {
        const { getForm } = this;
        getForm().clearErrors();
      },
      submit() {
        this.getForm()
          .validate()
          .then(() => {});
      },
    },
  };
</script>
