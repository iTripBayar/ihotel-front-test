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
import CardOption from '@/components/paymentPage/cardOption';

export default function page() {
  // const { data: userData } = useRequest(() => {
  //   return fetchUserData({
  //     email: 'orgil@ihotel.mn',
  //     password: 'Wave920110@',
  //   });
  // });
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const method = searchParams.get('method');
  // let method = 'bank';

  const slug = '0d5b13';

  const { data, loading, error } = useRequest(() => {
    if (slug) return fetchDataHotel(slug);
    return fetchDataHotel('');
  });
  if (!error)
    return (
      <div className='flex min-h-screen w-full flex-col items-center justify-between'>
        <Header />
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[65vh] w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <div className='flex min-h-[50vh] w-full items-center justify-center text-white'>
            {method === 'bank' ? (
              <BankOptions />
            ) : method === 'socialPay' ? (
              <SocialPayOption />
            ) : method === 'pass' ? (
              <PassOption />
            ) : method === 'card' ? (
              <CardOption />
            ) : null}
          </div>
        )}

        <Footer />
      </div>
    );
  return <ErrorComponent />;
}
