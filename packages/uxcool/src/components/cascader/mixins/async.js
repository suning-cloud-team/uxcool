import { isArray, isFunction } from '@cloud-sn/v-utils';
import { DEFAULT_FIELD_NAMES } from '../utils';

const { children: DefaultChildren } = DEFAULT_FIELD_NAMES;

export default {
  methods: {
    canAsync(parent) {
      const { loadData } = this;
      if (!parent) {
        return isFunction(loadData);
      }
      const children = parent[DefaultChildren];
      const { isParent, isLoaded, isLoading } = parent;
      const isCanLoad = isParent && !isLoaded && !isLoading;
      return isCanLoad && isFunction(loadData) && (!isArray(children) || children.length === 0);
    },
    asyncNode(parent) {
      const { canAsync, loadData, addNodes } = this;
      if (!canAsync(parent)) {
        return Promise.resolve(null);
      }
      const np = parent;
      let params;
      if (np) {
        np.isLoading = true;
        np.isLoaded = false;
        params = { ...np.originNode };
      }
      return Promise.resolve(loadData(params)).then((data) => {
        if (np) {
          np.isLoaded = true;
          np.isLoading = false;
        }
        return addNodes(data, np);
      });
    },
  },
};
