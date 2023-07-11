import { ItemForm } from '@/app/components/forms/item-form';
import { baseURL } from '@/app/util/baseUrl';
import { Category } from '@prisma/client';

export const dynamic = 'force-dynamic';

const NewItemPage = async () => {
  const result = await fetch(`${baseURL}/api/categories`);
  const data: Category[] = await result.json();

  return (
    <main className="space-y-16">
      <div className="text-6xl font-black text-center p-8">New item</div>
      <div className="flex justify-center">
        <ItemForm categories={data} action="add" />
      </div>
    </main>
  );
};

export default NewItemPage;
