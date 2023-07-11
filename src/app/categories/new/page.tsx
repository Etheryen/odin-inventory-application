import { CategoryForm } from '@/app/components/forms/category-form';

export default function NewCategoryPage() {
  return (
    <main className="space-y-16">
      <div className="text-6xl font-black text-center p-8">New category</div>
      <div className="flex justify-center">
        <CategoryForm action="add" />
      </div>
    </main>
  );
}
