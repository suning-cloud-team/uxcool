import { Validator } from 'vee-validate';
import { isFunction } from '@cloud-sn/v-utils';

export default class FormValidator extends Validator {
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
