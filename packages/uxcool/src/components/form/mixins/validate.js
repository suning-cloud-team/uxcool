import Vue from 'vue';
import { Validator } from 'vee-validate';
import cn from 'vee-validate/dist/locale/zh_CN';
import { isFunction } from '@suning/v-utils';

class FormValidator extends Validator {
  constructor(...args) {
    super(...args);
    this.validateMessages = {
      $$_form: {},
    };
  }

  get locale() {
    return this.formLocale || this.dictionary.locale;
  }
  set locale(value) {
    this.formLocale = value;
  }
  getMessage(fieldName, ruleName, data) {
    const { validateMessages } = this;
    let message = null;
    const fieldMsgs = validateMessages[fieldName] || {};
    const formMsgs = validateMessages.$$_form || {};
    if (fieldMsgs && ruleName in fieldMsgs) {
      message = fieldMsgs[ruleName];
    } else if (ruleName in formMsgs) {
      message = formMsgs[ruleName];
    }

    return isFunction(message) ? message(...data) : message;
  }
  _formatErrorMessage(field, rule, data = {}, targetName = null) {
    let formatName = targetName;
    /* eslint-disable no-underscore-dangle */
    const name = this._getFieldDisplayName(field);

    if (!formatName && Validator.isTargetRule(rule.name)) {
      let selector = rule.params[0];
      if (selector) {
        selector = selector.replace(/^\$/, '').replace(/Ref$/, '');
        formatName = this.dictionary.getAttribute(this.locale, selector, selector);
      }
    }
    const params = this._getLocalizedParams(rule, formatName);
    const errorMessage = this.getMessage(field.name, rule.name, [name, params, data]);
    return errorMessage || super._formatErrorMessage(field, rule, data, formatName);
    /* eslint-enable no-underscore-dangle */
  }
}

const { defineReactive } = Vue.util;
export default {
  $_veeValidate: {
    // 防止全局$validator注入
    inject: false,
  },
  provide() {
    const $validator = new FormValidator(null, { vm: this, fastExit: true });
    this.$validator = $validator;
    defineReactive($validator, 'errors', $validator.errors);
    defineReactive($validator, 'flags', $validator.flags);
    return {
      formRoot: this,
      formValidator: $validator,
    };
  },
  props: {
    locale: {
      type: String,
      default: 'zh_CN',
    },
    validator: {
      type: Object,
      default: null,
    },
    messages: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      globalValidator: {},
      $validator: null,
    };
  },
  watch: {
    locale(nVal) {
      this.setFormLocale(nVal);
    },
    messages(nVal) {
      this.setFormMessages(nVal);
    },
  },
  created() {
    const {
      locale, localize, setFormLocale, messages, setFormMessages
    } = this;
    localize(cn.name, cn);
    setFormLocale(locale);
    setFormMessages(messages);
  },
  beforeDestroy() {
    const { $validator } = this;
    if ($validator) {
      $validator.pause();
      // eslint-disable-next-line
      if ($validator._vm) {
        $validator.destroy();
      }
    }
  },
  methods: {
    setFormMessages(messages) {
      this.$validator.validateMessages.$$_form = messages;
    },
    setFieldMessage(fieldName, messages) {
      const { validateMessages } = this.$validator;
      validateMessages[fieldName] = messages;
    },
    setFormLocale(locale) {
      this.$validator.locale = locale;
    },
    localize(lang, dictionary) {
      const defaultLocale = Validator.locale;
      this.$validator.localize(lang, dictionary);
      // 保持全局locale
      Validator.locale = defaultLocale;
    },
    validate(fieldName) {
      const { $validator, getFieldsValue } = this;
      const validate = $validator.validate.bind($validator);
      const result = fieldName ? validate(fieldName) : validate();
      return result.then(valid => ({ valid, values: getFieldsValue() }));
    },
  },
};
