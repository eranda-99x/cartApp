import axios from 'axios';

const BASEURL = 'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/'
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

// Add a request interceptor
instance.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  
  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      if (response.data) return response.data;
      else {
        var message = 'We had trouble connecting to the server';
        if (response.data.message) message = response.data.message;
        return Promise.reject(response);
      }
    },
    function (error) {
      return Promise.reject(error);
    },
  );

export default instance;