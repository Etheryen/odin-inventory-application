import { ListItemLink } from '@/app/components/custom-ui/list-item-link';
import { baseURL } from '@/app/util/baseUrl';
import { formatPrice } from '@/app/util/formatting';
import { Item } from '@prisma/client';

interface ItemListProps {
  categoryId: string;
}

export async function ItemList(props: ItemListProps) {
  const result = await fetch(
    `${baseURL}/api/categories/${props.categoryId}/items`
  );
  const data: Item[] = await result.json();

  const itemsWithRightPrices = data.map((item) => {
    return { ...item, price: formatPrice(item.price) };
  });

  if (data.length === 0)
    return (
      <div className="opacity-50 text-2xl font-extralight">No items found</div>
    );

  return (
    <ul>
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
