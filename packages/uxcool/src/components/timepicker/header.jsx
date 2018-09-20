import { format as formatFn, isEqual as isDateEqual, getYear, getMonth, getDate } from 'date-fns';
import { leftPad } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { updatePortalElement, parseDate } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: buildComponentName('TimepickerHeader'),
  mixins: [SubMixin],
  data() {
    return {
      innerValue: null,
      inputValue: null,
      invalid: false,
    };
  },
  computed: {
    prefixCls() {
      return this.rootPrefixCls;
    },
    classes() {
      const { prefixCls, invalid } = this;
      return {
        [`${prefixCls}-input-wrap`]: true,
        [`${prefixCls}-input-wrap-invalid`]: invalid,
      };
    },
    formatValue() {
      const {
        innerValue, inputValue, rootFormat, invalid
      } = this;
      if (invalid) {
        return inputValue;
      }
      return innerValue ? formatFn(innerValue, rootFormat) : '';
    },
    inputNode() {
      return this.renderInput();
    },
    clearBtn() {
      const {
        prefixCls, rootAllowClear, rootClearText, onClear
      } = this;
      return rootAllowClear ? (
        <a
          class={`${prefixCls}-clear-btn`}
          role="button"
          title={rootClearText}
          on-click={onClear}
        />
      ) : null;
    },
  },
  watch: {
    rootValue(nVal) {
      this.setInnerValue(nVal, false);
    },
    rootVisible(nVal) {
      if (nVal) {
        const { inputFocus } = this;
        inputFocus();
      }
    },
  },
  created() {
    this.setInnerValue(this.rootValue, false);
  },
  mounted() {
    const { inputFocus } = this;
    // 防止初始化时,popup尚未挂载到指定位置
    setTimeout(() => {
      inputFocus();
    }, 0);
  },
  methods: {
    inputFocus() {
      const {
        $refs: { inputRef }, rootFocusOnOpen, rootTriggerRef, rootInputReadonly
      } = this;
      if (rootFocusOnOpen && inputRef && rootTriggerRef && !rootInputReadonly) {
        updatePortalElement(rootTriggerRef.getPortalPopupElement(), () => {
          inputRef.focus();
          inputRef.select();
        });
      }
    },
    setInnerValue(value, trigger = false) {
      this.innerValue = value;
      if (trigger) {
        this.onPanelChange(value);
      }
    },
    onClear() {
      const { onPanelInputClear } = this;
      onPanelInputClear();
    },
    onInput(e) {
      const {
        innerValue,
        rootAllowClear,
        rootFormat,
        setInnerValue,
        getHourList,
        getMinuteList,
        getSecondList,
      } = this;
      const { value } = e.target;

      if (!value) {
        if (rootAllowClear) {
          this.inputValue = null;
          setInnerValue(null, true);
          this.invalid = false;
        } else {
          this.inputValue = '';
          this.invalid = true;
        }
        return;
      }
      const dateInfo = parseDate(value, rootFormat);
      if (!dateInfo) {
        this.inputValue = value;
        this.invalid = true;
        return;
      }
      const { hour = '', minute = '', second = '' } = dateInfo;

      const hourList = getHourList(hour, true);
      const minuteList = getMinuteList(hour, minute, true);
      const secondList = getSecondList(hour, minute, second, true);

      const isValid =
        hourList.some(v => v.value === leftPad(hour)) &&
        minuteList.some(v => v.value === leftPad(minute)) &&
        secondList.some(v => v.value === leftPad(second));
      if (!isValid) {
        this.inputValue = value;
        this.invalid = true;
        return;
      }

      const date = innerValue || new Date();

      const nDate = new Date(getYear(date), getMonth(date), getDate(date), hour, minute, second);

      const formatStr = formatFn(nDate, rootFormat);
      // 只有当输入值完全符合格式化形式时,才算正确的值,防止非预期转换, 如12:00:1 => 12:00:01
      if (formatStr !== value) {
        this.inputValue = value;
        this.invalid = true;
        return;
      }
      if (!isDateEqual(innerValue, nDate)) {
        setInnerValue(nDate, true);
      }
      this.invalid = false;
    },
    onBlur() {
      if (this.invalid) {
        this.inputValue = null;
        this.invalid = false;
      }
    },
    renderInput() {
      const {
        prefixCls, formatValue, rootPlaceholder, rootInputReadonly, onInput, onBlur
      } = this;
      const on = {
        input: onInput,
        blur: onBlur,
      };
      return (
        <input
          {...{
            class: `${prefixCls}-input`,
            domProps: {
              value: formatValue,
            },
            attrs: {
              placeholder: rootPlaceholder,
              readonly: rootInputReadonly,
            },
            on,
            ref: 'inputRef',
          }}
        />
      );
    },
  },
  render() {
    const { classes, inputNode, clearBtn } = this;
    return (
      <div class={classes}>
        {inputNode}
        {clearBtn}
      </div>
    );
  },
};
