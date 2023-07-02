import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { getAllCategories } from '@/app/lib/apiCalls';

export async function CategoryList() {
  const data = await getAllCategories();
  console.log(data);

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
