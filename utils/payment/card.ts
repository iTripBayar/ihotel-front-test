export async function cardPayment(orderId: string): Promise<Payment.Card> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/card/${orderId}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();
  return result;
}

export async function cardInquiry(e: {
  order_id: string;
  invoice_id: string;
}): Promise<Payment.CardInquiry> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/card/inquiry`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: e.order_id,
        invoice_id: e.invoice_id,
      }),
    },
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}
