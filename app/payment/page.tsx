'use client';
import { useRequest } from 'ahooks';
import { fetchDataHotel, fetchUserData } from '@/utils';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import ErrorComponent from '@/components/common/404';
import { useSearchParams } from 'next/navigation';
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import BankOptions from '@/components/paymentPage/bankOptions';
import SocialPayOption from '@/components/paymentPage/socialPayOption';
import PassOption from '@/components/paymentPage/passOption';

export default function page() {
  // const { data: userData } = useRequest(() => {
  //   return fetchUserData({
  //     email: 'orgil@ihotel.mn',
  //     password: 'Wave920110@',
  //   });
  // });
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const paymentMethod = searchParams.get('paymentMethod');

  const slug = '0d5b13';
  let ver = 'pass';

  const { data, loading, error } = useRequest(() => {
    if (slug) return fetchDataHotel(slug);
    return fetchDataHotel('');
  });
  if (!error)
    return (
      <div className='flex flex-col items-center justify-between w-full min-h-screen bg-payment-black'>
        <Header />
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[65vh] w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <div className='flex min-h-[50vh] w-full items-center justify-center text-white'>
            {ver === 'bank' ? (
              <BankOptions />
            ) : ver === 'socialPay' ? (
              <SocialPayOption />
            ) : ver === 'pass' ? (
              <PassOption />
            ) : null}
          </div>
        )}

        <Footer />
      </div>
    );
  return <ErrorComponent />;
}
