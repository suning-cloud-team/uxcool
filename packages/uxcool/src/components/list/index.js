import List from './list';
import Item from './item';
import Meta from './meta';

List.Item = Item;
List.Item.Meta = Meta;

export { List as UxList, Item as UxListItem, Meta as UxListItemMeta };

export default List;
