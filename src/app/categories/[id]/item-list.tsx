import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { formatPrice } from '@/app/util/formatting';
import { Item } from '@prisma/client';

export async function ItemList({ items }: { items: Item[] }) {
  const itemsWithRightPrices = items.map((item) => {
    return { ...item, price: formatPrice(item.price) };
  });

  if (items.length === 0)
    return (
      <div className="opacity-50 text-2xl font-extralight">No items found</div>
    );

  return (
    <ul className="flex justify-center flex-wrap gap-8 max-w-sm">
      {itemsWithRightPrices.map((item) => (
        <li key={item.id}>
          <ListItemLink href={`/items/${item.id}`}>
            <div className="flex items-center gap-2">
              <div>{item.name}</div>-
              <div className="font-mono mt-1">{item.price}</div>
            </div>
          </ListItemLink>
        </li>
      ))}
    </ul>
  );
}
