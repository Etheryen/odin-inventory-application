import { withAxios } from '@/app/util/axios';
import { Category } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';

export default async function CategoryList() {
  const result = await withAxios.get('/api/categories');
  const data = result.data as Category[];

  return (
    <ul>
      {data.map((category) => (
        <li key={category.id}>
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
}
