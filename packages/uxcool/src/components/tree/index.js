import Tree from './tree';
import VirtualTree from './virtualTree';
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

VirtualTree.staticMethod = {
  getNodeStatus,
  getNodeChildCheckState,
  getParentChecked,
  getOriginNodes,
  getNodeOriginParent,
};

Tree.VirtualTree = VirtualTree;

export { Tree as UxTree, VirtualTree, VirtualTree as UxVirtualTree };

export default Tree;
