import { Category, Item } from '@prisma/client';
import { ItemList } from './item-list';
import { baseURL } from '@/app/util/baseUrl';

export default async function CategoryPage({
  params,
}: {
  params: { id: number };
}) {
  const result = await fetch(`${baseURL}/api/categories/${params.id}`);

  const data: Category = await result.json();

  return (
    <main className="space-y-16">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">{data.name}</div>
        <div className="text-2xl text-center">{data.description}</div>
      </div>
      <div className="flex justify-center">
        <ItemList categoryId={data.id} />
      </div>
    </main>
  );
}
