import { isEqual } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import {
  makeVM,
  resolveModel,
  resolveGetter,
  resolveSetter,
  parseFieldRules,
  isValidateField,
} from './utils';
import SubMixin from './mixins/sub';

export default {
  name: buildComponentName('FieldDecorator'),
  mixins: [SubMixin],
  inject: ['formItemNode'],
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    rules: {
      type: [String, Object, Array],
      default: '',
    },
    valuePath: {
      type: String,
      default: '',
    },
    validator: {
      type: Object,
      default: null,
    },
    hasFeedback: {
      type: Boolean,
      default: false,
    },
    alias: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      field: null,
    };
  },
  computed: {
    prefixCls() {
      const { rootPrefixCls } = this;
      return `${rootPrefixCls}-item`;
    },
    classes() {
      const { name, hasFeedback, formValidator: { flags } } = this;
      const flag = flags[name] || {};
      return {
        'has-feedback': hasFeedback || flag.pending,
        'has-success': !flag.pending && flag.valid,
        'has-error': flag.validated && flag.invalid,
        'is-validating': flag.pending,
      };
    },
    fieldRules() {
      const { rules } = this;
      return rules ? this.normalizeRules(rules) : {};
    },
    ruleNames() {
      return this.fieldRules.rules;
    },
    normalizeAlias() {
      const { alias, formItemNode } = this;
      return alias || formItemNode.label;
    },
  },
  mounted() {
    const { fieldAttach, addToFormItem, customWatch } = this;
    addToFormItem();
    fieldAttach();
    customWatch();
  },
  beforeDestroy() {
    const { formValidator, field } = this;
    this.removeFromFormItem();
    if (isValidateField(field)) {
      formValidator.detach(field);
    }
  },
  methods: {
    customWatch() {
      const { updateField } = this;
      this.$watch(
        () => {
          const {
            globalValidatorOptions,
            validator: validatorOptions,
            ruleNames,
            name,
            valuePath,
            normalizeAlias,
          } = this;
          return {
            globalValidatorOptions,
            validatorOptions,
            ruleNames,
            name,
            valuePath,
            normalizeAlias,
          };
        },
        (nVal, oVal) => {
          // 阻止无效更新
          if (!isEqual(nVal, oVal)) {
            updateField();
          }
        }
      );
    },
    addToFormItem() {
      const { formItemNode } = this;
      formItemNode.addItemField(this);
    },
    removeFromFormItem() {
      const { formItemNode } = this;
      formItemNode.removeItemField(this);
    },
    normalizeRules(rules) {
      const r = parseFieldRules(rules);
      this.setFieldMessage(this.name, r.messages);
      return r;
    },
    buildFieldOptions() {
      const {
        $slots,
        formRoot,
        globalValidatorOptions,
        validator: validatorOptions,
        name,
        ruleNames,
        valuePath,
        normalizeAlias,
      } = this;
      let vnode = null;
      const slotDefault = $slots.default;
      if (slotDefault) {
        [vnode] = slotDefault.filter(v => v.context && v.data);
      }

      let options = null;
      if (vnode) {
        const model = resolveModel(vnode);
        const el = vnode.elm;
        const customValidatorOptions = validatorOptions || {};
        const getter = resolveGetter(el, vnode, model, valuePath);
        const setter = resolveSetter(name, el, vnode, model, valuePath);
        if (ruleNames) {
          let listen = true;
          [globalValidatorOptions, customValidatorOptions].forEach((v) => {
            if ('disable' in v) {
              listen = !v.disable;
            }
          });

          options = {
            ...globalValidatorOptions,
            ...customValidatorOptions,
            listen,
            rules: ruleNames,
            expression: ruleNames,
            alias: normalizeAlias,
          };

          // Validator.isTargetRule 规则, 使用 alias
          if (el && el.setAttribute) {
            el.setAttribute('data-vv-as', normalizeAlias);
          }
        }

        options = {
          ...options,
          name,
          el,
          component: vnode.componentInstance,
          vm: makeVM(formRoot, vnode.context),
          model,
          getter,
          $$setter: setter,
          initialValue: getter(),
        };
      }
      return options;
    },
    fieldAttach() {
      const { formValidator, buildFieldOptions } = this;
      const options = buildFieldOptions();
      if (options) {
        options.vm.$refs[`${options.name}Ref`] = options.component;
      }
      if (isValidateField(options)) {
        const field = formValidator.attach(options);
        field.$$setter = options.$$setter;
        this.field = field;
      } else {
        // 两种情况 1. 文本节点= null, 2. 无验证rule的普通节点
        this.field = options;
      }
    },
    updateField() {
      const { field, buildFieldOptions } = this;
      if (isValidateField(field) && !field.updated) {
        const options = buildFieldOptions();
        field.update(options);
      }
    },
    onEnter(errorMsg) {
      this.formItemNode.setHasError(!!errorMsg);
    },
    onLeave() {
      this.formItemNode.setHasError(false);
    },
    getErrorMsg() {
      const { formValidator: { errors }, name } = this;
      if (errors.has(name)) {
        return errors.first(name);
      }

      return null;
    },
    renderHelp() {
      const {
        rootPrefixCls, getErrorMsg, onEnter, onLeave
      } = this;
      const errorMsg = getErrorMsg();
      const errorElement = errorMsg ? (
        <div class={`${rootPrefixCls}-explain`}>{errorMsg}</div>
      ) : null;
      return (
        <transition
          name="show-help"
          on-enter={() => {
            onEnter(errorMsg);
          }}
          on-after-leave={() => {
            onLeave(errorMsg);
          }}
        >
          {errorElement}
        </transition>
      );
    },
  },
  render() {
    const {
      $slots, prefixCls, classes, renderHelp
    } = this;
    return (
      <span class={classes}>
        <span class={`${prefixCls}-children`}>{$slots.default}</span>
        {renderHelp()}
      </span>
    );
  },
};
