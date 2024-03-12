import { toast } from 'react-toastify';

type ToastType = 'error' | 'warning' | 'success';

export const toastMsg = (type: ToastType, msg: string) => {
  toast[type](msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
