import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showSuccessToast = (msg) => {
  toast(msg, { ...toastConfig, type: 'success' });
};

export const showErrorToast = (msg) => {
  toast(msg, { ...toastConfig, type: 'error' });
};

export { ToastContainer, Bounce, toast };
