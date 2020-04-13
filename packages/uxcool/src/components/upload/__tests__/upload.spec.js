import { mount, mountPickerFactory, waitTime } from '@suning/v-test-utils';
import Vue from 'vue';
import createFile from './util/file';
import UxUpload from '../index';

describe('Upload', () => {
  it('should  render correctly', async () => {
    const APP = {
      render() {
        return (
          <div>
            <UxUpload
            name = 'abc'
            action = 'http://dip.cnsuning.com/service/1554195600131/1.0/upload' >
              <button
                ref = 'button'
                icon = 'upload' > Click to Upload </button>
              <span
                  style = 'margin-left:8px' > this is upload tip </span>
            </UxUpload >
          </div>
          )
          },
        };
        const wrapper = mount(APP);
        await waitTime();
        expect(wrapper.contains('input')).toBe(true);
      });
    
  it('渲染文件列表', async () => {
        let fileList = [createFile('js')];
        const APP = {
                  render() {
                return (
                  <div>
                      <UxUpload
                      name = 'abc'
                      fileList = {fileList}
                      action = 'http://dip.cnsuning.com/service/1554195600131/1.0/upload' >
                    <button
                      ref = 'button'
                      icon = 'upload' > Click to Upload </button>
                  <span
                      style = 'margin-left:8px' > this is upload tip </span>
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
                                action = 'http://dip.cnsuning.com/service/1554195600131/1.0/upload' >
                          <button
                                ref = 'button'
                                icon = 'upload' > Click
                                to
                        Upload </button>
                        <span
                                style = 'margin-left:8px' > this
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
        
        
  it('should  render correctly', async () => {
    const APP = {
      template: `
        <UxUpload
          v-model="fileList"
          action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
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
        });
      
  it('render components with fileList ', async () => {
    const wrapper = mount({
      template: `
                <div>
                  <UxUpload
                    v-model="fileList"
                    :on-preview="onPreview"
                    action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
                    list-type="picture"
                  >
                <button>Click to Upload</button>
                 </UxUpload>
              </div>
              `,
      components: {UxUpload},
      data() {
        return {
                fileList: [
            {
                name: 'xxx.png',
              status: 'success',
            },
            {
                name: 'yyy.png',
              status: 'success',
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
          const {thumbUrl, url} = file;
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
      await  Vue.nextTick();
      console.log(wrapper.html())
      expect(wrapper.findAll('.ux-upload-list-item-name').length).toBe(4);
          });
        
  it('moutiple select', async () => {
    const wrapper = mount({
      template: `
              <div>
                <UxUpload
                  action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
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
                action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
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
});
