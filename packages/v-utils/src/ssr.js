import browser from './browser';

let isServer;
// copy from vue.js
export function isServerRendering() {
  if (isServer === undefined) {
    /* istanbul ignore if */
    if (!browser.inBrowser && !browser.inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      isServer = global.process.env.VUE_ENV === 'server';
    } else {
      isServer = false;
    }
  }
  return isServer;
}

export function ssr() {}
