import { ItemForm } from '@/app/components/forms/item-form';
import { baseURL } from '@/app/util/baseUrl';
import { Category, Item } from '@prisma/client';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await fetch(`${baseURL}/api/items/${params.id}`);
  const data: Item = await result.json();

  return {
    title: `Update ${data.name}`,
    description: `Update ${data.name} item, ${data.description}`,
  };
}

export default async function ItemUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const [itemResult, categoriesResult] = await Promise.all([
    fetch(`${baseURL}/api/items/${params.id}`),
    fetch(`${baseURL}/api/categories`),
  ]);

  let itemData: Item;
  let categoriesData: Category[];

  [itemData, categoriesData] = await Promise.all([
    itemResult.json(),
    categoriesResult.json(),
  ]);

  return (
    <main className="space-y-16">
      <div className="text-6xl font-black text-center p-8">
        Update {itemData.name}
      </div>
      <div className="flex justify-center">
        <ItemForm action="update" categories={categoriesData} item={itemData} />
      </div>
    </main>
  );
}
