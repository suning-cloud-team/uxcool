import { cloneVNode } from '@cloud-sn/v-utils';

export function noop() {}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function getRowKey(rowKey, record, rowIdx) {
  const key = typeof rowKey === 'function' ? rowKey(record, rowIdx) : record[rowKey];
  return key === undefined ? `$$_id${rowIdx}` : String(key);
}

export function isPxOrPercentage(val) {
  const valStr = String(val);
  return valStr.indexOf('%') > -1 || valStr.indexOf('px') > -1;
}

export function chainFns(originFn, fn) {
  let nFn = null;
  if (isFunction(originFn) && isFunction(fn)) {
    nFn = function a(...args) {
      fn(...args);
      originFn(...args);
    };
  } else if (isFunction(originFn)) {
    nFn = function a(...args) {
      originFn(...args);
    };
  } else if (isFunction(fn)) {
    nFn = function a(...args) {
      fn(...args);
    };
  }
  return nFn;
}
export function addEventListener(element, eventName, fn) {
  element.addEventListener(eventName, fn, false);
  return {
    remove() {
      element.removeEventListener(eventName, fn);
    },
  };
}

export function getKey(column, defaultKey) {
  return column.key || `$$_id${defaultKey}`;
}
export function flatCols(columns = []) {
  return columns.reduce((r, v) => {
    const nr = r;
    if (v.children) {
      nr.push(...flatCols(v.children));
    } else {
      nr.push(v);
    }
    return nr;
  }, []);
}

function recursiveCols(columns = [], rowIdx = 0, rows = [], parentFixed = false) {
  const groups = [];
  const nRows = rows;
  nRows[rowIdx] = nRows[rowIdx] || [];
  const row = nRows[rowIdx];
  for (let i = 0, l = columns.length; i < l; i += 1) {
    const item = { ...columns[i] };
    let fixed = parentFixed;
    if (rowIdx === 0) {
      fixed = item.fixed === 'right' || item.fixed === 'left' || item.fixed === true;
    }
    item.$$_fixed = fixed;
    row.push(item);

    if (Array.isArray(item.children)) {
      item.children = recursiveCols(item.children, rowIdx + 1, rows, item.$$_fixed);
      item.colspan = 0;
      for (let j = 0, ll = item.children.length; j < ll; j += 1) {
        const child = item.children[j];
        // 有层级的column,上级colspan重新计算, 忽略用户设置的colSpan, 否则会造成异常
        item.colspan += child.children ? child.colspan : 1;
      }
    }
    groups.push(item);
  }
  return groups;
}

/**
 * 保持columns结构,并计算colspan和rowspan
 */
export function groupCols(columns = []) {
  const rows = [];
  const groups = recursiveCols(columns, 0, rows);

  // 计算每行元素实际的rowspan
  const deep = rows.length;
  if (deep >= 1) {
    for (let i = 0; i < deep - 1; i += 1) {
      const rl = rows[i];
      for (let j = 0, l = rl.length; j < l; j += 1) {
        const item = rl[j];
        if (!item.children) {
          item.rowspan = deep - i;
        }
      }
    }
  }
  return groups;
}

function recursiveRow(columns = [], rowIdx = 0, rows = []) {
  const nRows = rows;
  nRows[rowIdx] = nRows[rowIdx] || [];
  const row = nRows[rowIdx];
  for (let i = 0, l = columns.length; i < l; i += 1) {
    const item = columns[i];
    const cell = {
      key: item.key,
      className: item.className,
      title: item.title,
      column: item,
    };
    if ('colspan' in item) {
      cell.colspan = item.colspan;
    }
    if ('rowspan' in item) {
      cell.rowspan = item.rowspan;
    }
    row.push(cell);
    if (item.children) {
      recursiveRow(item.children, rowIdx + 1, rows);
    }
  }
  return rows;
}

/**
 * 汇总表头行的列
 */
export function groupRows(columns = []) {
  return recursiveRow(columns, 0, []);
}

function upperCaseFirst(name) {
  const nName = String(name);
  return nName.substring(0, 1).toUpperCase() + nName.substring(1);
}

export function getRefName(fixed, baseName = '') {
  let name = baseName;
  if (fixed) {
    name = `${fixed}${upperCaseFirst(name)}`;
  }
  return name;
}

export function flatRows(rows = [], childColName = 'children', deep = true) {
  return rows.reduce((r, v) => {
    const nr = r;
    nr.push(deep ? { ...v } : v);
    if (v[childColName]) {
      nr.push(...flatRows(v[childColName], childColName, deep));
    }
    return nr;
  }, []);
}

export function getFlatColumns(self) {
  const {
    fixed, flatColumns, leftFlatColumns, rightFlatColumns
  } = self;
  let cols = flatColumns;
  if (fixed === 'left') {
    cols = leftFlatColumns;
  } else if (fixed === 'right') {
    cols = rightFlatColumns;
  }
  return cols;
}

export function getRowStyle(rowId, rowsHeight) {
  const style = {};
  const height = rowsHeight[rowId];
  if (height) {
    style.height = height === 'auto' ? height : `${height}px`;
  }
  return style;
}

export function getNormalizeContent(h, columnFixed, tableFixed, content) {
  let ret = content;
  if (columnFixed && !tableFixed) {
    ret = Array.isArray(content) ? content.map((v) => cloneVNode(v)) : cloneVNode(content);
  }
  return ret;
}

const DRAG_MIN_GAP = 10;
const DRAG_SIDE_RANGE = 0.25;

export function calcDragPosition(event, el) {
  const { clientY } = event;
  const { top, bottom, height } = el.getBoundingClientRect();
  const offset = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);
  let position = 'inner';

  if (clientY <= top + offset) {
    position = 'top';
  } else if (clientY >= bottom - offset) {
    position = 'bottom';
  }

  return position;
}
