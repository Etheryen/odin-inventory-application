import axios from 'axios';

export const withAxios = axios.create({
  baseURL: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://127.0.0.1:3000',
});
