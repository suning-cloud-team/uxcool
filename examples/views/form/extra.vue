<template>
  <div>
    <h4>extra</h4>
    <div class="demo">
      <ux-form ref="formRef"
               @form-flags="onFormFlags">
        <ux-form-item>
          <ux-field-decorator name="name"
                              :alias="nameAlias"
                              rules="required">
            <ux-input placeholder="UserName"
                      v-model="form.userName">
              <ux-icon type="account"
                       slot="prefix"
                       style="color:rgba(0,0,0,.25)" />
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item>
          <ux-field-decorator name="password"
                              extra="This is extra content"
                              :rules="{required:true, regex: /^\d{6,}$/i}">
            <ux-input type="password"
                      placeholder="Password"
                      v-model="form.password">
              <ux-icon type="lock"
                       slot="prefix"
                       style="color:rgba(0,0,0,.25)" />
            </ux-input>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item>
          <ux-button type="primary"
                     :disabled="invalid"
                     html-type="submit">Log in</ux-button>
          <ux-button style="margin-left:10px;"
                     @click="reset">Clear</ux-button>
        </ux-form-item>
      </ux-form>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Button, Icon } from '@cloud-sn/uxcool';

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
        form: {
          userName: '',
          password: '',
        },
        invalid: false,
        nameAlias: 'userName',
      };
    },
    created() {
      setTimeout(() => {
        this.nameAlias = 'AliasUserName';
      }, 3500);
    },
    methods: {
      onFormFlags(flags) {
        this.invalid = flags.invalid;
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
