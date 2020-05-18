export const successRequest = ({ onSuccess }) => {
  onSuccess('success', new XMLHttpRequest());
};

export const errorRequest = ({ onError }) => {
  onError('error', null);
};

export const progressRequest = ({ onProgress }) => {
  onProgress({});
};
