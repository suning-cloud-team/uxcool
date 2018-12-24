import { isDef } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { isNotCompleteNumber, getMaxPrecision, isNaN, getRatio, getValidateValue } from './utils';
import InputHandler from './inputHandler';

// prettier-ignore
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || (2 ** 53) - 1;

export default {
  name: buildComponentName('InputNumber'),
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'ux-input-number',
    },
    value: {
      type: [Number, String],
      // type: Number,
      default: undefined,
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['large', 'default', 'small', ''].indexOf(val) > -1;
      },
    },
    focusOnUpDown: {
      type: Boolean,
      default: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: MAX_SAFE_INTEGER,
    },
    min: {
      type: Number,
      default: -MAX_SAFE_INTEGER,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    useTouch: {
      type: Boolean,
      default: false,
    },
    formatter: {
      type: Function,
      default: null,
    },
    parser: {
      type: Function,
      default(val) {
        return val.replace(/[^\w.-]+/g, '');
      },
    },
    precision: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      inputValue: '',
      innerValue: '',
      // input 输入
      inputting: false,
      focused: false,
      autoStepTimer: null,
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, size, disabled, focused
      } = this;

      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
      };
    },
    isCanEditable() {
      const { readonly, disalbed } = this;
      return !readonly && !disalbed;
    },
    bindAttrs() {
      const {
        $attrs, autofocus, disabled, readonly, max, min, step
      } = this;
      return {
        ...$attrs,
        autofocus,
        disabled,
        readonly,
        max,
        min,
        step,
      };
    },
    bindListeners() {
      const {
        $listeners,
        isCanEditable,
        onInput,
        onChange,
        onFocus,
        onBlur,
        onKeydown,
        onKeyup,
      } = this;
      return {
        ...$listeners,
        change: onChange,
        input: onInput,
        focus: onFocus,
        blur: onBlur,
        keydown: isCanEditable ? onKeydown : () => {},
        keyup: isCanEditable ? onKeyup : () => {},
      };
    },
    upDisabledClass() {
      const { prefixCls, innerValue, max } = this;
      let r = false;

      if (innerValue || innerValue === 0) {
        // like Number.isNaN
        if (!isNaN(Number(innerValue))) {
          const val = Number(innerValue);
          if (val >= max) {
            r = true;
          }
        } else {
          r = true;
        }
      }
      return r ? `${prefixCls}-handler-up-disabled` : null;
    },
    downDisabledClass() {
      const { prefixCls, innerValue, min } = this;
      let r = false;

      if (innerValue || innerValue === 0) {
        // like Number.isNaN
        if (!isNaN(Number(innerValue))) {
          const val = Number(innerValue);
          if (val <= min) {
            r = true;
          }
        } else {
          r = true;
        }
      }
      return r ? `${prefixCls}-handler-down-disabled` : null;
    },
    formatValue() {
      const { innerValue, formatter } = this;
      if (formatter) {
        return formatter(innerValue);
      }
      return innerValue;
    },
  },
  // watch: {
  //   value() {
  //     this.initValue();
  //   },
  // },
  created() {
    this.initValue();
    this.focused = this.autofocus;
    this.$watch(
      () => ({
        value: this.value,
        max: this.max,
        min: this.min,
      }),
      () => {
        this.initValue();
      }
    );
  },
  methods: {
    initValue() {
      const { innerValue, value, normalizeValue } = this;
      let nVal = parseFloat(value, 10);
      if (!isNaN(nVal)) {
        nVal = normalizeValue(nVal);
      } else {
        nVal = value;
      }
      nVal = getValidateValue(nVal);
      if (innerValue !== nVal) {
        this.innerValue = nVal;
        if (isDef(nVal) && String(value) !== String(nVal)) {
          this.$emit('input', nVal);
          this.$emit('input-change', nVal);
        }
      }
    },
    toNumber(v) {
      const { precision } = this;
      if (isNotCompleteNumber(v)) return v;
      if (precision !== null) {
        return Number(Number(v).toFixed(precision));
      }
      return Number(v);
    },
    getValidValue(val) {
      const { max, min } = this;
      let r = Number(val);
      if (r < min) {
        r = min;
      }
      if (r > max) {
        r = max;
      }

      return r;
    },
    getCurrentValidValue(val) {
      const { innerValue, getValidValue, toNumber } = this;

      if (val === '') {
        return val;
      }

      let r = innerValue;
      if (!isNotCompleteNumber(val)) {
        r = getValidValue(val);
      }
      return toNumber(r);
    },
    toPrecision(val) {
      const { step, precision: defaultPrecision } = this;
      if (!isDef(val) || val === '') {
        return val;
      }
      const precision = getMaxPrecision(val, step, 1, defaultPrecision);

      if (precision > 0) {
        return Number(val).toFixed(precision);
      }

      return String(val);
    },
    onInputChange(value) {
      this.$emit('input-change', value);
    },
    normalizeValue(val) {
      const { getCurrentValidValue, toPrecision } = this;
      const nVal = getCurrentValidValue(val);
      return toPrecision(nVal);
    },
    setValue(val, forceUpdate = false) {
      const {
        innerValue, inputValue, normalizeValue, onInputChange
      } = this;
      const nVal = getValidateValue(normalizeValue(val));
      this.innerValue = nVal;
      if (nVal !== innerValue) {
        this.$emit('input', nVal);
        this.$emit('change', nVal);
      }
      // 当 输入的字符为无效字符时,会重置为上一个有效值, 此时由于值未变更, vue无法判定是否需要重绘, 需手动触发重绘
      if (forceUpdate && nVal === innerValue) {
        this.$forceUpdate();
      }

      if (nVal !== innerValue || nVal !== inputValue) {
        onInputChange(nVal);
      }
    },
    stop() {
      const { autoStepTimer } = this;
      if (autoStepTimer) {
        clearTimeout(autoStepTimer);
      }
    },
    upStep(val, ratio = 1, precisionFactor = 1, precision) {
      const { step } = this;
      // prettier-ignore
      return (((precisionFactor * val) + (precisionFactor * step * ratio)) / precisionFactor)
        .toFixed(precision);
    },
    downStep(val, ratio = 1, precisionFactor = 1, precision) {
      const { step } = this;
      // prettier-ignore
      return (((precisionFactor * val) - (precisionFactor * step * ratio)) / precisionFactor)
        .toFixed(precision);
    },
    _step(e, type, ratio = 1, autoStep = true, recursive = false) {
      const {
        min,
        max,
        innerValue,
        inputValue,
        inputting,
        upStep,
        downStep,
        toNumber,
        getCurrentValidValue,
        setValue,
        step,
        precision: defaultPrecision,
        stop,
      } = this;
      stop();
      if (e) {
        e.preventDefault();
        if (e.button !== 0 && e.keyCode !== 38 && e.keyCode !== 40) {
          return;
        }
      }

      const currentVal = inputting ? inputValue : innerValue;
      const validVal = getCurrentValidValue(currentVal) || 0;
      const stepFn = type === 'up' ? upStep : downStep;
      // 防止出现除不净的问题,类似: 1.1-1 = 0.10000000000000009
      const precision = getMaxPrecision(validVal, step, ratio, defaultPrecision);
      const precisionFactor = 10 ** precision;
      const val = toNumber(stepFn(validVal, ratio, precisionFactor, precision));
      setValue(val, inputting);
      this.inputting = false;
      this.focused = true;

      if (autoStep && val > min && val < max) {
        this.autoStepTimer = setTimeout(() => {
          this[type](e, ratio, true, true);
        }, recursive ? 200 : 600);
      }
    },
    up(e, ratio, autoStep, recursive) {
      const { _step } = this;
      _step(e, 'up', ratio, autoStep, recursive);
    },
    down(e, ratio, autoStep, recursive) {
      const { _step } = this;
      _step(e, 'down', ratio, autoStep, recursive);
    },
    onInput(e) {
      const { parser, onInputChange } = this;
      this.inputting = true;
      const val = e.target.value;
      const inputValue = parser(val.trim().replace(/。/g, '.'));
      this.inputValue = inputValue;
      onInputChange(inputValue);
    },
    onChange() {
      const { inputValue } = this;
      if (this.inputting) {
        this.inputting = false;
        this.setValue(inputValue, true);
      }
    },
    onFocus(e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.inputting = false;
      this.focused = false;
      this.$emit('blur', e);
    },
    onKeydown(e) {
      const { up, down } = this;
      if (e.keyCode === 38) {
        up(e, getRatio(e), false);
      } else if (e.keyCode === 40) {
        down(e, getRatio(e), false);
      }
      this.$emit('keydown', e);
    },
    onKeyup(e) {
      this.$emit('keyup', e);
    },
    focus() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.focus();
      }
    },
    blur() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.blur();
      }
    },
    renderHandlers() {
      const {
        prefixCls,
        useTouch,
        isCanEditable,
        upDisabledClass,
        downDisabledClass,
        up,
        down,
        stop,
      } = this;
      const handlerCls = `${prefixCls}-handler`;
      const baseOn = {
        mouseup: stop,
        mouseleave: stop,
      };
      let upOn = useTouch
        ? {
          touchstart: up,
          touchend: stop,
        }
        : {
          mousedown: up,
          ...baseOn,
      };
      upOn = isCanEditable && !upDisabledClass ? upOn : null;

      let downOn = useTouch
        ? {
          touchstart: down,
          touchend: stop,
        }
        : {
          mousedown: down,
          ...baseOn,
      };
      downOn = isCanEditable && !downDisabledClass ? downOn : null;

      return (
        <div class={`${prefixCls}-handler-wrap`}>
          <InputHandler {...{ class: [handlerCls, `${handlerCls}-up`, upDisabledClass], on: upOn }}>
            <span class={`${handlerCls}-up-inner`} />
          </InputHandler>
          <InputHandler
            {...{ class: [handlerCls, `${handlerCls}-down`, downDisabledClass], on: downOn }}
          >
            <span unselectable="unselectable" class={`${handlerCls}-down-inner`} />
          </InputHandler>
        </div>
      );
    },
    renderInput() {
      const {
        prefixCls, max, min, innerValue, formatValue, bindAttrs, bindListeners
      } = this;

      const attrs = {
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': innerValue,
      };
      return (
        <div {...{ class: `${prefixCls}-input-wrap`, attrs }}>
          <input
            {...{
              class: `${prefixCls}-input`,
              domProps: {
                value: formatValue,
              },
              attrs: bindAttrs,
              on: bindListeners,
              ref: 'inputRef',
            }}
          />
        </div>
      );
    },
  },
  render() {
    const { classes, renderHandlers, renderInput } = this;
    return (
      <div {...{ class: classes }}>
        {renderHandlers()}
        {renderInput()}
      </div>
    );
  },
};
