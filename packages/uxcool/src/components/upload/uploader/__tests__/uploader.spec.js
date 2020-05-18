import { mount, waitTime } from '@cloud-sn/v-test-utils';
import Vue from 'vue';
import { actionUrl } from './mock';
import UxUpload from '../../index';
import { errorRequest, successRequest, progressRequest } from './requests';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  upload: {},
  setRequestHeader: jest.fn(),
  withCredentials: true,
  responseText: JSON.stringify([
    {
      title: 'test post',
    },
    {
      tile: 'second test post',
    },
  ]),
  getResponseHeader: jest.fn(),
};
const oldXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = jest.fn(() => mockXHR);

describe('Uploader', () => {
  const file = new Blob([JSON.stringify({}, null, 2)], {
    type: 'application/json',
  });
  file.uid = Math.random().toString(16);
  file.name = 'demo.png';
  file.status = 'ready';
  file.response = {};
  file.url = 'http://www.suning.com';
  const files = [file];

  it('should support drop file', async () => {
    const App = {
      template: `<div>
        <UxUpload
          :file-list="list"
          chunk
          :max-chunk-size="maxChunkSize"
           :custom-request="customRequest"
          action=${actionUrl}
        >
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      </div>`,
      components: { UxUpload },
      data() {
        return {
          customRequest: successRequest,
          list: [],
          maxChunkSize: 1,
        };
      },
    };
    const wrapper = mount(App);
    const onClick = jest.fn();
    wrapper.find('input').trigger('keydown.enter', { onClick });
    file.uid = Math.random().toString(16);
    wrapper.find('input').trigger('drop', { dataTransfer: { files } });
    await waitTime();
    await Vue.nextTick();
    wrapper.vm.$destroy();
    expect(onClick).toBeCalled();
  });

  it('should support keydown.enter', async () => {
    const App = {
      template: `<div>
        <UxUpload
          :file-list="list"
          chunk
          :max-chunk-size="maxChunkSize"
           :custom-request="customRequest"
          action=${actionUrl}
        >
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      </div>`,
      components: { UxUpload },
      data() {
        return {
          customRequest: progressRequest,
          list: [],
          maxChunkSize: 1,
        };
      },
    };
    const wrapper = mount(App);
    const onClick = jest.fn();
    wrapper.find('input').trigger('keydown.enter', { onClick });
    wrapper.find('input').trigger('drop', { dataTransfer: { files } });
    await waitTime();
    await Vue.nextTick();
    wrapper.vm.$destroy();
    expect(onClick).toBeCalled();
  });

  it('should support chunk', async () => {
    const App = {
      template: `<div>
        <UxUpload
          :file-list="list"
          chunk
          :max-chunk-size="maxChunkSize"
           :custom-request="customRequest"
          action=${actionUrl}
        >
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      </div>`,
      components: { UxUpload },
      data() {
        return {
          customRequest: errorRequest,
          list: [],
          maxChunkSize: 1,
        };
      },
    };
    const wrapper = mount(App);
    const onClick = jest.fn();
    wrapper.find('input').trigger('keydown.enter', { onClick });
    wrapper.find('input').trigger('drop', { dataTransfer: { files } });
    await waitTime();
    await Vue.nextTick();
    wrapper.vm.$destroy();
    expect(onClick).toBeCalled();
  });

  it('should support chunk', async () => {
    const App = {
      template: `<div>
        <UxUpload
          :file-list="list"
          chunk
          :max-chunk-size="maxChunkSize"
           :custom-request="customRequest"
          action=${actionUrl}
        >
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      </div>`,
      components: { UxUpload },
      data() {
        return {
          customRequest: errorRequest,
          list: [],
          maxChunkSize: 1024,
        };
      },
    };
    const wrapper = mount(App);
    const onClick = jest.fn();
    wrapper.find('input').trigger('keydown.enter', { onClick });
    wrapper.find('input').trigger('drop', { dataTransfer: { files } });
    await waitTime();
    await Vue.nextTick();
    wrapper.vm.$destroy();
    expect(onClick).toBeCalled();
  });

  window.XMLHttpRequest = oldXMLHttpRequest;
});
