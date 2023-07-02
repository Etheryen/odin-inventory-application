'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { redirect } from 'next/navigation';
import { baseURL } from '@/app/util/baseUrl';
import { useRouter } from 'next/navigation';

const categorySchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().min(2).max(60),
});

type CategorySchema = z.infer<typeof categorySchema>;

const NewCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    const result = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const responseData: { id: string } = await result.json();
    router.push(`/categories/${responseData.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name" {...register('name')} />
      </div>
      {errors.name && (
        <div className="text-red-600 font-medium">{errors.name.message}</div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Description"
          {...register('description')}
        />
      </div>
      {errors.description && (
        <div className="text-red-600 font-medium">
          {errors.description.message}
        </div>
      )}

      <Button className="block">Submit</Button>
    </form>
  );
};

export default function NewCategoryPage() {
  return (
    <main className="space-y-16">
      <div className="text-6xl font-black text-center p-8">New category</div>
      <div className="flex justify-center">
        <NewCategoryForm />
      </div>
    </main>
  );
}
