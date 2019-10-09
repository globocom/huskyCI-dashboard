import axios from "axios";

const buildHeaders = async () => {
  const token = "===";

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };
  if (token) {
    headers = { ...headers, Authorization: ` Bearer ${token}` };
  }
  return headers;
};

const baseURL = "http://myurl.com.br";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response);
  error.response = response.json();
  throw error;
};
const parseJSON = response => response;

const api = {
  put: async (url, data) => {
    const headers = await buildHeaders();
    const response = await axios
      .put(baseURL + url, data, {
        timeout: 10000,
        headers,
      })
      .then(checkStatus)
      .then(parseJSON);
    return response;
  },
  get: async url => {
    const headers = await buildHeaders();
    const response = await axios
      .get(
        baseURL + url,
        {},
        {
          timeout: 10000,
          headers,
        }
      )
      .then(checkStatus)
      .then(parseJSON);
    return response;
  },
  post: async (url, data) => {
    const headers = await buildHeaders();
    const response = await axios
      .post(baseURL + url, data, {
        timeout: 10000,
        headers,
      })
      .then(checkStatus)
      .then(parseJSON);
    return response;
  },
  patch: async (url, data) => {
    const headers = await buildHeaders();
    const response = await axios
      .patch(baseURL + url, data, {
        timeout: 10000,
        headers,
      })
      .then(checkStatus)
      .then(parseJSON);
    return response;
  },
  delete: async url => {
    const headers = await buildHeaders();
    const response = await axios
      .delete(baseURL + url, {
        timeout: 10000,
        headers,
      })
      .then(checkStatus)
      .then(parseJSON);
    return response;
  },
};

export default api;
