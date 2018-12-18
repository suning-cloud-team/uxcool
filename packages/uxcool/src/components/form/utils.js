import omit from 'object.omit';
import {
  warning,
  toArray,
  isFunction,
  isPlainObject,
  isString,
  setValueByPath,
  getValueByPath,
  isDef,
} from '@suning/v-utils';

import { Validator } from 'vee-validate';

const { hasOwnProperty } = Object.prototype;

export function isValidateField(field) {
  return field && isDef(field.rules);
}

export function getSlotOrValue(name, target) {
  const { $slots } = target;
  if ($slots[name]) {
    return $slots[name];
  }

  return target[name] || null;
}

export function hasPath(path, target) {
  let obj = target;
  return path.split('.').every((prop) => {
    if (!hasOwnProperty.call(obj, prop)) {
      return false;
    }
    obj = obj[prop];

    return true;
  });
}

// export const getPath = (path, target, def) => {
//   if (!path || !target) return def;

//   let value = target;
//   const paths = path.split('.');

//   for (let i = 0, l = paths.length; i < l; i += 1) {
//     const prop = paths[i];
//     if (!hasOwnProperty.call(value, prop) && value[prop] === undefined) {
//       value = def;
//       break;
//     }

//     value = value[prop];
//   }
//   return value;
// };

export function getPath(path, target, def) {
  return getValueByPath(target, path, def);
}
export function find(arrayLike, predicate) {
  const array = Array.isArray(arrayLike) ? arrayLike : toArray(arrayLike);
  for (let i = 0; i < array.length; i += 1) {
    if (predicate(array[i])) {
      return array[i];
    }
  }

  return undefined;
}

export function getModel(vnode) {
  return vnode.data
    ? vnode.data.model || find(vnode.data.directives, d => d.name === 'model')
    : null;
}

export function getVnodeOptions(vnode) {
  const component = vnode.componentInstance;
  const opts = {};
  return component
    ? {
      model: component.$options.model || {},
      listeners: component.$listeners || {},
    }
    : opts;
}

export function resolveModel(vnode) {
  const model = getModel(vnode);
  if (!model) {
    return null;
  }

  // https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L26
  const watchable = !/[^\w.$]/.test(model.expression) && hasPath(model.expression, vnode.context);
  const lazy = !!(model.modifiers && model.modifiers.lazy);
  if (!watchable) {
    return {
      expression: null,
      lazy,
    };
  }

  return {
    expression: model.expression,
    lazy,
  };
}

export function resolveInitialValue(vnode) {
  const model = getModel(vnode);

  return model && model.value;
}

export function makeVM(vm, context) {
  return {
    get $el() {
      return vm.$el;
    },
    get $refs() {
      // 同理
      return context.$refs;
    },
    get context() {
      return context;
    },
    // $watch会观察model的expression,所以要用vnode.context
    $watch: context.$watch ? context.$watch.bind(context) : () => {},
    $validator: vm.$validator
      ? {
        errors: vm.$validator.errors,
        validate: vm.$validator.validate.bind(vm.$validator),
        update: vm.$validator.update.bind(vm.$validator),
      }
      : null,
  };
}

export function getCtorConfig(vnode) {
  if (!vnode.componentInstance) return null;

  const config = getPath('componentInstance.$options.$_veeValidate', vnode);

  return config;
}

export function resolveSetter(name, el, vnode) {
  const model = getModel(vnode);
  if (model && model.expression) {
    if (model.callback) {
      return model.callback;
    }

    if (model.expression && hasPath(vnode.context, model.expression)) {
      return val => setValueByPath(vnode.context, model.expression, val);
    }
  }

  const options = getVnodeOptions(vnode);
  const eventName = options.model.event || 'input';
  const listener = options.listeners[eventName];
  if (listener) {
    return val => vnode.componentInstance.$emit(eventName, val);
  }

  return () => {
    warning(
      false,
      `Please provide the \`v-model\` property or bind \`${eventName}\` events for the elements within the \`${name}\` FieldDecorator.`
    );
  };
}
export function resolveGetter(el, vnode, model, valuePath) {
  if (model && model.expression) {
    return () => getPath(model.expression, vnode.context);
  }

  if (valuePath) {
    return () => getPath(valuePath, vnode.context);
  }

  if (vnode.componentInstance) {
    const config = getCtorConfig(vnode);
    if (config && isFunction(config.value)) {
      const boundGetter = config.value.bind(vnode.componentInstance);

      return () => boundGetter();
    }

    return () => vnode.componentInstance.value;
  }

  switch (el.type) {
    case 'checkbox':
      return () => {
        let els = document.querySelectorAll(`input[name="${el.name}"]`);

        els = toArray(els).filter(v => v.checked);
        if (!els.length) return undefined;

        return els.map(checkbox => checkbox.value);
      };
    case 'radio':
      return () => {
        const els = document.querySelectorAll(`input[name="${el.name}"]`);
        const elm = find(els, v => v.checked);

        return elm && elm.value;
      };
    case 'file':
      return () => toArray(el.files);
    case 'select-multiple':
      return () =>
        toArray(el.options)
          .filter(opt => opt.selected)
          .map(opt => opt.value);
    default:
      return () => el && el.value;
  }
}

function parseRule(rule) {
  let params = [];
  const name = rule.split(':')[0];

  if (rule.indexOf(':') > -1) {
    params = rule
      .split(':')
      .slice(1)
      .join(':')
      .split(',');
    // 处理confirmed, after, before等规则
    if (Validator.isTargetRule(name)) {
      const selector = params[0];
      if (selector) {
        // @开头的selector 标示用户使用元素自定义属性
        // 由于元素存在嵌套的情况veeValidate的updateDependencies不能取到实际元素,导致无法获取实际值,所以让用户指定实际值
        if (selector.indexOf('@') !== 0) {
          params[0] = `$${selector.replace(/^\$/, '')}Ref`;
        } else {
          params[0] = selector.slice(1);
        }
      }
    }
  }
  return { name, params };
}
export function parseStringRules(rules) {
  return rules.split('|').reduce((p, rule) => {
    const np = p;
    const parsedRule = parseRule(rule);
    if (!parsedRule.name) {
      return np;
    }

    np[parsedRule.name] = parsedRule.params;
    return np;
  }, {});
}
export function parseFieldRules(rules) {
  let r = {
    rules: {},
    messages: {},
  };

  if (Array.isArray(rules)) {
    r = rules.reduce((p, v) => {
      const np = p;
      const rule = parseFieldRules(v);

      np.rules = { ...np.rules, ...rule.rules };
      np.messages = { ...np.messages, ...rule.messages };

      return np;
    }, r);
  } else if (isPlainObject(rules)) {
    if ('message' in rules) {
      const nRules = omit(rules, 'message');
      const keys = Object.keys(nRules);
      if (keys.length >= 1) {
        r = {
          rules: nRules,
          messages: {
            [keys[0]]: rules.message,
          },
        };
      }
    } else if (!('message' in rules)) {
      r.rules = rules;
    }
  } else if (isString(rules)) {
    r.rules = parseStringRules(rules);
  }

  return r;
}

export function validateField(field, validator) {
  if (field.initial) {
    validator.validate(`#${field.id}`, field.value);
  } else {
    // eslint-disable-next-line
    validator._validate(field, field.value, true).then(result => {
      field.setFlags({
        valid: result.valid,
        invalid: !result.valid,
      });
    });
  }
}
