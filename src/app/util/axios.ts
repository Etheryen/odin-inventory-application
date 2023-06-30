import axios from 'axios';

export const withAxios = axios.create({
  baseURL: process.env.VERCEL_URL ?? 'http://localhost:3000',
});
