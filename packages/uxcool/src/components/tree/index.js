import Tree from './tree';
import {
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
  getNodeOriginParent,
} from './utils';

Tree.staticMethod = {
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
  getNodeOriginParent,
};

export { Tree as UxTree };

export default Tree;
