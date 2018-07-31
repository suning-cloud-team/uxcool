<template>
  <div>
    <h4>Register</h4>
    <div class="demo">
      <ux-form ref="formRef"
               :messages="{required: field => `请输入 ${field} 的值`,}"
               @submit="onSubmit">
        <!-- <ux-form-item label="E-mail">
          <ux-field-decorator name="email"
                              rules="required|email">
            <ux-input v-model="form.email">
              <ux-icon type="mail"
                       slot="prefix" />
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Password">
          <ux-field-decorator name="password"
                              :rules="{required:true, regex: /^\d{6,}$/i}"
                              :validator="{alias: 'Password' }">
            <ux-input type="password"
                      v-model="form.password" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Confirm Password">
          <ux-field-decorator name="confirm"
                              rules="required|confirmed:password"
                              :validator="{alias: 'Confirm Password' }">
            <ux-input type="password"
                      v-model="form.confirm" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Nickname">
          <span slot="label">
            <span>Nickname&nbsp;</span>
            <ux-tooltip content="What do you want others to call you?">
              <ux-icon type="question_circle_o" />
            </ux-tooltip>
          </span>
          <ux-field-decorator name="nickName"
                              rules="required">
            <ux-input v-model="form.nickname" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Phone Number">
          <ux-field-decorator name="phone"
                              rules="required">
            <ux-input v-model="form.phone">
              <ux-field-decorator slot="addonBefore"
                                  name="phoneSelect">
                <ux-select v-model="form.phoneSelect"
                           style="width:80px">
                  <ux-option value="86"
                             label="+86" />
                  <ux-option value="87"
                             label="+87" />
                </ux-select>
              </ux-field-decorator>
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Captcha">
          <ux-row :gutter="8">
            <ux-col :span="12">
              <ux-field-decorator name="captcha"
                                  rules="required">
                <ux-input v-model="form.captcha" />
              </ux-field-decorator>
            </ux-col>
            <ux-col :span="8">
              <ux-button>Get Captcha</ux-button>
            </ux-col>
          </ux-row>
        </ux-form-item> -->
        <!-- <ux-form-item label="File">
          <ux-field-decorator :validator="{events: 'change'}"
                              name="file"
                              value-path="form.file"
                              rules="required|size:0.001">
            <file-cmp />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     html-type="submit">Register</ux-button>
        </ux-form-item>
      </ux-form> -->
        <ux-form-item label="File">
          <ux-field-decorator name="file"
                              rules="required|ext:txt">
            <file-cmp input="changeFile" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     html-type="submit">Register</ux-button>
        </ux-form-item>
      </ux-form>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Grid, Button, Icon, Checkbox, Tooltip, Select } from '@suning/uxcool';

  const FileCmp = {
    $_veeValidate: {
      value() {
        return this.value;
      },
    },
    data() {
      return {
        value: '',
      };
    },
    methods: {
      onChange({ target: { files } }) {
        this.value = [...files];
        this.$emit('input', this.value);
      },
    },
    render() {
      const { onChange } = this;
      return <input type="file" on-change={onChange} />;
    },
  };

  export default {
    components: {
      UxForm: Form,
      UxFormItem: Form.Item,
      UxFieldDecorator: Form.FieldDecorator,
      UxInput: Input,
      UxInputGroup: Input.Group,
      UxSelect: Select,
      UxOption: Select.Option,
      UxButton: Button,
      UxIcon: Icon,
      UxCheckbox: Checkbox,
      UxTooltip: Tooltip,
      UxRow: Grid.Row,
      UxCol: Grid.Col,
      FileCmp,
    },
    data() {
      return {
        form: {
          email: '',
          userName: '',
          password: '',
          confirm: '',
          remember: false,
          nickname: '',
          phone: '',
          phoneSelect: '87',
          captcha: '',
          file: [],
        },
      };
    },
    methods: {
      changeFile(files) {
        this.form.file = files;
      },
      onSubmit() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            if (!valid) {
              console.log('Receive values', values);
            }
          });
        }
      },
    },
  };
</script>
