'use client';

import { Button } from '@/app/components/ui/button';
import { baseURL } from '@/app/util/baseUrl';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ItemActionsProps {
  itemId: string;
  categoryId: string | null;
}

export function ItemActions({ itemId, categoryId }: ItemActionsProps) {
  const router = useRouter();

  const deleteItem = async () => {
    const response = await fetch(`${baseURL}/api/items/${itemId}`, {
      method: 'DELETE',
    });
    const body = await response.json();

    if (!body.message) return;
    router.push(`/categories/${categoryId}`);
  };

  const handleDelete = async () => {
    toast.promise(deleteItem(), {
      loading: 'Deleting...',
      success: <b>Deleted successfully!</b>,
      error: <b>Error deleting</b>,
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
