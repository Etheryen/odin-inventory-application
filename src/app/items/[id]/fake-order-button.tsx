'use client';

import { Button } from '@/app/components/ui/button';
import { fakeOrder } from '@/app/util/fakeOrder';
import { toast } from 'react-hot-toast';

export function FakeOrderButton() {
  const handleOrder = async () => {
    toast.promise(fakeOrder(), {
      loading: 'Submitting order...',
      success: <b>Ordered successfully!</b>,
      error: <b>Error ordering</b>,
    });
  };

  return <Button onClick={handleOrder}>Order</Button>;
}
