<template>
  <div>
    <h4>search form</h4>
    <div class="demo">
      <ux-form ref="formRef"
               @submit="onSubmit">
        <table-search-form>
          <ux-form-item label="Field">
            <ux-field-decorator name="Fieldselect">
              <ux-select />
              <!-- <ux-range-date-picker /> -->
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item v-for="i in cnt"
                        :key="i"
                        :label="`Field ${i}`">
            <ux-field-decorator :name="`field-${i}`"
                                rules="required"
                                :value-path="`form['field${i}']`">
              <ux-input :value="form[`field${i}`]"
                        @input="e=>form[`field${i}`] = e" />
              <!-- <ux-range-date-picker /> -->
            </ux-field-decorator>
          </ux-form-item>

          <template slot="op">
            <ux-button type="primary"
                       html-type="submit">Search</ux-button>
            <ux-button style="margin-left:10px;"
                       @click="reset">Clear</ux-button>
            <a @click="toggle">Collapse
              <ux-icon :type="expand ?'up' : 'down'" />
            </a>
          </template>
        </table-search-form>
      </ux-form>
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
    Datepicker,
    Tooltip,
    Select,
  } from '@suning/uxcool';

  function getDeviceWidth() {
    if (typeof window.innerWidth === 'number') {
      // Non-IE
      return window.innerWidth;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth || document.documentElement.clientHeight)
    ) {
      // IE 6+ in 'standards compliant mode'
      return document.documentElement.clientWidth;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
      // IE 4 compatible
      return document.body.clientWidth;
    }
    return 0;
  }

  const TableSearchForm = {
    data() {
      return {
        deviceWidth: getDeviceWidth(),
      };
    },
    created() {
      window.addEventListener('resize', () => {
        this.deviceWidth = getDeviceWidth();
      });
    },
    render() {
      const { $slots: { default: slotDefault, op: slotOp }, deviceWidth } = this;
      const l = slotDefault.length;
      if (l === 0) {
        return null;
      }
      let n = 3;
      if (deviceWidth >= 1600) {
        n = 4;
      }

      const list = slotDefault.map(item => (
        <Grid.Col md={8} xl={8} xxl={6}>
          {item}
        </Grid.Col>
      ));
      let op = null;
      const r = l % n;
      if (r === 0) {
        op = (
          <Grid.Row style="text-align:right">
            <Grid.Col span={24}>{slotOp}</Grid.Col>
          </Grid.Row>
        );
      } else {
        let opGrid = {
          md: 16,
          xl: 16,
          xxl: 18,
        };
        let style = {};
        if (l >= n) {
          style = {
            textAlign: 'right',
          };
        }

        if (r === 2) {
          opGrid = {
            md: 8,
            xl: 8,
            xxl: 12,
          };
        }
        list.push(<Grid.Col {...{ style, props: opGrid }}>{slotOp}</Grid.Col>);
      }
      return <div>{[<Grid.Row gutter={24}>{list}</Grid.Row>, op]}</div>;
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
      UxCheckboxGroup: Checkbox.Group,
      UxTooltip: Tooltip,
      UxRow: Grid.Row,
      UxCol: Grid.Col,
      UxRangeDatePicker: Datepicker.Range,
      TableSearchForm,
    },
    data() {
      return {
        expand: false,
        form: { checkbox: [] },
      };
    },
    computed: {
      cnt() {
        return this.expand ? 9 : 2;
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
      window.addEventListener('resize', () => {
        console.log('deviceWidth', getDeviceWidth());
      });
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
