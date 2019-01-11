import { isFunction } from '@suning/v-utils';

export default {
  methods: {
    canAsync(parent) {
      const { lazy, loadData } = this;
      if (!parent) {
        return lazy && isFunction(loadData);
      }
      const { isLoaded, isLoading, children } = parent;
      const hasChildren = children && children.filter(v => !v.isDragNode).length !== 0;
      return lazy && !isLoaded && !isLoading && !hasChildren;
    },
    asyncNode(parent) {
      const { lazy, loadData, addNodes } = this;
      if (!lazy || !isFunction(loadData)) return Promise.resolve(null);
      const nParent = parent;
      if (nParent) {
        nParent.isLoading = true;
        nParent.isLoaded = false;
      }
      return Promise.resolve(loadData(nParent)).then((data) => {
        if (nParent) {
          nParent.isLoading = false;
          nParent.isLoaded = true;
          nParent.originNode.$$isLoaded = true;
        }
        return addNodes(data, nParent, false);
      });
    },
  },
};
