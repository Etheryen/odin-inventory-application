import { CategoryForm } from '@/app/components/forms/category-form';
import { baseURL } from '@/app/util/baseUrl';
import { Category } from '@prisma/client';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await fetch(`${baseURL}/api/categories/${params.id}`);
  const data: Category = await result.json();

  return {
    title: `Update ${data.name}`,
    description: `Update ${data.name} category, ${data.description}`,
  };
}

export default async function CategoryUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const result = await fetch(`${baseURL}/api/categories/${params.id}`);
  const data: Category = await result.json();

  return (
    <main className="space-y-16">
      <div className="text-6xl font-black text-center p-8">
        Update {data.name}
      </div>
      <div className="flex justify-center">
        <CategoryForm action="update" category={data} />
      </div>
    </main>
  );
}
