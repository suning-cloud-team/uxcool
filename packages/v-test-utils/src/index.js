import $ from 'jquery';

export * from '@vue/test-utils';

export { $, $ as jQuery };
// ms
export async function waitTime(delay) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
