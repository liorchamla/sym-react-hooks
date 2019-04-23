import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Une erreur inattendue s'est produite :'(");
  }

  return Promise.reject(error.response);
});

export default axios;
