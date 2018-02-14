import raf from 'raf';

export function onNextFrame(fn) {
  return raf(fn);
}
export function cancelNextFrameAction(frameId) {
  raf.cancel(frameId);
}
