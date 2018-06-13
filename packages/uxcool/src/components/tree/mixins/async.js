import { isFunction } from '@suning/v-utils';

export default {
  methods: {
    canAsync(parent) {
      if (!parent) return false;
      const { lazy } = this;
      const { isLoaded, isLoading, children } = parent;

      return lazy && !isLoaded && !isLoading && (!children || children.length === 0);
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
        }
        return addNodes(data, nParent);
      });
    },
  },
};
