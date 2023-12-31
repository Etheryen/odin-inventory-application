'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { baseURL } from '@/app/util/baseUrl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Item } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const itemSchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().min(2).max(128),
  price: z.number().positive(),
  categoryId: z.string(),
});

type ItemSchema = z.infer<typeof itemSchema>;

type ItemFormProps = { categories: Category[] } & (
  | {
      action: 'add';
      item?: undefined;
    }
  | {
      action: 'update';
      item: Item;
    }
);

export const ItemForm = ({ categories, action, item }: ItemFormProps) => {
  const defaultValues = action === 'update' ? item : {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });

  const router = useRouter();

  const actions = {
    add: async (newItem: ItemSchema) => {
      const result = await fetch(`${baseURL}/api/items`, {
        method: 'POST',
        body: JSON.stringify(newItem),
      });
      const responseData: { id: string } = await result.json();
      router.push(`/items/${responseData.id}`);
    },
    update: async (updatedItem: ItemSchema) => {
      if (action !== 'update') return;

      const result = await fetch(`${baseURL}/api/items/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
      });
      const responseData: { id: string } = await result.json();
      router.push(`/items/${responseData.id}`);
    },
  };

  const onSubmit: SubmitHandler<ItemSchema> = actions[action];

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
      <div className="space-y-1.5">
        <Label htmlFor="price">Price (USD)</Label>
        <Input
          id="price"
          placeholder="Price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
        />
      </div>
      {errors.price && (
        <div className="text-red-600 font-medium">{errors.price.message}</div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="category">Choose a category</Label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errors.categoryId && (
        <div className="text-red-600 font-medium">
          {errors.categoryId.message}
        </div>
      )}

      <Button className="block">Submit</Button>
    </form>
  );
};
