/* global WXEnvironment */
const inBrowser = typeof window !== 'undefined';
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isEdge = UA && UA.indexOf('edge/') > 0;

export default {
  inBrowser,
  inWeex,
  weexPlatform,
  isIE: UA && /msie|trident/.test(UA),
  isIE9: UA && UA.indexOf('msie 9.0') > 0,
  isEdge,
  isAndroid: (UA && UA.indexOf('android') > 0) || weexPlatform === 'android',
  isIOS: (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios',
  isChrome: UA && /chrome\/\d+/.test(UA) && !isEdge,
};
