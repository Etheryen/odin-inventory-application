import { Category } from '@prisma/client';
import { withAxios } from '../util/axios';

export const getAllCategories = async () => {
  const result = await withAxios.get('/api/categories');
  const data = result.data as Category[];
  return data;
};
