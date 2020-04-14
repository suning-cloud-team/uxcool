// import mock from 'xhr-mock';

const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  upload: {
  },
  setRequestHeader: jest.fn(),
  withCredentials: true,
  responseText: JSON.stringify(
    [
      {
        title: 'test post'
      }
    ]
  ),
  getResponseHeader: jest.fn()
};
const oldXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = jest.fn(() => mockXHR);

export function setup() {
  window.XMLHttpRequest = jest.fn(() => mockXHR);
}

export function teardown(){
  window.XMLHttpRequest = oldXMLHttpRequest;
}

export const actionUrl = "http://www.mocky.io/v2/5e93d62f3000009100156c5f";
