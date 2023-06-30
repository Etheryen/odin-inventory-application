import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { withAxios } from '@/app/util/axios';
import { Category } from '@prisma/client';

export async function CategoryList() {
  const result = await withAxios.get('/api/categories');
  const data = result.data as Category[];

  return (
    <ul className="flex justify-center flex-wrap gap-8 max-w-sm">
      {data.map((category) => (
        <li key={category.id}>
          <ListItemLink href={`/categories/${category.id}`}>
            {category.name}
          </ListItemLink>
        </li>
      ))}
    </ul>
  );
}
