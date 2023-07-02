import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { withAxios } from '../util/axios';
import { Category } from '@prisma/client';

export async function CategoryList() {
  const result = await withAxios.get('/api/categories');
  const data = result.data as Category[];

  if (data.length === 0)
    return (
      <div className="opacity-50 text-2xl font-extralight">No items found</div>
    );

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
