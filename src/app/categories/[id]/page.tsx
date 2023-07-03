import { Category, Item } from '@prisma/client';
import { ItemList } from './item-list';
import { baseURL } from '@/app/util/baseUrl';

export default async function CategoryPage({
  params,
}: {
  params: { id: number };
}) {
  const [categoryResult, itemsResult] = await Promise.all([
    fetch(`${baseURL}/api/categories/${params.id}`),
    fetch(`${baseURL}/api/categories/${params.id}/items`, {
      cache: 'no-cache',
    }),
  ]);

  const [category, items] = await Promise.all([
    categoryResult.json() as Promise<Category>,
    itemsResult.json() as Promise<Item[]>,
  ]);

  return (
    <main className="space-y-16">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">{category.name}</div>
        <div className="text-2xl text-center">{category.description}</div>
      </div>
      <div className="flex justify-center">
        <ItemList items={items} />
      </div>
    </main>
  );
}
