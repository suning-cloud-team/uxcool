import { buildComponentName } from '../utils';
import FlagsMixin from './mixins/flags';
import ValidateMixin from './mixins/validate';
import FieldMethodMixin from './mixins/fieldMethod';

export default {
  name: buildComponentName('Form'),
  mixins: [FlagsMixin, ValidateMixin, FieldMethodMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-form',
    },
    layout: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical', 'inline'].indexOf(val) > -1;
      },
    },
    hideRequiredMark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls, layout, hideRequiredMark } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${layout || 'horizontal'}`]: true,
        [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
      };
    },
    bindAttrs() {
      const { $attrs } = this;
      const r = {
        ...$attrs,
        novalidate: true,
      };
      return r;
    },
    bindListeners() {
      const { $listeners, onSubmit } = this;
      return {
        ...$listeners,
        submit: onSubmit,
      };
    },
  },

  created() {
    const { validator, $validator } = this;
    const globalValidator = validator || {};
    const { locale } = globalValidator;
    if (locale) {
      $validator.locale(locale);
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$emit('submit', e);
    },
  },
  render() {
    const {
      $slots, classes, bindAttrs, bindListeners
    } = this;
    return (
      <form {...{ class: classes, attrs: bindAttrs, on: bindListeners }}>{$slots.default}</form>
    );
  },
};
