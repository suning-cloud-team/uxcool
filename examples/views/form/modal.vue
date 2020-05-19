<template>
  <div>
    <h4>modal</h4>
    <div class="demo">
      <ux-button @click="()=>showModal(modalVal)">showModal</ux-button>
      <ux-button @click="()=>showModal(modalVal1)">showModal1</ux-button>
      <ux-button @click="()=>showModal(modalVal2)">showModal2</ux-button>
      <ux-modal v-model="visible"
                control
                title="New Collection"
                @ok="onOk"
                @cancel="onCancel">
        <ux-form ref="formRef"
                 layout="vertical">
          <ux-form-item label="Title">
            <ux-field-decorator :validator="{initial:false}"
                                name="title"
                                rules="required|regex:^\d{3}$">
              <ux-input v-model="form.title" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Description">
            <ux-field-decorator name="desc"
                                rules="required">
              <ux-input v-model="form.desc" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item>
            <ux-field-decorator name="role"
                                rules="required">
              <ux-radio-group v-model="form.role">
                <ux-radio value="public"
                          label="public" />
                <ux-radio value="private"
                          label="private" />
              </ux-radio-group>
            </ux-field-decorator>
          </ux-form-item>
        </ux-form>
      </ux-modal>
    </div>
  </div>

</template>

<script>
  import {
    Form,
    Input,
    Grid,
    Button,
    Icon,
    Checkbox,
    Tooltip,
    Select,
    Modal,
    Radio,
  } from '@cloud-sn/uxcool';

  const defaultForm = {
    title: 'a',
    desc: '',
    role: 'public',
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
      UxModal: Modal,
      UxRadioGroup: Radio.Group,
      UxRadio: Radio,
    },
    data() {
      return {
        visible: false,
        form: {
          ...defaultForm,
        },
        modalVal: {
          title: '',
          desc: '',
          // title: 'modalVal',
          // desc: 'test in modalVal',
        },
        modalVal1: {
          desc: 'test in modalVal',
          role: 'private',
        },
        modalVal2: {},
      };
    },
    methods: {
      setVisible(flag) {
        this.visible = flag;
      },
      clearErrors() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.clearErrors();
        }
      },
      showModal(val) {
        const { visible } = this;
        this.form = { ...defaultForm, ...val };
        this.visible = !visible;
      },
      onOk() {
        const { $refs: { formRef }, setVisible } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            console.log('Receive values', values);
            if (!valid) {
              return;
            }
            setVisible(false);
          });
        }
      },
      onCancel() {
        this.setVisible(false);
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.resetFields();
        }
      },
    },
  };
</script>
