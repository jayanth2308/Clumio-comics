// api.js
import axios from 'axios';
import md5 from 'md5';

const publicKey = '2073298c3db5d3ee6f9cdc7bfe5534ee';
const privateKey = '03a8142fc8c2dc710a010ebdd468a70fd924df2e';

const baseURL = 'https://gateway.marvel.com/v1/public/';
const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + privateKey + publicKey);

  config.params = {
    ...config.params,
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };

  return config;
});

export default api;
