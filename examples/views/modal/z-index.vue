<template>
  <div class="demo">
    <h6>z-index</h6>
    <button class="ux-btn"
            @click="open">z-index open</button>
    <ux-modal v-model="basicVisible"
              title="Basic">
      <div ref="zIndexContainer"
           style="position:relative">

        <ux-form>
          <ux-form-item label="E-mail">
            <ux-field-decorator name="email"
                                rules="required|email">
              <ux-input>
                <ux-icon slot="prefix"
                         type="mail" />
              </ux-input>
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Cascader">
            <ux-field-decorator name="cascader">
              <ux-cascader :data-source="data"
                           :get-popup-container="getContainer"
                           popup-placement="bottomRight" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="date">
            <ux-field-decorator name="date"
                                rules="required">
              <ux-date-picker :get-popup-container="getContainer" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Range">
            <ux-field-decorator name="range"
                                rules="required">
              <ux-range-date-picker :get-popup-container="getContainer" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Time">
            <ux-field-decorator name="time"
                                rules="required">
              <ux-timepicker :get-popup-container="getContainer" />
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Dropdown">
            <ux-field-decorator name="dropdown"
                                rules="required">
              <ux-dropdown :get-popup-container="getContainer">
                <a slot="trigger">hover me
                  <ux-icon type="down" />
                </a>
                <ux-menu slot="overlay"
                         multiple>
                  <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
                  <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
                  <ux-menu-item name="sub-menu-item-4">
                    测试3
                  </ux-menu-item>
                  <ux-menu-item name="sub-menu-item-4">
                    测试4
                  </ux-menu-item>
                </ux-menu>
              </ux-dropdown>
            </ux-field-decorator>
          </ux-form-item>
          <ux-form-item label="Select">
            <ux-field-decorator name="select"
                                rules="required">
              <ux-select :get-container="getContainer" />
            </ux-field-decorator>
          </ux-form-item>
        </ux-form>
      </div>
    </ux-modal>
    <ux-form>
      <ux-form-item label="E-mail">
        <ux-field-decorator name="email"
                            rules="required|email">
          <ux-input>
            <ux-icon slot="prefix"
                     type="mail" />
          </ux-input>
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="Cascader">
        <ux-field-decorator name="cascader">
          <ux-cascader :data-source="data"
                       popup-placement="bottomRight" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="date">
        <ux-field-decorator name="date"
                            rules="required">
          <ux-date-picker />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="Range">
        <ux-field-decorator name="range"
                            rules="required">
          <ux-range-date-picker />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="Time">
        <ux-field-decorator name="time"
                            rules="required">
          <ux-timepicker />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="Dropdown">
        <ux-field-decorator name="dropdown"
                            rules="required">
          <ux-dropdown>
            <a slot="trigger">hover me
              <ux-icon type="down" />
            </a>
            <ux-menu slot="overlay"
                     multiple>
              <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
              <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
              <ux-menu-item name="sub-menu-item-4">
                测试3
              </ux-menu-item>
              <ux-menu-item name="sub-menu-item-4">
                测试4
              </ux-menu-item>
            </ux-menu>
          </ux-dropdown>
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="Select">
        <ux-field-decorator name="select"
                            rules="required">
          <ux-select />
        </ux-field-decorator>
      </ux-form-item>
    </ux-form>
  </div>
</template>

<script>
  import {
    Button,
    Modal,
    Form,
    Cascader,
    Input,
    Select,
    Datepicker,
    Timepicker,
    Dropdown,
    Menu,
    Icon,
  } from '@suning/uxcool';

  export default {
    components: {
      UxButton: Button,
      UxModal: Modal,
      UxForm: Form,
      UxFormItem: Form.Item,
      UxFieldDecorator: Form.FieldDecorator,
      UxCascader: Cascader,
      UxInput: Input,
      UxSelect: Select,
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      UxTimepicker: Timepicker,
      UxIcon: Icon,
      UxDropdown: Dropdown,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
    },
    data() {
      return {
        basicVisible: false,
        data: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                disabled: true,
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'shanghai',
            label: '上海',
            children: [
              {
                value: 'shanghai',
                label: '上海',
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    methods: {
      open() {
        this.basicVisible = !this.basicVisible;
      },
      getContainer() {
        return this.$refs.zIndexContainer;
      },
    },
  };
</script>
