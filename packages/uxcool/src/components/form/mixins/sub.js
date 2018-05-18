export default {
  $_veeValidate: {
    inject: false,
  },
  inject: ['formRoot', 'formValidator'],
  computed: {
    isChildren() {
      return !!this.formRoot;
    },
    rootPrefixCls() {
      return this.formRoot.prefixCls || '';
    },
    formLayout() {
      return this.formRoot.layout;
    },
    isVerticalForm() {
      return this.formRoot.layout === 'vertical';
    },
    globalValidatorOptions() {
      return this.formRoot.validator || {};
    },
  },
  methods: {
    addFormField(field) {
      this.formRoot.addFormField(field);
    },
    removeFormField(field) {
      this.formRoot.removeFormField(field);
    },
    setFieldMessage(fieldName, messages) {
      this.formRoot.setFieldMessage(fieldName, messages);
    },
  },
};
