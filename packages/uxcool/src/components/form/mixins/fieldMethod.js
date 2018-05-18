import { warning, isDef, castArray } from '@suning/v-utils';
import { isValidateField } from '../utils';

export default {
  methods: {
    addFormField(field) {
      this.fields.push(field);
      if (process.env.NODE_ENV !== 'production') {
        const fileNameCount = this.fields.reduce((r, v) => {
          const nr = r;
          const { name } = v;
          if (name in r) {
            nr[name] = r[name] + 1;
          } else {
            nr[name] = 1;
          }
          return nr;
        }, {});
        Object.keys(fileNameCount).forEach((k) => {
          const cnt = fileNameCount[k];
          if (cnt > 1) {
            warning(false, `Multiple FieldDecorator name \`${k}\` appear`);
          }
        });
      }
    },
    removeFormField(field) {
      this.fields = this.fields.filter(v => v !== field);
    },
    getFieldValue(name) {
      if (!name) {
        return undefined;
      }
      const { fields } = this;
      const { field } = fields.filter(v => v.name === name)[0] || {};
      return field ? field.getter() : undefined;
    },
    getFieldsValue(names) {
      const { fields } = this;
      const fieldNames = isDef(names)
        ? castArray(names).reduce((p, k) => {
          const np = p;
          np[k] = 1;
          return np;
        }, {})
        : null;

      const r = fields.reduce((p, { field }) => {
        const np = p;
        if (field) {
          if (fieldNames) {
            if (field.name in fieldNames) {
              np[field.name] = field.getter();
            }
          } else {
            np[field.name] = field.getter();
          }
        }

        return np;
      }, {});

      // 补充不存在的field value
      const keys = fieldNames && Object.keys(fieldNames);
      if (fieldNames && keys.length !== Object.keys(r).length) {
        keys.forEach((k) => {
          if (!(k in r)) {
            r[k] = undefined;
          }
        });
      }
      return r;
    },
    clearErrors(scope) {
      const { fields: { items }, errors } = this.$validator;
      errors.clear(scope);
      (items || []).forEach((v) => {
        v.setFlags({
          invalid: false,
          valid: true,
          pending: false,
        });
      });
    },
    resetFields() {
      const { fields, $validator, clearErrors } = this;
      $validator.pause();
      fields.forEach(({ field }) => {
        if (field) {
          field.$$setter(field.initialValue);
          if (isValidateField(field)) {
            field.setFlags({
              pending: false,
            });
          }
        }
      });
      clearErrors();
      $validator.resume();
    },
    getFieldError(name, scope = null) {
      const { errors } = this.$validator;
      return errors.first(name, scope);
    },
    getFieldsError(names) {
      const fieldNames = isDef(names) ? castArray(names) : null;
      const { errors } = this.$validator;
      let collect = errors.collect();
      if (fieldNames) {
        collect = fieldNames.reduce((r, k) => {
          const nr = r;
          if (k in collect) {
            nr[k] = collect[k];
          } else {
            nr[k] = undefined;
          }
          return nr;
        }, {});
      }
      return collect;
    },
    hasErrors() {
      const { errors } = this.$validator;
      return errors.any();
    },
  },
};
