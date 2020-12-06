import { toast } from 'react-toastify';

export const infoToast = message => {
  toast.info(message, { autoClose: 5000, hideProgressBar: true });
};

export const errorToast = message => {
  toast.error(message, { autoClose: 5000, hideProgressBar: true });
};
