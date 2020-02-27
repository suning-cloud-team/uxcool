import { isArray } from '@suning/v-utils';
import { maybeAncestorOf } from '../util';

export default {
  methods: {
    canAsync(parent) {
      const { isLazy } = this;
      if (!parent) {
        return isLazy;
      }
      const {
        children, isParent, isLoaded, isLoading
      } = parent;

      return (
        isLazy
        && isParent
        && !isLoading
        && !isLoaded
        && (!isArray(children) || children.length === 0)
      );
    },
    // 判断某个未匹配到的valuePath是否可能为未加载节点的valuePath
    isUnMatchedValuePending(valuePath = []) {
      const { getNode } = this;

      return (
        valuePath.length > 0
        && !valuePath.some((val, i) => {
          if (i === 0) {
            return !getNode([valuePath[0]]);
          }
          const parent = getNode(valuePath.slice(0, i));
          const current = getNode(valuePath.slice(0, i + 1));

          // 上一级存在但是下一级不存在
          return parent && parent.isLoaded && !current;
        })
      );
    },
    // 检查pendingValue有效性
    checkPendingValue(parent) {
      const {
        getPendingValue, isUnMatchedValuePending, setPendingValue, getNode
      } = this;

      let pendingValue = getPendingValue();
      const len = pendingValue.length;

      pendingValue = pendingValue.filter(
        (val) => !getNode(val)
          && ((parent && !maybeAncestorOf(parent.valuePath, val)) || isUnMatchedValuePending(val))
      );

      // pendingValue变化了才去更新
      if (len !== pendingValue.length) {
        setPendingValue(pendingValue);
      }
    },
    asyncNode(parent) {
      const {
        canAsync, loadData, addNodes, checkPendingValue
      } = this;

      if (!canAsync(parent)) {
        return Promise.resolve(null);
      }

      const nParent = parent;
      let params;

      if (nParent) {
        nParent.isLoaded = false;
        nParent.isLoading = true;
        params = { ...nParent };
      }

      return Promise.resolve(loadData(params))
        .then((data) => {
          if (nParent) {
            nParent.isLoaded = true;
            nParent.isLoading = false;
          }

          const result = addNodes(data || [], nParent);
          // 检查pendingValue有效性
          checkPendingValue(nParent);
          return result;
        })
        .catch(() => {
          if (nParent) {
            nParent.isLoaded = false;
            nParent.isLoading = false;
          }
        });
    },
  },
};
