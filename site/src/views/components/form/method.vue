<template>
  <ux-demo title="常用方法"
           :height="200">
    <div slot="demo">
      <ux-form ref="formRef"
               @form-flags="validateFormFlags">
        <ux-form-item label="text">
          <ux-field-decorator name="abc">
            text
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="名称">
          <ux-field-decorator name="name"
                              rules="required|numeric"
                              value-path="form.name">
            <ux-input :value="form.name"
                      @input="(e)=>form.name = e" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="名称2">
          <ux-field-decorator name="name1"
                              rules="required">
            <ux-input v-model="form.name1" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="日期">
          <ux-field-decorator name="date1">
            <ux-date-picker v-model="form.date1" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item label="select">
          <ux-field-decorator name="select">
            <ux-select v-model="form.select">
              <ux-option value="1"
                         label="A" />
              <ux-option value="2"
                         label="B" />
              <ux-option value="3"
                         label="C" />
            </ux-select>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-field-decorator name="protocol"
                              value-path="form.protocol">
            <ux-checkbox label
                         :checked="form.protocol"
                         @input="(val)=>form.protocol = val">
              I have read
              <a href="###">the agreement</a>
            </ux-checkbox>
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     :disabled="isDisabled"
                     @click="submit">submit</ux-button>
        </ux-form-item>
      </ux-form>
      <!-- pristine: {{pristine}} -->
      <ux-button @click="getFieldsValue">getFieldsValue</ux-button>
      <ux-button @click="resetFields">resetFields</ux-button>
      <ux-button @click="getFieldError">getFieldError</ux-button>
      <ux-button @click="getFieldsError">getFieldsError</ux-button>
      <ux-button @click="clearErrors">clearErrors</ux-button>
    </div>
    <div slot="desc">
      Form的常用方法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/method.vue';

  export default {
    data() {
      return {
        code,
        form: {
          name: '123',
          name1: '333',
          protocol: true,
          date1: null,
          select: '',
        },
        formFlags: {},
      };
    },
    computed: {
      isDisabled() {
        const { formFlags } = this;
        return formFlags.invalid;
      },
    },
    methods: {
      validateFormFlags(flags) {
        this.formFlags = flags;
        console.log('flags', flags);
      },
      getForm() {
        return this.$refs.formRef;
      },
      getFieldsValue() {
        const { getForm } = this;
        console.log('getFieldsValue', getForm().getFieldsValue(['date1', 'name1']));
        console.log('getFieldsValue [name1, date1]', getForm().getFieldsValue(['date1', 'name1']));
        console.log('getFieldValue', getForm().getFieldValue('name1'));
        getForm().resetFields();
      },
      resetFields() {
        const { getForm } = this;
        getForm().resetFields();
      },

      getFieldError() {
        const { getForm } = this;
        console.log('field error', getForm().getFieldError('name'));
        console.log('field error name required', getForm().getFieldError('name:required'));
      },
      getFieldsError() {
        const { getForm } = this;
        console.log('field error', getForm().getFieldsError('name'));
        console.log('field error name required', getForm().getFieldsError());
      },
      clearErrors() {
        const { getForm } = this;
        getForm().clearErrors();
      },
      submit() {
        this.getForm()
          .validate()
          .then(() => {});
      },
    },
  };
</script>

