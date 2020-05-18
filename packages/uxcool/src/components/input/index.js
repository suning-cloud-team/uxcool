import Input from './input';
import Search from './search';
import Group from './group';
import Textarea from './textarea.vue';

Input.Search = Search;
Input.Group = Group;
Input.Textarea = Textarea;

export {
  Input as UxInput, Search as UxSearchInput, Group as UxInputGroup, Textarea as UxTextarea
};

export default Input;
