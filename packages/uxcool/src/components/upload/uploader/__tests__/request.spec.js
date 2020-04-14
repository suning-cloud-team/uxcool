import request from '.././request';
import { actionUrl } from "./mock";

let open, send, onload, onerror;

function createXHRmock({ responseText }) {
  open = jest.fn();

  // be aware we use *function* because we need to get *this* 
  // from *new XmlHttpRequest()* call
  send = jest.fn().mockImplementation(function () {
    onload = this.onload.bind(this);
    onerror = this.onerror.bind(this);
  });

  const xhrMockClass = function () {
    return {
      open,
      send,
      readyState: 4,
      upload: {
      },
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
    createXHRmock({responseText});
    const Option = {
      action:actionUrl,
      onProgress:jest.fn(),
      data:new Object({name:"demo.json"}),
      fileName:"demo.json",
      onSuccess:jest.fn(),
      onError:jest.fn(),
      headers:{
        "X-Requested-With":"XMLHttpRequest"
      }
    }
    request(Option);
    onload();
  })
  it("test resquest responseTest null", () => {
    const responseText = "";
    createXHRmock({ responseText });
    const Option = {
      action: actionUrl,
      onProgress: jest.fn(),
      data: new Object({ name: "demo.json" }),
      fileName: "demo.json",
      onSuccess: jest.fn(),
      onError: jest.fn(),
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }
    request(Option);
    onload();
  })
})


