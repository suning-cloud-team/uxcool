<template>
  <div>
    <h4>Register</h4>
    <div class="demo">
      <ux-form ref="formRef"
               :messages="{required: field => `请输入 ${field} 的值`,}"
               @submit="onSubmit">
        <ux-form-item label="E-mail"
                      help="help content"
                      extra="abc11">
          <ux-field-decorator name="email"
                              rules="required|email">
            <ux-input v-model="form.email">
              <ux-icon slot="prefix"
                       type="mail" />
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Password">
          <span slot="extra"
                style="color:red"> this is extra</span>
          <ux-field-decorator :rules="{required:true, regex: /^\d{6,}$/i}"
                              name="password">
            <ux-input v-model="form.password"
                      name="password"
                      type="password">
              <ux-icon slot="prefix"
                       type="lock" />
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Confirm Password">
          <ux-field-decorator :validator="{alias: 'Confirm Password' }"
                              name="confirm"
                              rules="required|confirmed:@password">
            <ux-input v-model="form.confirm"
                      type="password">
              <ux-icon slot="prefix"
                       type="lock" />
            </ux-input>
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
        <ux-form-item label="Phone Number"
                      extra="abc">
          <ux-field-decorator name="phone"
                              rules="required"
                              alias="input nnnn">
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
        <ux-form-item label="Captcha"
                      extra="abc">
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
        </ux-form-item>
        <ux-form-item label="测试tree">
          <ux-field-decorator name="TreeSelect"
                              rules="required">
            <ux-tree-select v-model="form.treeSelect"
                            :tree-data="treeData"
                            show-search
                            style="width:100%" />
          </ux-field-decorator>

        </ux-form-item>
        <ux-form-item label="Switch">
          <ux-field-decorator :rules="{ required: true, message:'请选择Switch的值'}"
                              name="switch">

            <ux-switch v-model="form.switch" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="Upload"
                      required>
          <ux-field-decorator rules="fileRequired"
                              name="upload">
            <ux-upload v-model="form.fileList"
                       action="/upload">
              <ux-button>Click to Upload</ux-button>
              <span style="margin-left:8px"
                    @click.stop>this is upload tip</span>
            </ux-upload>
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
  import {
    Form,
    Switch,
    Input,
    Grid,
    Button,
    Icon,
    Checkbox,
    Tooltip,
    Select,
    TreeSelect,
    Upload,
  } from '@suning/uxcool';

  Form.extendValidator('fileRequired', {
    validate(value) {
      console.log('fileRequird', value);
      return value.some(v => v.status === 'success');
    },
    getMessage(field) {
      return `${field} 至少上传一个文件`;
    },
  });
  export default {
    components: {
      UxSwitch: Switch,
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
      UxTreeSelect: TreeSelect,
      UxUpload: Upload,
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
          switch: false,
          treeSelect: '',
          fileList: [],
        },
        treeData: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: 'C0-0-0-0', key: '0-0-0-0', disableCheckbox: true },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                disabled: true,
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0', disabled: true },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              { title: '0-0-2', key: '0-0-2' },
            ],
          },
        ],
      };
    },
    methods: {
      onSubmit() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            if (!valid) {
              console.log('Receive values', values);
              return;
            }
            console.log('submit value', {
              ...values,
              upload: values.upload.filter(v => v.status === 'success').map(v => v.response),
            });
          });
        }
      },
    },
  };
</script>
