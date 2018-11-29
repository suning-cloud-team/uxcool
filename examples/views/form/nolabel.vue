<template>
  <div>
    <h4>no label</h4>
    <div class="demo"
         style="padding:20px">
      <ux-form ref="formRef"
               :messages="{required: field => `请输入 ${field} 的值`,}"
               layout="inline"
               @submit="onSubmit">
        <table-search-form gutter="0">
          <ux-form-item>
            <ux-field-decorator name="email"
                                rules="required|email">
              <ux-input v-model="form.email">
                <ux-icon slot="prefix"
                         type="mail" />
              </ux-input>
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
            <ux-field-decorator name="sss">
              <ux-select>
                <span slot="renderLabel"
                      slot-scope="{label,value}">
                  <ux-icon type="circle_selected" /> {{ label||value }}
                </span>
                <ux-option-group id="1"
                                 label="abc">
                  <ux-option value="A">A1</ux-option>
                  <ux-option value="B"
                             label="B2" />
                </ux-option-group>

                <ux-option id="2"
                           c="1"
                           value="C"
                           label="C3">a12</ux-option>
              </ux-select>
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
            <ux-field-decorator name="TreeSelect"
                                rules="required">
              <ux-tree-select v-model="form.treeSelect"
                              :tree-data="treeData"
                              show-search
                              style="width:100%" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
            <ux-field-decorator name="datepicker"
                                rules="required">
              <ux-date-picker style="width:100%" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
            <ux-field-decorator name="rangeDate"
                                rules="required">
              <ux-range-date-picker style="width:100%" />
            </ux-field-decorator>
          </ux-form-item>

          <ux-form-item>
            <ux-field-decorator name="nickName"
                                rules="required">
              <ux-input v-model="form.nickname" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
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
          <ux-form-item>
            <ux-auto-complete />
          </ux-form-item>
          <ux-form-item>
            <ux-timepicker />
          </ux-form-item>
          <ux-form-item>
            <ux-input />
          </ux-form-item>

          <ux-form-item>
            <ux-field-decorator name="inputnumber">

              <ux-input-number />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item required>
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
        </table-search-form>
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
    Datepicker,
    InputNumber,
    AutoComplete,
    Timepicker,
  } from '@suning/uxcool';
  import TableSearchForm from '@suning/uxcool-table-search-form';

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
      TableSearchForm,
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      UxInputNumber: InputNumber,
      UxAutoComplete: AutoComplete,
      UxTimepicker: Timepicker,
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
        const {
          $refs: { formRef },
        } = this;
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
