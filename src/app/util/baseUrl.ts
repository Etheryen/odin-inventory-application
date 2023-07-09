const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;

export const baseURL = vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3000';
