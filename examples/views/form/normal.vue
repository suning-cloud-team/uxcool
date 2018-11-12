<template>
  <div>
    <h4>normal</h4>
    <div class="demo">
      <ux-form ref="formRef"
               :messages="{required: 'this is requireda!'}"
               :validator="formValidatorOptions"
               @submit="onSubmit">
        <ux-form-item :label="nameLabel">
          <ux-field-decorator v-if="nameIf"
                              name="name"
                              :validator="fieldOptions"
                              :rules="rules">
            <ux-input :value="form.name"
                      @input="onInput" />
          </ux-field-decorator>
        </ux-form-item>

        <!-- <ux-form-item label="日期">
          <ux-field-decorator name="date"
                              rules="required">
            <ux-date-picker v-model="form.date" />
          </ux-field-decorator>
        </ux-form-item>

        <ux-form-item label="文案">
          <ux-field-decorator name="text"
                              rules="required">
            <ux-textarea v-model="form.text" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="checkbox">
          <ux-field-decorator name="checkbox"
                              rules="required">
            orm.checkbox: {{ form.checkbox }}
            <ux-checkbox label="a"
                         value="1"
                         v-model="form.checkbox" />
          </ux-field-decorator>

          <ux-field-decorator name="checkbox2"
                              rules="required">
            <ux-checkbox label="b"
                         value="1" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Radio">
          <ux-field-decorator name="raido1"
                              rules="required">
            <ux-radio label="label text" />
          </ux-field-decorator>
        </ux-form-item> -->
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     html-type="submit">
            submit
          </ux-button>
        </ux-form-item>
      </ux-form>
    </div>
    form:{{ form }} ,
    <!-- $validate: {{errors}} -->
    <div>
      <ux-button @click="showModal"> show modal</ux-button>
      <ux-modal v-model="visible"
                title="header">
        {{ errors }}
        <ux-form locale="en">
          <ux-form-item label="名称1">
            <ux-input name="name1"
                      v-model="form.name1"
                      v-validate="'required|numeric'" />
            <span>{{ errors.first('a1.name1') }}</span>
          </ux-form-item>

          <ux-form-item label="日期">
            <ux-date-picker v-model="form.date" />
          </ux-form-item>

          <ux-form-item label="文案">
            <ux-textarea v-model="form.text" />
          </ux-form-item>
          <ux-form-item :colon="false">
            <ux-button type="primary"
                       @click="check">
              check
            </ux-button>
          </ux-form-item>
        </ux-form>
      </ux-modal>
    </div>

  </div>
</template>


<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  import { Form, Input, Datepicker, Modal, Button, Checkbox, Radio } from '@suning/uxcool';

  Vue.use(VeeValidate);
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
    },
    data() {
      return {
        visible: false,
        form: {
          name: '123a',
          name1: '',
          date: new Date(),
          date2: new Date(),
          text: '12',
          checkbox: false,
          checkbox1: false,
        },
        formValidatorOptions: {},
        fieldOptions: {
          events:'change'
        },
        rules: [
          'required|numeric',
          {
            min: 3,
            message() {
              console.log(arguments);
              return '3个字符';
            },
          },
          { max: 5, message: '最大5个字符' },
        ],
        nameIf: true,
        nameLabel: '名称',
      };
    },
    created() {},
    mounted() {
      setTimeout(() => {
        // this.nameIf = false;
        this.nameLabel = '名称11';
      }, 4500);
      console.log(this.$refs.input);
    },
    methods: {
      changeLocale() {
        const { $refs: { formRef } } = this;
        // formRef.setGlobalLocale('en');
      },
      showModal() {
        this.visible = !this.visible;
      },
      onInput(value) {
        this.form.name = value;
      },
      onSubmit() {
        const { $refs: { formRef } } = this;
        console.log(formRef.$validator);
        formRef.validate().then((err) => {
          console.log(err);
        });
      },
      check() {
        this.$validator.validate('a1.*').then((err) => {
          console.log(err);
        });
      },
    },
  };
</script>
