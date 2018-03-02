export function getData(cnt = 10, extra = '') {
  const ret = [];
  for (let i = 0; i < cnt; i += 1) {
    ret.push({
      key: `${extra}${i}`,
      name: `ssss${i}`,
      age: i + 10,
      addr: `a.b.c.d.${i}`,
      children: [
        {
          key: `${extra}c${i}`,
          name: `ssss${i}${i}`,
          age: i + cnt + 10,
          addr: `a.b.c.d.${i}`,
        },
      ],
    });
  }
  return ret;
}

export function noop() {}
