import { Button } from '@/app/components/ui/button';
import { baseURL } from '@/app/util/baseUrl';
import { formatPrice } from '@/app/util/formatting';
import { Item } from '@prisma/client';

export default async function ItemPage({ params }: { params: { id: string } }) {
  const result = await fetch(`${baseURL}/api/items/${params.id}`);
  const data: Item = await result.json();

  const formattedPrice = formatPrice(data.price);

  return (
    <main className="space-y-16">
      <div className="space-y-12 p-8">
        <div className="text-6xl font-black text-center">{data.name}</div>
        <div className="text-2xl text-center">{data.description}</div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="text-3xl p-4 font-mono mt-1">{formattedPrice}</div>
        <Button>Order</Button>
      </div>
    </main>
  );
}
