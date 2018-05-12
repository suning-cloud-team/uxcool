import Select from './select.vue';
import Option from './option.vue';
import OptionGroup from './optionGroup.vue';

Select.Option = Option;
Select.OptionGroup = OptionGroup;

export { Select as UxSelect, Option as UxOption, OptionGroup as UxOptionGroup };
export default Select;
