'use client';

import { Button } from '@/app/components/ui/button';
import { baseURL } from '@/app/util/baseUrl';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function CategoryActions({ categoryId }: { categoryId: string }) {
  const router = useRouter();

  const deleteCategory = async () => {
    const response = await fetch(`${baseURL}/api/categories/${categoryId}`, {
      method: 'DELETE',
    });
    const body = await response.json();

    if (!body.message) return;
    router.push('/');
  };

  const handleDelete = async () => {
    toast.promise(deleteCategory(), {
      loading: 'Deleting...',
      success: <b>Deleted successfully!</b>,
      error: (
        <span>
          <b>Error deleting:</b> make sure category has no items
        </span>
      ),
    });
  };

  return (
    <>
      <Button variant={'secondary'}>Update</Button>
      <Button onClick={handleDelete} variant={'destructive'}>
        Delete
      </Button>
    </>
  );
}
