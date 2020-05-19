import {
  isXHRFileUpload, noop, attrAccept, traverseFileTree, handleFileList, normalizeFile, getFile, isImageUrl, isCanChunkUpload, BlobSlice, getChunkUploadBytes
} from '../utils';

describe('Upload-Utils', () => {
  it('XHRFileUpload should return if support window.FileReader', () => {
    expect(isXHRFileUpload() === !!window.FileReader).toBe(true);
  });

  it('test attrAccept', () => {
    const file = {
      name: 'demo.js',
      type: 'js'
    };
    const acceptedFiles = ['js'];
    expect(attrAccept(file, acceptedFiles)).toBe(true);
  });

  it('test attrAccept', () => {
    const file = null;
    const acceptedFiles = ['js'];
    expect(attrAccept(file, acceptedFiles)).toBe(true);
  });

  it('test attrAccept image/*', () => {
    const file = {
      name: 'demo.png',
      type: 'image/*'
    };
    const acceptedFiles = ['js', '.js', '.png', 'image/*'];
    expect(attrAccept(file, acceptedFiles)).toBe(true);
  });

  it('test attrAccept image/*', () => {
    const file = {
      name: 'demo.png',
      type: 'image/*'
    };
    const acceptedFiles = 'js,png,.js,image/*';
    expect(attrAccept(file, acceptedFiles)).toBe(true);
  });

  it('test isCanChunkUpload', () => {
    expect(normalizeFile({}).percent).toBe(0);
    expect(isCanChunkUpload(true)).toEqual(!!BlobSlice);
  });

  it('test getChunkUploadBytes', () => {
    const xhr = new XMLHttpRequest();
    expect(getChunkUploadBytes(xhr)).toBe(null);
  });

  it('test noop', () => {
    expect(noop()).toBeUndefined;
  });

  it('test isImageUrl', () => {
    const imageFile = { type: 'png' };
    expect(isImageUrl(imageFile)).toBe(true);
    const dataFile = {
      url: 'data:'
    };
    expect(isImageUrl(dataFile)).toBeFalsy;
    expect(isImageUrl({ url: './png' })).toBeFalsy;
    expect(isImageUrl({})).toBeTruthy;
  });

  it('test getFile', () => {
    expect(Array.isArray(handleFileList({}))).toBeTruthy;
    expect(getFile({}, [])).toBeUndefined;
  });

  it('test traverseFileTree', () => {
    const isAccept = () => true;
    const callback = jest.fn();
    const files = [
      {
        webkitGetAsEntry() {
          return {
            isFile: true,
            file(callback) { callback(); }
          };
        }
      },
      {
        webkitGetAsEntry() {
          return {
            isDirectory: true,
            createReader() {
              return {
                readEntries(callback) {
                  callback([{
                    isFile: true,
                    file(callback) { callback(); }
                  }]);
                }

              };
            }
          };
        }
      }
    ];
    traverseFileTree(files, callback, isAccept);
    expect(callback).toBeCalledTimes(2);
  });
});
