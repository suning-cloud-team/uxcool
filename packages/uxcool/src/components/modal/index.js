import UxModal from './modal.vue';
import Confirm from './confirm';

export default UxModal;

const types = [
  {
    type: 'success',
    iconType: 'ok_circle',
    okCancel: false,
  },
  {
    type: 'info',
    iconType: 'info_circle',
    okCancel: false,
  },
  {
    type: 'error',
    iconType: 'close_circle',
    okCancel: false,
  },
  {
    type: 'warning',
    iconType: 'exclamation_circle',
    okCancel: false,
  },
  {
    type: 'warn',
    iconType: 'exclamation_circle',
    okCancel: false,
  },
  {
    type: 'confirm',
    okCancel: true,
  },
];

types.forEach((v) => {
  UxModal[v.type] = (props = { title: '', content: '' }) => Confirm({ ...v, ...props });
});

UxModal.config = (props = {}) => {
  Confirm.config(props);
};

UxModal.destroy = () => {
  Confirm.destroy();
};
