import { Button } from '@/app/components/ui/button';
import { baseURL } from '@/app/util/baseUrl';
import { formatPrice } from '@/app/util/formatting';
import { Item } from '@prisma/client';
import { ItemActions } from './item-actions';

export default async function ItemPage({ params }: { params: { id: string } }) {
  const result = await fetch(`${baseURL}/api/items/${params.id}`);
  const data: Item = await result.json();

  const formattedPrice = formatPrice(data.price);

  return (
    <main className="space-y-16 flex-grow flex-col flex">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">{data.name}</div>
        <div className="text-2xl text-center">{data.description}</div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="text-3xl p-4 font-mono mt-1">{formattedPrice}</div>
        <Button>Order</Button>
      </div>
      <div className="flex justify-end items-end flex-grow p-12 gap-4">
        <ItemActions itemId={params.id} categoryId={data.categoryId} />
      </div>
    </main>
  );
}
