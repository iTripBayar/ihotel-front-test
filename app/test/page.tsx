'use client'
import { fetchDataHotel, fetchCreateOrder } from '@/utils';
import { useRequest } from "ahooks"
export default function Test() {

  const { data, loading, error } = useRequest(() => {
    const slug = '0d5b13';
    const checkIn = '12/21/2023|Dec-21-2023';
    const checkOut = '12/22/2023|Dec-22-2023';
    if (slug)
      return fetchDataHotel({
        slug: slug,
        checkIn: checkIn ? checkIn.split('|')[0] : '',
        checkOut: checkOut ? checkOut.split('|')[0] : '',
      });
    return fetchDataHotel({ slug: '', checkIn: '', checkOut: '' });
  });
  const {data: testData, loading: testLoading, error: testError} = useRequest(()=>{
    const order_roomdata = [{
    startdate: '2023-12-21',
    enddate: '2023-12-22',
    hotel_id: '386',
    room_id: '1481',
    room_number: '1',
    person_number: '',
    room_price: '55',
    room_type: '',
    room_name: 'Single Room',
    total_price: '55',
    by_person: '',
  }]
    return fetchCreateOrder({
      name: 'Bayar',
      surname: 'Gan',
      country: 'Mongolia',
      phone_number: '94998459',
      email_order: 'bayarbna@gmail.com',
      beneficiary_name: '',
      beneficiary_account_number: '',
      order_hotelid: '386',
      payment_option: '',
      order_roomdata: order_roomdata,
      order_startdate: '2023-12-21',
      order_enddate: '2023-12-22',
    });
  })

  console.log(testData);
  return (
    <div>Test</div>
  )
}
