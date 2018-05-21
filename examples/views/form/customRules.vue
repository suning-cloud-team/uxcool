<template>
  <div>
    <h4>validator</h4>
    <div class="demo">

      <ux-form>
        <ux-form-item label="myRule">
          <ux-field-decorator name="Field1"
                              rules="myRule">
            <ux-input v-model="input1" />
          </ux-field-decorator>
        </ux-form-item>
      </ux-form>
    </div>
  </div>

</template>


<script>
  import { Form, Input, Grid, Button, Icon, Checkbox, Tooltip, Select } from '@suning/uxcool';

  Form.extendValidator('myRule', {
    validate(value) {
      return value === 'Name';
    },
    getMessage(field) {
      return `${field} 必须等于 Name`;
    },
  });

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
      UxCheckboxGroup: Checkbox.Group,
      UxTooltip: Tooltip,
      UxRow: Grid.Row,
      UxCol: Grid.Col,
    },
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
      };
    },
  };
</script>
