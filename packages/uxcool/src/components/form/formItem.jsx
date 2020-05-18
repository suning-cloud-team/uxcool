import { buildComponentName } from '../utils';
import { getSlotOrValue } from './utils';
import SubMixin from './mixins/sub';
import Row from '../grid';

const defaultLabelCol = {
  xs: 24,
  sm: 8,
};

const defaultWrapperCol = {
  xs: 24,
  sm: 16,
};
export default {
  name: buildComponentName('FormItem'),
  mixins: [SubMixin],
  provide() {
    return {
      formItemNode: this,
    };
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelCol: {
      type: Object,
      default: null,
    },
    wrapperCol: {
      type: Object,
      default: null,
    },
    required: {
      type: Boolean,
      default: null,
    },
    colon: {
      type: Boolean,
      default: false,
    },
    help: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasError: false,
      fields: [],
    };
  },
  computed: {
    prefixCls() {
      return `${this.rootPrefixCls}-item`;
    },
    classes() {
      const { prefixCls, colon } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-no-colon`]: !colon,
      };
    },
    normalizeLabelCol() {
      const { formLayout, labelCol } = this;
      let col = {};
      if (formLayout === 'horizontal') {
        col = { ...defaultLabelCol };
      }
      return { ...col, ...labelCol };
    },
    normalizeWrapperCol() {
      const { formLayout, wrapperCol } = this;
      let col = {};
      if (formLayout === 'horizontal') {
        col = { ...defaultWrapperCol };
      }
      return { ...col, ...wrapperCol };
    },
    isRequired() {
      const { required, fields } = this;

      if (required !== null) {
        return required;
      }
      return fields.some((v) => v.field && v.field.isRequired);
    },
  },
  methods: {
    getExtraInfo() {
      return getSlotOrValue('extra', this);
    },
    addItemField(field) {
      const { fields, addFormField } = this;
      fields.push(field);
      addFormField(field);
    },
    removeItemField(field) {
      const { fields, removeFormField } = this;
      this.fields = fields.filter((v) => v !== field);
      removeFormField(field);
    },
    setHasError(isError) {
      this.hasError = isError;
    },
    renderLabel() {
      const {
        prefixCls, isVerticalForm, id, normalizeLabelCol, isRequired, colon
      } = this;

      const labelClass = {
        [`${prefixCls}-required`]: isRequired,
      };
      let labelElement = getSlotOrValue('label', this);

      if (
        colon
        && isVerticalForm
        && typeof labelElement === 'string'
        && labelElement.trim() !== ''
      ) {
        labelElement = labelElement.replace(/[：|:]\s*$/, '');
      }

      return labelElement ? (
        <Row.Col
          {...{
            class: [`${prefixCls}-label`, (normalizeLabelCol || {}).className],
            props: normalizeLabelCol,
          }}
        >
          <label
            htmlFor={id}
            class={labelClass}
            title={typeof labelElement === 'string' ? labelElement : ''}
          >
            {labelElement}
          </label>
        </Row.Col>
      ) : null;
    },
    renderHelp() {
      const { rootPrefixCls, hasError } = this;
      const help = getSlotOrValue('help', this);
      return help && !hasError ? (
        <div class={`${rootPrefixCls}-explain`} key="help">
          {help}
        </div>
      ) : null;
    },
    renderExtra() {
      const { rootPrefixCls, getExtraInfo } = this;
      const extra = getExtraInfo();
      return extra ? <div class={`${rootPrefixCls}-extra`}>{extra}</div> : null;
    },
    renderWrapper() {
      const {
        prefixCls, normalizeWrapperCol, $slots, renderHelp, renderExtra
      } = this;
      return (
        <Row.Col
          {...{
            class: [`${prefixCls}-control-wrapper`, (normalizeWrapperCol || {}).className],
            props: normalizeWrapperCol,
          }}
        >
          <div class={`${prefixCls}-control`}>{[$slots.default, renderHelp(), renderExtra()]}</div>
        </Row.Col>
      );
    },
    renderChildren() {
      const { renderLabel, renderWrapper } = this;
      return [renderLabel(), renderWrapper()];
    },
    renderFormItem() {
      const {
        prefixCls, classes, hasError, renderChildren
      } = this;
      const help = getSlotOrValue('help', this);
      const itemCls = [
        classes,
        {
          [`${prefixCls}-with-help`]: hasError || help,
        },
      ];
      return <Row class={itemCls}>{renderChildren()}</Row>;
    },
  },
  render() {
    const { renderFormItem } = this;
    return renderFormItem();
  },
};
