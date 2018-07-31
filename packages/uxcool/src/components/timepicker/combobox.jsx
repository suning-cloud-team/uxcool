import { buildComponentName } from '../utils';
import SubMixin from './mixins/sub';
import Select from './select';

export default {
  name: buildComponentName('TimepickerCombobox'),
  mixins: [SubMixin],
  computed: {
    prefixCls() {
      return this.rootPrefixCls;
    },
    visible() {
      return this.rootVisible;
    },
  },
  methods: {
    onSelect(type, value) {
      this.onPanelSelect(type, value);
    },
    onMouseEnter() {},
  },
  render() {
    const {
      prefixCls,
      rootShowHour,
      rootShowMinute,
      rootShowSecond,
      rootTriggerRef,
      rootVisible,
      hourList,
      minuteList,
      secondList,
      onSelect,
      onMouseEnter,
    } = this;
    const on = {
      select: onSelect,
      mouseenter: onMouseEnter,
    };
    return (
      <div class={`${prefixCls}-combobox`}>
        {rootShowHour ? (
          <Select
            prefixCls={prefixCls}
            type="hour"
            triggerRef={rootTriggerRef}
            options={hourList}
            visible={rootVisible}
            {...{ on }}
          />
        ) : null}
        {rootShowMinute ? (
          <Select
            prefixCls={prefixCls}
            type="minute"
            triggerRef={rootTriggerRef}
            options={minuteList}
            visible={rootVisible}
            {...{ on }}
          />
        ) : null}
        {rootShowSecond ? (
          <Select
            prefixCls={prefixCls}
            type="second"
            triggerRef={rootTriggerRef}
            options={secondList}
            visible={rootVisible}
            {...{ on }}
          />
        ) : null}
      </div>
    );
  },
};
