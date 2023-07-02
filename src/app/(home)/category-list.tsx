import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { Category } from '@prisma/client';
import { baseURL } from '../util/baseUrl';

export async function CategoryList() {
  const result = await fetch(`${baseURL}/api/categories`);
  const data: Category[] = await result.json();

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
