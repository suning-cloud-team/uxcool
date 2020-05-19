import { isFunction } from '@cloud-sn/v-utils';
import { getValueByFieldName, generateList } from '../utils';

export default {
  inject: {
    timePanelRoot: {
      default: false,
    },
  },
  computed: {
    isChildren() {
      return !!this.timePanelRoot;
    },
    rootPrefixCls() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.prefixCls : '';
    },
    rootValue() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.value : '';
    },
    rootOpenValue() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.openValue : '';
    },
    rootAllowClear() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.allowClear : '';
    },
    rootClearText() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.clearText : '';
    },
    rootTriggerRef() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.triggerRef : '';
    },
    rootFormat() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.format : '';
    },
    rootIsPopupEnter() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.isPopupEnter : false;
    },
    rootPlaceholder() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.placeholder : '';
    },
    rootInputReadonly() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.inputReadonly : '';
    },
    rootFocusOnOpen() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.focusOnOpen : '';
    },
    rootHourStep() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.hourStep : 1;
    },
    rootMinuteStep() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.minuteStep : true;
    },
    rootSecondStep() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.secondStep : true;
    },
    rootShowHour() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.showHour : true;
    },
    rootShowMinute() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.showMinute : true;
    },
    rootShowSecond() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.showSecond : true;
    },
    rootDisabledHours() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.disabledHours : null;
    },
    rootDisabledMinutes() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.disabledMinutes : null;
    },
    rootDisabledSeconds() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.disabledSeconds : null;
    },
    rootHideDisabledOption() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.hideDisabledOption : false;
    },
    rootVisible() {
      const { isChildren, timePanelRoot } = this;
      return isChildren ? timePanelRoot.visible : false;
    },
    openHour() {
      const { rootOpenValue } = this;
      return getValueByFieldName('hour', rootOpenValue);
    },
    openMinute() {
      const { rootOpenValue } = this;
      return getValueByFieldName('minute', rootOpenValue);
    },
    openSecond() {
      const { rootOpenValue } = this;
      return getValueByFieldName('second', rootOpenValue);
    },
    hourList() {
      const { openHour, rootHideDisabledOption, getHourList } = this;
      return getHourList(openHour, rootHideDisabledOption);
    },
    minuteList() {
      const {
        openHour, openMinute, rootHideDisabledOption, getMinuteList
      } = this;
      return getMinuteList(openHour, openMinute, rootHideDisabledOption);
    },
    secondList() {
      const {
        openHour, openMinute, openSecond, rootHideDisabledOption, getSecondList
      } = this;
      return getSecondList(openHour, openMinute, openSecond, rootHideDisabledOption);
    },
  },
  methods: {
    getHourList(hour, hideDisabledOption = false) {
      const { rootDisabledHours, rootHourStep } = this;
      const disabledHours = isFunction(rootDisabledHours) ? rootDisabledHours() : [];
      return generateList(24, hour, disabledHours, hideDisabledOption, rootHourStep);
    },
    getMinuteList(hour, minute, hideDisabledOption = false) {
      const { rootDisabledMinutes, rootMinuteStep } = this;
      const disabledMinutes = isFunction(rootDisabledMinutes) ? rootDisabledMinutes(hour) : [];
      return generateList(60, minute, disabledMinutes, hideDisabledOption, rootMinuteStep);
    },
    getSecondList(hour, minute, second, hideDisabledOption = false) {
      const { rootDisabledSeconds, rootSecondStep } = this;
      const disabledSeconds = isFunction(rootDisabledSeconds)
        ? rootDisabledSeconds(hour, minute)
        : [];
      return generateList(60, second, disabledSeconds, hideDisabledOption, rootSecondStep);
    },
    onPanelChange(value) {
      const { isChildren, timePanelRoot } = this;
      if (isChildren) {
        timePanelRoot.onChange(value);
      }
    },
    onPanelSelect(type, value) {
      const { isChildren, timePanelRoot } = this;
      if (isChildren) {
        timePanelRoot.onSelect(type, value);
      }
    },
    onPanelInputClear() {
      const { isChildren, timePanelRoot } = this;
      if (isChildren) {
        timePanelRoot.onClear();
      }
    },
  },
};
