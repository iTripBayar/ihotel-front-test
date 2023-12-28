export async function socialPayPayment(
  orderId: string,
  // token: string;
  // totalPrice: string;
): Promise<Payment.SocialPay> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/socialpay/${orderId}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function socialPayInquiry(e: {
  order_id: string;
  ihotel_order_id: string;
}): Promise<Payment.SocialPayInquiry> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/socialpay/inquiry`,
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
