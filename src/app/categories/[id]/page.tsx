import { Category, Item } from '@prisma/client';
import { ItemList } from './item-list';
import { baseURL } from '@/app/util/baseUrl';
import { Button } from '@/app/components/ui/button';
import { CategoryActions } from './category-actions';

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
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
    <main className="space-y-16 flex-grow flex-col flex">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">{category.name}</div>
        <div className="text-2xl text-center">{category.description}</div>
      </div>
      <div className="flex justify-center">
        <ItemList items={items} />
      </div>
      <div className="flex justify-end items-end flex-grow p-12 gap-4">
        <CategoryActions categoryId={params.id} />
      </div>
    </main>
  );
}
