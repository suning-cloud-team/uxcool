import { mount, waitTime } from '@cloud-sn/v-test-utils';
import Vue from 'vue';
import { actionUrl, setup, teardown } from './mock';
import createFile from './util/file';
import UxUpload from '../index';
import List from '../list';
import { errorRequest, successRequest, progressRequest } from './requests';


describe('Upload', () => {
  beforeEach(() => setup());
  afterEach(() => teardown());
  describe('List', () => {
    it('should  Render thumbnails correctly', async () => {
      const APP = {
        template: `
        <UxUpload
          v-model="fileList"
          type="select"
          action=${actionUrl}
          list-type="picture">
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      `,
        components: {
          UxUpload,
        },
        data() {
          return {
            fileList: [
              {
                uid: Math.random().toString(16),
                name: 'demo.png',
                status: 'ready',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              },
              {
                uid: Math.random().toString(16),
                name: 'demo2.png',
                status: 'uploading',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              },
              {
                uid: Math.random().toString(16),
                name: 'demo3.png',
                status: 'success',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              }
            ],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      wrapper.find('.ux-upload-list-item-thumbnail').trigger('click');
      wrapper.find('span.ux-upload-list-item-ops > i').trigger('click');
      await Vue.nextTick();
      expect(wrapper.findAll('.ux-upload-list-item-thumbnail').length).toBe(2);
      wrapper.destroy();
    });

    it('should  continue to upload while click continue button', async () => {
      const APP = {
        template: `
            <UxUpload
              v-model="fileList"
              action=${actionUrl}
              :custom-request="customRequest"
              chunk
              list-type="picture">
              <button icon="upload">Click to Upload</button>
            </UxUpload>
          `,
        components: {
          UxUpload,
        },
        data() {
          return {
            customRequest: successRequest,
            fileList: [
              {
                uid: Math.random().toString(16),
                chunkId: Math.random().toString(16),
                name: 'demo.png',
                status: 'uploading',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              },
              {
                uid: Math.random().toString(16),
                name: 'demo.png',
                status: 'ready',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              }
            ],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      wrapper.find('.ux-upload-list-item-thumbnail').trigger('click');
      wrapper.find('.ux-upload-list-item-ops > i').trigger('click');
      wrapper.find('.fu-play_circle_o').trigger('click');
      await Vue.nextTick();
      expect(wrapper.findAll('.fu-play_circle_o').length).toBe(1);
      expect(wrapper.findAll('.fu-pause_circle_o').length).toBe(1);
      wrapper.destroy();
    });

    it('should  render correctly with type picture-card ', async () => {
      const APP = {
        template: `
            <UxUpload
              v-model="fileList"
              action=${actionUrl}
              chunk
              list-type="picture-card">
              <button icon="upload">Click to Upload</button>
            </UxUpload>
          `,
        components: {
          UxUpload,
        },
        data() {
          return {
            fileList: [
              {
                uid: Math.random().toString(16),
                name: 'demo.png',
                status: 'uploading',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: 'http://www.suning.com'
              }
            ],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      await Vue.nextTick();
      expect(wrapper.findAll('.ux-upload-list-picture-card').length).toBe(1);
      wrapper.destroy();
    });

    it('props should has deault value', async () => {
      const App = {
        template: '<List/>',
        components: { List }
      };
      const wrapper = mount(App);
      await waitTime();
      expect(Array.isArray(wrapper.vm.$children[0].$props.list)).toBe(true);
      expect(typeof wrapper.vm.$children[0].$props.locale).toBe('object');
      wrapper.destroy();
    });
  });

  it('should  render correctly with listType', async () => {
    const listType = ['text', 'picture', 'picture-card'];
    listType.forEach(async (type) => {
      const APP = {
        render() {
          return (
            <div>
              <UxUpload
                name='abc'
                list-type={type}
                action={actionUrl} >
                <button
                  ref='button'
                  icon='upload' > Click to Upload </button>
                <span
                  style='margin-left:8px' > this is upload tip </span>
              </UxUpload >
            </div>
          );
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      expect(wrapper.contains('input')).toBe(true);
    });
  });

  it('Self-controlled upload', async () => {
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo-self.png';
    const files = [
      file,
      {
        uid: Math.random().toString(16),
        name: 'demo.png',
        status: 'ready',
        response: {},
        originFile: 'string',
        error: {},
        linkProps: { download: 'http://www.suning.com' },
      },
      {
        uid: Math.random().toString(16),
        name: 'demo.png',
        status: 'ready',
        response: {},
        originFile: new File([], 'demo.png'),
        error: {},
        linkProps: { download: 'http://www.suning.com' },
      }];
    const APP = {
      template: `
         <div>
          <UxUpload
            ref="uploadRef"
            :file-list="files"
            :auto-upload="false"
            action=${actionUrl}
          >
            <button icon="upload">选择文件</button>
          </UxUpload>
          <button class="mt-xs-2" type="primary" @click="upload">开始上传</button>
        </div>
        `,
      components: {
        UxUpload,
      },
      data() {
        return {
          files,
        };
      },
      methods: {
        upload() {
          const {
            $refs: { uploadRef },
          } = this;

          if (uploadRef) {
            uploadRef.submit();
          }
        },
      },
    };
    const wrapper = mount(APP);
    await Vue.nextTick();
    wrapper.find('button').trigger('click');
    await waitTime();
    wrapper.vm.$children[0].submit();
    expect(files[0].status).not.toBe('ready');
    wrapper.destroy();
  });


  it('should  render correctly with props show-upload-list', async () => {
    const showUploadList = [true, false, { showPreviewIcon: true, showRemoveIcon: false }, { showPreviewIcon: false, showRemoveIcon: true }];
    const fileList = [
      {
        uid: Math.random().toString(16),
        name: 'demo.png',
        response: {},
        error: {},
        linkProps: { download: 'http://www.suning.com' },
      }
    ];
    showUploadList.forEach(async (showUpload) => {
      const APP = {
        render() {
          return (
            <div>
              <UxUpload
                name='abc'
                show-upload-list={showUpload}
                file-list={fileList}
                action={actionUrl} >
                <button
                  ref='button'
                  icon='upload' > Click to Upload </button>
                <span
                  style='margin-left:8px' > this is upload tip </span>
              </UxUpload >
            </div>
          );
        },
      };

      const wrapper = mount(APP);
      await waitTime();
      expect(wrapper.findAll('ux-upload-list-item-name').length).toBe(0);
      wrapper.destroy();
    });
  });

  it('should render file list correctly', async () => {
    const fileList = [createFile('js')];
    const APP = {
      render() {
        return (
          <div>
            <UxUpload
              name='abc'
              fileList={fileList}
              action={actionUrl} >
              <button
                ref='button'
                icon='upload' > Click to Upload </button>
              <span
                style='margin-left:8px' > this is upload tip </span>
            </UxUpload >
          </div>
        );
      },
    };
    const wrapper = mount(APP);
    await waitTime();
    expect(wrapper.contains('.ux-upload-list-item-name')).toBe(true);
    wrapper.destroy();
  });


  it('When the delete button is clicked, the file should be deleted', async () => {
    const fileList = [createFile('js')];
    const APP = {
      render() {
        return (
          <div >
            <UxUpload
              name='abc'
              fileList={fileList}
              action={actionUrl} >
              <button
                ref='button'
                icon='upload' > Click
                to
                        Upload </button>
              <span
                style='margin-left:8px' > this
                is
                upload
                        tip </span>
            </UxUpload >
          </div>
        );
      },
    };
    const wrapper = mount(APP);
    await Vue.nextTick();
    const deleteBtn = wrapper.find('.ux-upload-list-item-ops');
    deleteBtn.find('i').trigger('click');
    await Vue.nextTick();
    expect(wrapper.contains('.ux-upload-list-item-name')).toBe(false);
    wrapper.destroy();
  });


  it('should  render correctly with type select or drag', async () => {
    const type = ['select', 'drag'];
    type.forEach(async (type) => {
      const APP = {
        template: `
        <UxUpload
          v-model="fileList"
          type=${type}
          :show-upload-list=${false}
          action=${actionUrl}
          list-type="picture"
            >
          <button icon="upload">Click to Upload</button>
        </UxUpload>
      `,
        components: {
          UxUpload,
        },
        data() {
          return {
            fileList: [],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      expect(wrapper.contains('input')).toBe(true);
      wrapper.destroy();
    });
  });


  it('render render correctly while this fileList was changed ', async () => {
    const wrapper = mount({
      template: `
                <div>
                  <UxUpload
                    v-model="fileList"
                    :on-preview="onPreview"
                    action=${actionUrl}
                    list-type="picture"
                  >
                <button>Click to Upload</button>
                 </UxUpload>
              </div>
              `,
      components: { UxUpload },
      data() {
        return {
          fileList: [
            {
              name: 'xxx.png',
              status: 'success',
            },
            {
              name: 'yyy.png',
              status: 'uploading',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              name: 'ccc.png',
              status: 'error',
              response: '上传错误',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
          isPreview: false,
          previewUrl: null,
        };
      },
      methods: {
        onPreview(file) {
          const { thumbUrl, url } = file;
          if (thumbUrl || url) {
            this.isPreview = true;
            this.previewUrl = thumbUrl || url;
          }
        },
      },
    });
    const { vm } = wrapper;
    vm.fileList.push({
      name: 'xxx.png',
      status: 'success',
    });
    await waitTime();
    await Vue.nextTick();
    const inputBtn = wrapper.find('input');
    inputBtn.trigger('ready');
    expect(wrapper.findAll('.ux-upload-list-item-name').length).toBe(4);
    wrapper.destroy();
  });

  it('show support moutiple select', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
    });
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file, file];
    await waitTime();
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
    await Vue.nextTick();
    expect(wrapper.findAll('.ux-upload-list-item-name').length).toBe(2);
  });


  it('beforeUpload should be called before upload', async () => {
    const fileName = 'demo.png';
    const beforeUpload = jest.fn().mockReturnThis(new Promise((resolve, reject) => {
      resolve(true);
    }));
    const beforeReady = jest.fn().mockReturnThis(new Promise((resolve, reject) => {
      resolve(true);
    }));
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :before-upload="onBeforeUpload"
                  :before-ready="onBeforeReady"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      methods: {
        onBeforeUpload: beforeUpload,
        onBeforeReady: beforeReady,
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = fileName;
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
    await Vue.nextTick();
    expect(beforeUpload).toBeCalled();
    expect(beforeReady).toBeCalled();
  });

  it('The upload should be stopped when false is returned', async () => {
    const fileName = 'demo.png';
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :before-upload="onBeforeUpload"
                  :before-ready="onBeforeReady"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      methods: {
        onBeforeUpload(file) {
          expect(file.name).toBe(fileName);
          return false;
        },
        onBeforeReady(selectedFiles) {
          return false;
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = fileName;
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('The upload should continue when true is returned', async () => {
    const fileName = 'demo.png';
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :before-upload="onBeforeUpload"
                  :before-ready="onBeforeReady"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      methods: {
        onBeforeUpload(file) {
          expect(file.name).toBe(fileName);
          return true;
        },
        onBeforeReady(selectedFiles) {
          return true;
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = fileName;
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('The upload should continue when true is returned', async () => {
    const fileName = 'demo.png';
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :before-upload="onBeforeUpload"
                  :before-ready="onBeforeReady"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      methods: {
        onBeforeUpload(file) {
          expect(file.name).toBe(fileName);
          return Promise.resolve(true);
        },
        onBeforeReady(selectedFiles) {
          return Promise.resolve(true);
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = fileName;
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('Test the custom request', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :custom-request="customRequest"
                  @change="change"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      data() {
        return {
          customRequest: successRequest
        };
      },
      methods: {
        change(uploadedFile) {
          expect(uploadedFile.file.name).toBe('demo.png');
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('Test the custom request', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :custom-request="customRequest"
                  @change="change"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      data() {
        return {
          customRequest: progressRequest
        };
      },
      methods: {
        change(uploadedFile) {
          expect(uploadedFile.file.name).toBe('demo.png');
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('Test the custom request', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :custom-request="customRequest"
                  @change="change"
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      data() {
        return {
          customRequest: errorRequest
        };
      },
      methods: {
        change(uploadedFile) {
          if (uploadedFile.file.status === 'uploading') {
            expect(uploadedFile.file.error).toBe('error');
          }
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
  });

  it('onProgress should be called while the upload progress changing', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  :custom-request="customRequest"
                  @progress="onProgress"
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      data() {
        return {
          customRequest: successRequest
        };
      },
      methods: {
        onProgress(e, file, fileList) {
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
    wrapper.find('button').trigger('click');
  });
});
