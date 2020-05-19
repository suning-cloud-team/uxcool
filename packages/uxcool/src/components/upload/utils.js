import { isArray } from '@cloud-sn/v-utils';

export function isXHRFileUpload() {
  return !!window.FileReader;
}

export function noop() {}

let seed = 0;
export function getUID() {
  seed += 1;
  return `$$upload-${Date.now()}-${seed}`;
}

const { slice } = Array.prototype;
const { toString } = Object.prototype;

export { slice, toString };

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function attrAccept(file, acceptedFiles) {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',');
    const fileName = file.name || '';
    const mimeType = file.type || '';
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some((type) => {
      const validType = type.trim();
      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
}

export function traverseFileTree(files, callback, isAccepted) {
  const recursive = (item, path) => {
    const nPath = path || '';
    if (item.isFile) {
      item.file((file) => {
        if (isAccepted(file)) {
          callback([file]);
        }
      });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();

      dirReader.readEntries((entries) => {
        for (let i = 0, l = entries.length; i < l; i += 1) {
          const entrieItem = entries[i];
          recursive(entrieItem, `${nPath}${item.name}/`);
        }
      });
    }
  };
  for (let i = 0, l = files.length; i < l; i += 1) {
    const file = files[i];
    recursive(file.webkitGetAsEntry());
  }
}

export function normalizeFile(file) {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFile: file,
  };
}

export function handleFileList(fileList = []) {
  if (isArray(fileList)) {
    return fileList.map((file) => {
      const nFile = file;
      nFile.status = nFile.status || 'success';
      nFile.uid = file.uid || file.uid === 0 ? file.uid : getUID();
      return nFile;
    });
  }
  return [];
}

export function getFile(file, fileList = []) {
  return fileList.filter((v) => v.uid === file.uid)[0];
}

const extname = (url) => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];
export function isImageUrl(file) {
  if (imageTypes.indexOf(file.type) > -1) {
    return true;
  }
  const url = file.thumbUrl || file.url;
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
    return true;
  } if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
}

export const BlobSlice = window.Blob
  ? Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice
  : null;

const isSupportBlobSlice = !!BlobSlice;

export function isCanChunkUpload(isChunk) {
  return isSupportBlobSlice && isChunk;
}

export function getChunkUploadBytes(xhr) {
  const range = xhr.getResponseHeader('Range');
  const parts = range && range.split('-');
  const upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
  return upperBytesPos && upperBytesPos + 1;
}
