<template>
  <div ref="wrapRef"
       class="demo">
    <h4>form</h4>
    <ux-button @click="onClick">open</ux-button>
    visible:{{visible}}
    <ux-drawer v-model="visible"
               destroy-on-close
               @close="clearForm">
      form: {{form}}
      <ux-form>
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
      </ux-form>
    </ux-drawer>
  </div>

</template>

<script>
  import { Drawer, Button, Form, Input, Icon } from '@suning/uxcool';

  const defaultForm = {
    email: '',
    password: '',
    confirm: '',
  };
  export default {
    components: {
      UxDrawer: Drawer,
      UxButton: Button,
      UxForm: Form,
      UxFormItem: Form.Item,
      UxFieldDecorator: Form.FieldDecorator,
      UxIcon: Icon,
      UxInput: Input,
    },
    data() {
      return {
        visible: false,
        form: {
          ...defaultForm,
        },
      };
    },
    created() {
      setTimeout(() => {
        // this.container = this.getContainer;
      }, 1500);
    },
    methods: {
      getContainer() {
        return this.$refs.wrapRef;
      },
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
      clearForm() {
        this.form = { ...defaultForm };
      },
    },
  };
</script>
