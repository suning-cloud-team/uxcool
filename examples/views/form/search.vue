<template>
  <div>
    <h4>search</h4>
    <div class="demo">
      <ux-form ref="formRef"
               @submit="onSubmit">
        <ux-row :gutter="24">
          <ux-col :span="8"
                  v-for="i in cnt"
                  :key="i"
                  v-show="isShow(i)">
            <ux-form-item :label="`Field ${i}`">
              <ux-field-decorator :name="`field-${i}`"
                                  rules="required"
                                  :value-path="`form['field${i}']`">
                <!-- <ux-input :value="form[`field${i}`]"
                          @input="e=>form[`field${i}`] = e" /> -->
                <!-- <ux-input v-model="form['field'+i]" /> -->
                <ux-range-date-picker />
              </ux-field-decorator>
            </ux-form-item>
          </ux-col>
          <ux-col :span="8">
            <ux-form-item :label="`Fielda11 `">
              <ux-field-decorator :name="`field-a11`"
                                  rules="required">
                <ux-date-picker />
              </ux-field-decorator>
            </ux-form-item>
          </ux-col>
        </ux-row>
        <ux-row style="text-align:right">
          <ux-col :span="24"
                  class="search-form-btn">
            <ux-button type="primary"
                       html-type="submit">Search</ux-button>
            <ux-button style="margin-left:10px;"
                       @click="reset">Clear</ux-button>
            <a @click="toggle">Collapse
              <ux-icon :type="expand ?'up' : 'down'" />
            </a>
          </ux-col>
        </ux-row>
      </ux-form>
    </div>
    <ux-button @click="destroy">destroy</ux-button>
    <div>
      <span>

        <ux-range-date-picker />
      </span>
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
    Datepicker,
  } from '@suning/uxcool';

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
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
    },
    data() {
      return {
        expand: false,
        form: { checkbox: [] },
      };
    },
    computed: {
      cnt() {
        return this.expand ? 10 : 6;
      },
    },
    created() {
      this.form = {
        ...this.form,
        ...Array(10)
          .fill(0)
          .reduce((r, k, i) => {
            const nr = r;
            nr[`field${i + 1}`] = '';
            return nr;
          }, {}),
      };
    },
    methods: {
      isShow(i) {
        return i <= this.cnt;
      },
      toggle() {
        this.expand = !this.expand;
      },
      reset() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.resetFields();
        }
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
      destroy() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.$destroy();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo {
    width: 100%;
  }
  .search-form-btn {
    button + button,
    button + a {
      margin-left: 10px;
    }
  }
</style>
