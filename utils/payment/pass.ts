export async function passPayment(orderId: string): Promise<Payment.Pass> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/pass/${orderId}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function passInquiry(e: {
  order_id: string;
  ihotel_order_id: string;
}): Promise<Payment.PassInquiry> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/pass/inquiry`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: e.order_id,
        ihotel_order_id: e.ihotel_order_id,
      }),
    },
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function passNotify(e: {
  order_id: string;
  phone: string;
}): Promise<Payment.PassNotify> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/pass/notify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: e.order_id,
        phone: e.phone,
      }),
    },
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}
