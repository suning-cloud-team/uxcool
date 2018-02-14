import raf from 'raf';

export function scrollTo(element, offset, duration) {
  const nElm = element;
  let nDuration = duration;
  function next() {
    if (nDuration <= 0) {
      nElm.scrollTop = offset;
      return;
    }
    const { scrollTop } = nElm;
    const distance = offset - scrollTop;
    const per = distance / nDuration * 10;
    const to = scrollTop + per;
    nElm.scrollTop = to;
    nDuration -= 10;
    if (to !== offset) {
      raf(next);
    }
  }
  next();
}

export function noop() {}
