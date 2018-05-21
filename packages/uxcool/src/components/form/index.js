import { Validator } from 'vee-validate';
import Form from './form';
import FormItem from './formItem';
import FieldDecorator from './fieldDecorator';

Form.Item = FormItem;

Form.FieldDecorator = FieldDecorator;

Form.extendValidator = (name, validator, options = {}) => {
  const locale = options.locale || 'zh_CN';
  const defaultLocale = Validator.locale;
  Validator.locale = locale;
  Validator.extend(name, validator, options);
  // 保持全局locale
  Validator.locale = defaultLocale;
};

export { Form as UxForm, FormItem as UxFormItem, FieldDecorator as UxFieldDecorator };

export default Form;
