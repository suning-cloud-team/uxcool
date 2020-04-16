import request from '.././request';
import { actionUrl } from "./mock";

const oldXMLHttpRequest = window.XMLHttpRequest;
let open, send, onload, onerror, abort, upload;

function createXHRmock({ responseText, status }) {
  open = jest.fn();
  abort = jest.fn();

  send = jest.fn().mockImplementation(function () {
    onload = this.onload.bind(this);
    onerror = this.onerror.bind(this);
  });
  upload = {
    onprogress: jest.fn()
  };

  const xhrMockClass = function () {
    return {
      open,
      send,
      readyState: 4,
      abort,
      upload,
      status: status || 200,
      setRequestHeader: jest.fn(),
      withCredentials: true,
      responseText: responseText,
      getResponseHeader: jest.fn()
    };
  };
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}

describe('Request', () => {

  it("test resquest", () => {
    const onProgress = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const responseText = JSON.stringify(
      [
        {
          title: 'test post'
        },
        {
          tile: 'second test post'
        }
      ]
    );
    createXHRmock({ responseText, status: 200 });
    const Option = {
      action: actionUrl,
      onProgress,
      data: new Object({ name: "demo.json" }),
      fileName: "demo.json",
      withCredentials: true,
      onSuccess,
      onError,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    request(Option);
    onload();
    expect(onSuccess).toBeCalled();
  })

  it("test resquest responseTest null", () => {
    const responseText = "";
    const onProgress = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    createXHRmock({ responseText, status: 200 });
    const Option = {
      action: actionUrl,
      onProgress,
      data: new Object({ name: "demo.json" }),
      fileName: "demo.json",
      onSuccess,
      onError,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    request(Option);
    onload();
    expect(onSuccess).toBeCalled();
    upload.onprogress({loaded:0,total:100})
    expect(onProgress).toBeCalled();
  })

  it("test resquest responseTest non jsonString", () => {
    const responseText = "string";
    const onProgress = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();
    createXHRmock({ responseText, status: 404 });
    const Option = {
      action: actionUrl,
      onProgress,
      data: new Object({ name: "demo.json" }),
      fileName: "demo.json",
      onSuccess,
      onError,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    request(Option).abort();
    onload();
    expect(onError).toBeCalled();
    expect(abort).toBeCalled();
  })

  window.XMLHttpRequest = oldXMLHttpRequest ;
})


