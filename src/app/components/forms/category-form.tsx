'use client';

import { Button } from '../ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Category } from '@prisma/client';
import { baseURL } from '@/app/util/baseUrl';

const categorySchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().min(2).max(128),
});

type CategorySchema = z.infer<typeof categorySchema>;

type CategoryFormProps =
  | {
      action: 'add';
      category?: undefined;
    }
  | {
      action: 'update';
      category: Category;
    };

export const CategoryForm = ({ action, category }: CategoryFormProps) => {
  const defaultValues = action === 'update' ? category : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const router = useRouter();

  const actions = {
    add: async (newCategory: CategorySchema) => {
      const result = await fetch(`${baseURL}/api/categories`, {
        method: 'POST',
        body: JSON.stringify(newCategory),
      });
      const responseData: { id: string } = await result.json();
      router.push(`/categories/${responseData.id}`);
    },
    update: async (updatedCategory: CategorySchema) => {
      if (action !== 'update') return;

      const result = await fetch(`${baseURL}/api/categories/${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCategory),
      });
      const responseData: { id: string } = await result.json();
      router.push(`/categories/${responseData.id}`);
    },
  };

  const onSubmit: SubmitHandler<CategorySchema> = actions[action];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder={'Name'} {...register('name')} />
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
