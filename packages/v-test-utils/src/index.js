import $ from 'jquery';

export * from '@vue/test-utils';

// export * as server from '@vue/server-test-utils';

export { $, $ as jQuery };
// ms
export async function waitTime(delay = 20) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
