import { warning } from '../utils';

export function getColKey(col, colIdx) {
  return col.key || `$$_id${colIdx}`;
}
export function getRowKey(rowKey, record, rowIdx) {
  const key = typeof rowKey === 'function' ? rowKey(record, rowIdx) : record[rowKey];
  warning(
    key !== undefined,
    'Each record in dataSource of table should have a unique `key` prop, or set `rowKey` to an unique primary key'
  );
  return key === undefined ? `$$_id${rowIdx}` : String(key);
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function flatRows(rows = [], childColName = 'children', deep = true) {
  return rows.reduce((r, v) => {
    const nr = r;
    nr.push(deep ? { ...v } : v);
    const child = v[childColName];
    if (Array.isArray(child) && child.length > 0) {
      nr.push(...flatRows(v[childColName], childColName, deep));
    }
    return nr;
  }, []);
}

function recursiveRows(rows = [], cb, childColName, deep = true) {
  const ret = [];
  for (let i = 0, l = rows.length; i < l; i += 1) {
    const row = rows[i];
    const r = deep ? { ...row } : row;
    ret.push(isFunction(cb) ? cb(r) : r);
    const child = row[childColName];
    if (Array.isArray(child) && child.length > 0) {
      r[childColName] = recursiveRows(child, cb, childColName, deep);
    }
  }
  return ret;
}

export function normalizeRows(rows = [], cb = null, childColName = 'children', deep = true) {
  return recursiveRows(rows, cb, childColName, deep);
}

export function normalizeCols(cols = [], cb = null, childColName = 'children', deep = true) {
  return recursiveRows(cols, cb, childColName, deep);
}

export function recursiveSort(data = [], sortFn, childColName = 'children') {
  return data.sort(sortFn).map((v) => {
    const nv = v;
    const child = nv[childColName];
    if (Array.isArray(child) && child.length > 0) {
      nv[childColName] = recursiveSort(child, sortFn, childColName);
    }
    return nv;
  });
}
