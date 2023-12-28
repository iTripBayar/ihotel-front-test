export async function qPayPayment(orderId: string): Promise<Payment.QPay> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/qpay/${orderId}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function qPayInquiry(e: {
  order_id: string;
  invoice_id: string;
}): Promise<Payment.QPayInquiry> {
  // const params = `?orderId=${e.orderId}`;
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/order/payment/qpay/inquiry`,
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
