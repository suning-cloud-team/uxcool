import { isPlainObject, isFunction } from '@suning/v-utils';

function getError(option, xhr) {
  const msg = `cannot post ${option.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default function ajax(option = {}) {
  const {
    action,
    data,
    fileName,
    file,
    headers,
    withCredentials,
    onProgress,
    onSuccess,
    onError,
  } = option;
  const xhr = new XMLHttpRequest();

  if (isFunction(onProgress) && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        // eslint-disable-next-line
        e.percent = e.loaded / e.total * 100;
      }
      onProgress(e);
    };
  }

  const formData = new FormData();

  if (isPlainObject(data)) {
    Object.keys(option.data).forEach((k) => {
      formData.append(k, option.data[k]);
    });
  }

  formData.append(fileName, file);

  xhr.onerror = onError;

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      onSuccess(getBody(xhr), xhr);
    } else {
      onError(getError(option, xhr), getBody(xhr));
    }
  };

  xhr.open('post', action, true);

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const customHeaders = headers || {};

  if (customHeaders['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  Object.keys(customHeaders).forEach((k) => {
    const header = customHeaders[k];
    if (header) {
      xhr.setRequestHeader(k, header);
    }
  });

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
