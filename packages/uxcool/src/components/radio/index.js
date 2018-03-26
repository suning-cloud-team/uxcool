import Radio from './radio.vue';
import Group from './group';
import Button from './button.vue';

Radio.Group = Group;
Radio.Button = Button;

export { Radio as UxRadio, Group as UxRadioGroup, Button as UxRadioButton };
export default Radio;
