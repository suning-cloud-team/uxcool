import { mount, waitTime } from '@suning/v-test-utils';
import { actionUrl } from "./mock";
import Vue from 'vue';
import createFile from './util/file';
import UxUpload from '../index';
import List from '../list';
import { errorRequest, successRequest, progressRequest } from './requests';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  upload:{
  },
  setRequestHeader:jest.fn(),
  withCredentials: true,
  responseText: JSON.stringify(
    [
      {
        title: 'test post'
      },
      {
        tile: 'second test post'
      }
    ]
  ),
  getResponseHeader:jest.fn()
};
const oldXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = jest.fn(() => mockXHR);




describe('Upload', () => {
  describe("List", () => {
    it('should  render correctly,缩略图可点击', async () => {
      const type = ["select", "drag"];
      type.forEach(async type => {
        const APP = {
          template: `
        <UxUpload
          v-model="fileList"
          type=${type}
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
                  url: "http://www.suning.com"
                },
                {
                  uid: Math.random().toString(16),
                  name: 'demo.png',
                  status: 'uploading',
                  response: {},
                  error: {},
                  linkProps: { download: 'http://www.suning.com' },
                  url: "http://www.suning.com"
                },
                {
                  uid: Math.random().toString(16),
                  name: 'demo.png',
                  status: 'success',
                  response: {},
                  error: {},
                  linkProps: { download: 'http://www.suning.com' },
                  url: "http://www.suning.com"
                }
              ],
            };
          },
        };
        const wrapper = mount(APP);
        await waitTime();
        wrapper.find(".ux-upload-list-item-thumbnail").trigger("click");
        wrapper.find("span.ux-upload-list-item-ops > i").trigger("click");
        await Vue.nextTick();
        expect(wrapper.findAll(".ux-upload-list-item-thumbnail").length).toBe(2);
      })

    });
    it('should  render correctly,list点击继续上传', async () => {
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
                url: "http://www.suning.com"
              },
              {
                uid: Math.random().toString(16),
                name: 'demo.png',
                status: 'ready',
                response: {},
                error: {},
                linkProps: { download: 'http://www.suning.com' },
                url: "http://www.suning.com"
              }
            ],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      wrapper.find(".ux-upload-list-item-thumbnail").trigger("click");
      wrapper.find(".ux-upload-list-item-ops > i").trigger("click");
      wrapper.find(".fu-play_circle_o").trigger("click");
      await Vue.nextTick();
      expect(wrapper.findAll(".fu-play_circle_o").length).toBe(1);
      expect(wrapper.findAll(".fu-pause_circle_o").length).toBe(1);

    });
    it('should  render correctly,picture-card uploading状态', async () => {
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
                url: "http://www.suning.com"
              }
            ],
          };
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      await Vue.nextTick();
      expect(wrapper.findAll(".ux-upload-list-item-thumbnail").length).toBe(0);

    });
    it("属性含有默认值", async () => {
      const App = {
        template: `<List/>`,
        components: { List }
      }
      const wrapper = mount(App);
      await waitTime();
      expect(Array.isArray(wrapper.vm.$children[0].$props.list)).toBe(true);
      expect(typeof wrapper.vm.$children[0].$props.locale).toBe("object");
    })
  })
  it('should  render correctly', async () => {
    const listType = ["text", "picture", "picture-card"];
    listType.forEach(async type => {
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
          )
        },
      };
      const wrapper = mount(APP);
      await waitTime();
      expect(wrapper.contains('input')).toBe(true);
    })

  });
  it('测试submit', async () => {
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file, {
      uid: Math.random().toString(16),
      name: 'demo.png',
      status: 'ready',
      response: {},
      originFile: "string",
      error: {},
      linkProps: { download: 'http://www.suning.com' },
    }, {
        uid: Math.random().toString(16),
        name: 'demo.png',
        status: 'ready',
        response: {},
        originFile: new File([], "demo.png"),
        error: {},
        linkProps: { download: 'http://www.suning.com' },
      }]
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
          files: files,
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
    }
    const wrapper = mount(APP);
    await Vue.nextTick();
    wrapper.find("button").trigger("click");
    await waitTime();
    wrapper.vm.$children[0].submit();
    // expect(wrapper.vm.$children[0].submit).toHaveBeenCalled();
  })


  it('should  render correctly with props show-upload-list', async () => {
    const showUploadList = [true, false, { showPreviewIcon: true, showRemoveIcon: false }, { showPreviewIcon: false, showRemoveIcon: true }];
    const fileList = [
      {
        uid: Math.random().toString(16),
        name: 'demo.png',
        status: 'ready',
        response: {},
        error: {},
        linkProps: { download: 'http://www.suning.com' },
      }
    ];
    showUploadList.forEach(async showUpload => {
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
          )
        },
      };

      const wrapper = mount(APP);
      await waitTime();
      expect(wrapper.findAll('ux-upload-list-item-name').length).toBe(0);
    })

  });

  it('渲染文件列表', async () => {
    let fileList = [createFile('js')];
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
        )
      },
    };
    const wrapper = mount(APP);
    await waitTime();
    expect(wrapper.contains('.ux-upload-list-item-name')).toBe(true);
  });


  it('删除文件', async () => {
    let fileList = [createFile('js')];
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
        )

      },
    };
    const wrapper = mount(APP);
    await Vue.nextTick();
    const deleteBtn = wrapper.find('.ux-upload-list-item-ops');
    deleteBtn.find('i').trigger('click');
    await Vue.nextTick();
    expect(wrapper.contains('.ux-upload-list-item-name')).toBe(false);
  });



  it('should  render correctly,测试type', async () => {
    const type = ["select", "drag"];
    type.forEach(async type => {
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
    })

  });



  it('render components with fileList ', async () => {
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
    const vm = wrapper.vm;
    vm.fileList.push({
      name: 'xxx.png',
      status: 'success',
    });
    await waitTime();
    await Vue.nextTick();
    expect(wrapper.findAll('.ux-upload-list-item-name').length).toBe(4);
    const inputBtn = wrapper.find("input");
    inputBtn.trigger("ready");
  });

  it('moutiple select', async () => {
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
    await waitTime();
    expect(wrapper.contains('input')).toBe(true);
  });
  it('手动上传', async () => {
    const wrapper = mount({
      template: `
        <div>
                <ux-upload
                  ref="uploadRef"
                  v-model="files"
                :auto-upload="false"
                action=${actionUrl}
              >
             <button
             "class="select">选择文件</button>
           </ux-upload>
            <button class="mt-xs-2 uploadBtn" @click="upload">开始上传</button>
        </div > `,
      components: {
        UxUpload,
      },
      data() {
        return {
          files: [
            {
              name: 'yyy.png',
              status: 'success',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
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
    });

    wrapper.find('.uploadBtn').trigger('click');

  });


  it('测试change', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action=${actionUrl}
                  list-type="picture"
                  @Change=${"onChange"}
                  multiple
                  >
                  <button icon="upload">Click to Upload</button>
                </UxUpload>
              </div>`,
      components: {
        UxUpload,
      },
      methods: {
        onChange() {
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 2)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef.onChange({ target: { files } });
    expect(wrapper.contains('input')).toBe(true);
  });



  it('测试before', async () => {
    const fileName = "demo.png";
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
          return new Promise((resolve, reject) => {
            resolve(true)
          })
        },
        onBeforeReady(selectedFiles) {
          return new Promise((resolve, reject) => {
            resolve(true)
          })
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

  it('测试before false', async () => {
    const fileName = "demo.png";
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
  it('测试before true', async () => {
    const fileName = "demo.png";
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
  it('测试自定义底层成功请求', async () => {
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
        }
      },
      methods: {
        change(uploadedFile) {
          expect(uploadedFile.file.name).toBe("demo.png")

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
  it('测试自定义底层progress请求', async () => {
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
        }
      },
      methods: {
        change(uploadedFile) {
          expect(uploadedFile.file.name).toBe("demo.png")

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
  it('测试自定义底层失败请求', async () => {
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
        }
      },
      methods: {
        change(uploadedFile) {
          if (uploadedFile.file.status === "uploading") {
            expect(uploadedFile.file.error).toBe("error")
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
  it('测试上传进度改变时触发progress', async () => {
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
        }
      },
      methods: {
        onProgress(e, file, fileList) {
        }
      }
    });
    await Vue.nextTick();
    const file = new Blob([JSON.stringify({}, null, 200)], {
      type: 'application/json'
    });
    file.name = 'demo.png';
    const files = [file];
    const uploader = wrapper.vm.$children[0].$refs.uploaderRef.$refs.uploaderRef;
    uploader.onChange({ target: { files } });
    wrapper.find("button").trigger("click");
  });
});
